use crate::modules::api_keys::{self, parse_provider, ApiKeyEntry, ApiKeyResult};
use crate::modules::ai_client::{self, AiProviderType, AiRequest, AiResponse};

// ============================================================================
// API Key Commands
// ============================================================================

#[tauri::command]
pub fn save_api_key(provider: String, api_key: String) -> ApiKeyResult {
    let ai_provider = parse_provider(&provider);
    api_keys::save_api_key(&ai_provider, &api_key)
}

#[tauri::command]
pub fn get_api_key(provider: String) -> Option<String> {
    let ai_provider = parse_provider(&provider);
    api_keys::get_api_key(&ai_provider)
}

#[tauri::command]
pub fn delete_api_key(provider: String) -> ApiKeyResult {
    let ai_provider = parse_provider(&provider);
    api_keys::delete_api_key(&ai_provider)
}

#[tauri::command]
pub fn list_api_keys() -> Vec<ApiKeyEntry> {
    api_keys::list_api_keys()
}

#[tauri::command]
pub fn has_api_key(provider: String) -> bool {
    let ai_provider = parse_provider(&provider);
    api_keys::has_api_key(&ai_provider)
}

// ============================================================================
// AI Send Commands
// ============================================================================

fn to_provider_type(provider: &str) -> Result<AiProviderType, String> {
    match provider.to_lowercase().as_str() {
        "openai" => Ok(AiProviderType::OpenAI),
        "anthropic" => Ok(AiProviderType::Anthropic),
        "google" => Ok(AiProviderType::Google),
        "xai" => Ok(AiProviderType::XAI),
        other => Err(format!("Unknown provider: {}", other)),
    }
}

#[tauri::command]
pub async fn send_to_ai(
    provider: String,
    prompt: String,
    model: Option<String>,
) -> AiResponse {
    let provider_type = match to_provider_type(&provider) {
        Ok(p) => p,
        Err(e) => return AiResponse::error(&e, &provider),
    };

    let ai_provider = parse_provider(&provider);
    let api_key = match api_keys::get_api_key(&ai_provider) {
        Some(key) => key,
        None => return AiResponse::error(
            &format!("No API key set for {}. Please configure it in Settings.", provider_type.display_name()),
            provider_type.display_name(),
        ),
    };

    let request = AiRequest {
        provider: provider_type,
        prompt,
        model,
        max_tokens: Some(4096),
    };

    ai_client::send_prompt(request, &api_key).await
}

/// Send prompt to multiple AI providers in parallel
#[tauri::command]
pub async fn send_to_multiple_ai(
    prompt: String,
    providers: Vec<String>,
) -> Vec<AiResponse> {
    let mut handles = Vec::new();

    for provider_str in providers {
        let provider_type = match to_provider_type(&provider_str) {
            Ok(p) => p,
            Err(e) => {
                let ps = provider_str.clone();
                handles.push(tokio::spawn(async move {
                    AiResponse::error(&e, &ps)
                }));
                continue;
            }
        };

        let ai_provider = parse_provider(&provider_str);
        let api_key = match api_keys::get_api_key(&ai_provider) {
            Some(key) => key,
            None => {
                let name = provider_type.display_name().to_string();
                handles.push(tokio::spawn(async move {
                    AiResponse::error(
                        &format!("No API key set for {}.", name),
                        &name,
                    )
                }));
                continue;
            }
        };

        let prompt_clone = prompt.clone();
        handles.push(tokio::spawn(async move {
            let request = AiRequest {
                provider: provider_type,
                prompt: prompt_clone,
                model: None,
                max_tokens: Some(4096),
            };
            ai_client::send_prompt(request, &api_key).await
        }));
    }

    let mut results = Vec::new();
    for handle in handles {
        match handle.await {
            Ok(response) => results.push(response),
            Err(e) => results.push(AiResponse::error(&format!("Task failed: {}", e), "unknown")),
        }
    }

    results
}

/// Get list of available AI providers
#[tauri::command]
pub fn get_ai_providers() -> Vec<serde_json::Value> {
    vec![
        serde_json::json!({
            "id": "openai",
            "name": "OpenAI",
            "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
            "defaultModel": "gpt-4o"
        }),
        serde_json::json!({
            "id": "anthropic",
            "name": "Anthropic",
            "models": ["claude-sonnet-4-20250514", "claude-opus-4-20250514", "claude-haiku-4-5-20251001"],
            "defaultModel": "claude-sonnet-4-20250514"
        }),
        serde_json::json!({
            "id": "google",
            "name": "Google AI",
            "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
            "defaultModel": "gemini-2.5-flash"
        }),
        serde_json::json!({
            "id": "xai",
            "name": "xAI",
            "models": ["grok-3", "grok-3-mini"],
            "defaultModel": "grok-3"
        }),
    ]
}
