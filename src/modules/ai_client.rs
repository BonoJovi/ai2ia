//! AI Client Module
//!
//! Unified interface for sending prompts to AI providers:
//! OpenAI, Anthropic, Google AI, and xAI.

use serde::{Deserialize, Serialize};

/// AI Provider selection
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum AiProviderType {
    OpenAI,
    Anthropic,
    Google,
    XAI,
}

impl AiProviderType {
    pub fn display_name(&self) -> &str {
        match self {
            AiProviderType::OpenAI => "OpenAI",
            AiProviderType::Anthropic => "Anthropic",
            AiProviderType::Google => "Google AI",
            AiProviderType::XAI => "xAI",
        }
    }

    pub fn default_model(&self) -> &str {
        match self {
            AiProviderType::OpenAI => "gpt-4o",
            AiProviderType::Anthropic => "claude-sonnet-4-20250514",
            AiProviderType::Google => "gemini-2.5-flash",
            AiProviderType::XAI => "grok-3",
        }
    }
}

/// Request to send to AI
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AiRequest {
    pub provider: AiProviderType,
    pub prompt: String,
    pub model: Option<String>,
    pub max_tokens: Option<u32>,
}

/// Response from AI
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AiResponse {
    pub success: bool,
    pub content: Option<String>,
    pub error: Option<String>,
    pub model: String,
    pub provider: String,
}

impl AiResponse {
    pub fn success(content: String, model: &str, provider: &str) -> Self {
        Self {
            success: true,
            content: Some(content),
            error: None,
            model: model.to_string(),
            provider: provider.to_string(),
        }
    }

    pub fn error(message: &str, provider: &str) -> Self {
        Self {
            success: false,
            content: None,
            error: Some(message.to_string()),
            model: String::new(),
            provider: provider.to_string(),
        }
    }
}

// ============================================================================
// OpenAI API
// ============================================================================

#[derive(Debug, Serialize)]
struct OpenAiRequest {
    model: String,
    messages: Vec<OpenAiMessage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    max_tokens: Option<u32>,
}

#[derive(Debug, Serialize)]
struct OpenAiMessage {
    role: String,
    content: String,
}

#[derive(Debug, Deserialize)]
struct OpenAiResponse {
    choices: Vec<OpenAiChoice>,
}

#[derive(Debug, Deserialize)]
struct OpenAiChoice {
    message: OpenAiMessageResponse,
}

#[derive(Debug, Deserialize)]
struct OpenAiMessageResponse {
    content: String,
}

pub async fn send_to_openai(
    api_key: &str,
    prompt: &str,
    model: &str,
    max_tokens: Option<u32>,
) -> AiResponse {
    let client = reqwest::Client::new();

    let request = OpenAiRequest {
        model: model.to_string(),
        messages: vec![OpenAiMessage {
            role: "user".to_string(),
            content: prompt.to_string(),
        }],
        max_tokens,
    };

    match client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
    {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<OpenAiResponse>().await {
                    Ok(data) => {
                        if let Some(choice) = data.choices.first() {
                            AiResponse::success(choice.message.content.clone(), model, "OpenAI")
                        } else {
                            AiResponse::error("No response from OpenAI", "OpenAI")
                        }
                    }
                    Err(e) => AiResponse::error(&format!("Failed to parse response: {}", e), "OpenAI"),
                }
            } else {
                let status = response.status();
                let error_text = response.text().await.unwrap_or_default();
                AiResponse::error(&format!("API error ({}): {}", status, error_text), "OpenAI")
            }
        }
        Err(e) => AiResponse::error(&format!("Request failed: {}", e), "OpenAI"),
    }
}

// ============================================================================
// Anthropic API
// ============================================================================

#[derive(Debug, Serialize)]
struct AnthropicRequest {
    model: String,
    max_tokens: u32,
    messages: Vec<AnthropicMessage>,
}

#[derive(Debug, Serialize)]
struct AnthropicMessage {
    role: String,
    content: String,
}

#[derive(Debug, Deserialize)]
struct AnthropicResponse {
    content: Vec<AnthropicContent>,
}

#[derive(Debug, Deserialize)]
struct AnthropicContent {
    text: String,
}

pub async fn send_to_anthropic(
    api_key: &str,
    prompt: &str,
    model: &str,
    max_tokens: Option<u32>,
) -> AiResponse {
    let client = reqwest::Client::new();

    let request = AnthropicRequest {
        model: model.to_string(),
        max_tokens: max_tokens.unwrap_or(4096),
        messages: vec![AnthropicMessage {
            role: "user".to_string(),
            content: prompt.to_string(),
        }],
    };

    match client
        .post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", api_key)
        .header("anthropic-version", "2023-06-01")
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
    {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<AnthropicResponse>().await {
                    Ok(data) => {
                        if let Some(content) = data.content.first() {
                            AiResponse::success(content.text.clone(), model, "Anthropic")
                        } else {
                            AiResponse::error("No response from Anthropic", "Anthropic")
                        }
                    }
                    Err(e) => AiResponse::error(&format!("Failed to parse response: {}", e), "Anthropic"),
                }
            } else {
                let status = response.status();
                let error_text = response.text().await.unwrap_or_default();
                AiResponse::error(&format!("API error ({}): {}", status, error_text), "Anthropic")
            }
        }
        Err(e) => AiResponse::error(&format!("Request failed: {}", e), "Anthropic"),
    }
}

// ============================================================================
// Google AI (Gemini) API
// ============================================================================

#[derive(Debug, Serialize)]
struct GoogleRequest {
    contents: Vec<GoogleContent>,
}

#[derive(Debug, Serialize)]
struct GoogleContent {
    parts: Vec<GooglePart>,
}

#[derive(Debug, Serialize)]
struct GooglePart {
    text: String,
}

#[derive(Debug, Deserialize)]
struct GoogleResponse {
    candidates: Vec<GoogleCandidate>,
}

#[derive(Debug, Deserialize)]
struct GoogleCandidate {
    content: GoogleContentResponse,
}

#[derive(Debug, Deserialize)]
struct GoogleContentResponse {
    parts: Vec<GooglePartResponse>,
}

#[derive(Debug, Deserialize)]
struct GooglePartResponse {
    text: String,
}

pub async fn send_to_google(
    api_key: &str,
    prompt: &str,
    model: &str,
    _max_tokens: Option<u32>,
) -> AiResponse {
    let client = reqwest::Client::new();

    let request = GoogleRequest {
        contents: vec![GoogleContent {
            parts: vec![GooglePart {
                text: prompt.to_string(),
            }],
        }],
    };

    let url = format!(
        "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent?key={}",
        model, api_key
    );

    match client
        .post(&url)
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
    {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<GoogleResponse>().await {
                    Ok(data) => {
                        if let Some(candidate) = data.candidates.first() {
                            if let Some(part) = candidate.content.parts.first() {
                                return AiResponse::success(part.text.clone(), model, "Google AI");
                            }
                        }
                        AiResponse::error("No response from Google AI", "Google AI")
                    }
                    Err(e) => AiResponse::error(&format!("Failed to parse response: {}", e), "Google AI"),
                }
            } else {
                let status = response.status();
                let error_text = response.text().await.unwrap_or_default();
                AiResponse::error(&format!("API error ({}): {}", status, error_text), "Google AI")
            }
        }
        Err(e) => AiResponse::error(&format!("Request failed: {}", e), "Google AI"),
    }
}

// ============================================================================
// xAI (Grok) API - OpenAI-compatible endpoint
// ============================================================================

pub async fn send_to_xai(
    api_key: &str,
    prompt: &str,
    model: &str,
    max_tokens: Option<u32>,
) -> AiResponse {
    let client = reqwest::Client::new();

    let request = OpenAiRequest {
        model: model.to_string(),
        messages: vec![OpenAiMessage {
            role: "user".to_string(),
            content: prompt.to_string(),
        }],
        max_tokens,
    };

    match client
        .post("https://api.x.ai/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
    {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<OpenAiResponse>().await {
                    Ok(data) => {
                        if let Some(choice) = data.choices.first() {
                            AiResponse::success(choice.message.content.clone(), model, "xAI")
                        } else {
                            AiResponse::error("No response from xAI", "xAI")
                        }
                    }
                    Err(e) => AiResponse::error(&format!("Failed to parse response: {}", e), "xAI"),
                }
            } else {
                let status = response.status();
                let error_text = response.text().await.unwrap_or_default();
                AiResponse::error(&format!("API error ({}): {}", status, error_text), "xAI")
            }
        }
        Err(e) => AiResponse::error(&format!("Request failed: {}", e), "xAI"),
    }
}

// ============================================================================
// Unified Interface
// ============================================================================

pub async fn send_prompt(request: AiRequest, api_key: &str) -> AiResponse {
    let model = request
        .model
        .unwrap_or_else(|| request.provider.default_model().to_string());

    match request.provider {
        AiProviderType::OpenAI => send_to_openai(api_key, &request.prompt, &model, request.max_tokens).await,
        AiProviderType::Anthropic => send_to_anthropic(api_key, &request.prompt, &model, request.max_tokens).await,
        AiProviderType::Google => send_to_google(api_key, &request.prompt, &model, request.max_tokens).await,
        AiProviderType::XAI => send_to_xai(api_key, &request.prompt, &model, request.max_tokens).await,
    }
}
