//! API Key Management Module
//!
//! Provides secure storage for API keys using obfuscated file storage.
//! Supports multiple AI service providers.

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;

/// Get the app data directory for storing API keys
fn get_keys_file_path() -> Result<PathBuf, String> {
    let base_dir = dirs::data_local_dir()
        .or_else(|| dirs::home_dir().map(|h| h.join(".local/share")))
        .ok_or_else(|| "Could not determine data directory".to_string())?;

    let app_dir = base_dir.join("ai2ia");

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Failed to create app directory: {}", e))?;
    }

    Ok(app_dir.join("api_keys.dat"))
}

/// Simple obfuscation key
const OBFUSCATION_KEY: &[u8] = b"a2i9f7c3b8e1d4h6k0m5n2p7r9s3t8v1w6x4y0z5q2j8l3o7u1i9a4e6c0g5b8d2";

/// Obfuscate data using XOR cipher
fn obfuscate(data: &str) -> String {
    let bytes: Vec<u8> = data
        .bytes()
        .enumerate()
        .map(|(i, b)| b ^ OBFUSCATION_KEY[i % OBFUSCATION_KEY.len()])
        .collect();
    base64_encode(&bytes)
}

/// Deobfuscate data using XOR cipher
fn deobfuscate(encoded: &str) -> Result<String, String> {
    let bytes = base64_decode(encoded)?;
    let decrypted: Vec<u8> = bytes
        .iter()
        .enumerate()
        .map(|(i, b)| b ^ OBFUSCATION_KEY[i % OBFUSCATION_KEY.len()])
        .collect();
    String::from_utf8(decrypted).map_err(|e| format!("Invalid UTF-8: {}", e))
}

/// Base64 encode bytes
fn base64_encode(data: &[u8]) -> String {
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut result = String::new();

    for chunk in data.chunks(3) {
        let b0 = chunk[0] as usize;
        let b1 = chunk.get(1).copied().unwrap_or(0) as usize;
        let b2 = chunk.get(2).copied().unwrap_or(0) as usize;

        result.push(CHARS[(b0 >> 2) & 0x3F] as char);
        result.push(CHARS[((b0 << 4) | (b1 >> 4)) & 0x3F] as char);

        if chunk.len() > 1 {
            result.push(CHARS[((b1 << 2) | (b2 >> 6)) & 0x3F] as char);
        } else {
            result.push('=');
        }

        if chunk.len() > 2 {
            result.push(CHARS[b2 & 0x3F] as char);
        } else {
            result.push('=');
        }
    }

    result
}

/// Base64 decode string
fn base64_decode(encoded: &str) -> Result<Vec<u8>, String> {
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    fn char_to_val(c: char) -> Option<u8> {
        CHARS.iter().position(|&x| x == c as u8).map(|p| p as u8)
    }

    let chars: Vec<char> = encoded.chars().filter(|&c| c != '=').collect();
    let mut result = Vec::new();

    for chunk in chars.chunks(4) {
        if chunk.len() < 2 {
            break;
        }

        let v0 = char_to_val(chunk[0]).ok_or("Invalid base64")?;
        let v1 = char_to_val(chunk[1]).ok_or("Invalid base64")?;

        result.push((v0 << 2) | (v1 >> 4));

        if chunk.len() > 2 {
            let v2 = char_to_val(chunk[2]).ok_or("Invalid base64")?;
            result.push((v1 << 4) | (v2 >> 2));

            if chunk.len() > 3 {
                let v3 = char_to_val(chunk[3]).ok_or("Invalid base64")?;
                result.push((v2 << 6) | v3);
            }
        }
    }

    Ok(result)
}

/// Stored API keys structure
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
struct StoredKeys {
    keys: HashMap<String, String>,
}

impl StoredKeys {
    fn load() -> Self {
        match get_keys_file_path() {
            Ok(path) => {
                if path.exists() {
                    match fs::read_to_string(&path) {
                        Ok(content) => match serde_json::from_str(&content) {
                            Ok(keys) => return keys,
                            Err(e) => eprintln!("Failed to parse keys file: {}", e),
                        },
                        Err(e) => eprintln!("Failed to read keys file: {}", e),
                    }
                }
            }
            Err(e) => eprintln!("Failed to get keys path: {}", e),
        }
        StoredKeys::default()
    }

    fn save(&self) -> Result<(), String> {
        let path = get_keys_file_path()?;
        let content = serde_json::to_string_pretty(self)
            .map_err(|e| format!("Failed to serialize keys: {}", e))?;
        fs::write(&path, content)
            .map_err(|e| format!("Failed to write keys file: {}", e))?;

        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            let permissions = fs::Permissions::from_mode(0o600);
            let _ = fs::set_permissions(&path, permissions);
        }

        Ok(())
    }
}

/// Supported AI service providers
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum AiProvider {
    OpenAI,
    Anthropic,
    Google,
    #[serde(rename = "xAI")]
    XAI,
    Custom(String),
}

impl AiProvider {
    pub fn key_name(&self) -> String {
        match self {
            AiProvider::OpenAI => "openai".to_string(),
            AiProvider::Anthropic => "anthropic".to_string(),
            AiProvider::Google => "google".to_string(),
            AiProvider::XAI => "xai".to_string(),
            AiProvider::Custom(name) => format!("custom_{}", name.to_lowercase().replace(' ', "_")),
        }
    }

    pub fn display_name(&self) -> String {
        match self {
            AiProvider::OpenAI => "OpenAI".to_string(),
            AiProvider::Anthropic => "Anthropic".to_string(),
            AiProvider::Google => "Google AI".to_string(),
            AiProvider::XAI => "xAI".to_string(),
            AiProvider::Custom(name) => name.clone(),
        }
    }

    pub fn standard_providers() -> Vec<AiProvider> {
        vec![
            AiProvider::OpenAI,
            AiProvider::Anthropic,
            AiProvider::Google,
            AiProvider::XAI,
        ]
    }
}

/// Parse provider string to AiProvider enum
pub fn parse_provider(provider: &str) -> AiProvider {
    match provider.to_lowercase().as_str() {
        "openai" => AiProvider::OpenAI,
        "anthropic" => AiProvider::Anthropic,
        "google" => AiProvider::Google,
        "xai" => AiProvider::XAI,
        other => AiProvider::Custom(other.to_string()),
    }
}

/// API Key entry with metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiKeyEntry {
    pub provider: AiProvider,
    pub is_set: bool,
    pub masked_key: Option<String>,
}

/// Result type for API key operations
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiKeyResult {
    pub success: bool,
    pub message: String,
}

impl ApiKeyResult {
    pub fn success(message: &str) -> Self {
        Self { success: true, message: message.to_string() }
    }

    pub fn error(message: &str) -> Self {
        Self { success: false, message: message.to_string() }
    }
}

/// Save an API key for the specified provider
pub fn save_api_key(provider: &AiProvider, api_key: &str) -> ApiKeyResult {
    let mut stored = StoredKeys::load();
    let obfuscated = obfuscate(api_key);
    stored.keys.insert(provider.key_name(), obfuscated);

    match stored.save() {
        Ok(_) => ApiKeyResult::success(&format!("{} API key saved successfully", provider.display_name())),
        Err(e) => ApiKeyResult::error(&format!("Failed to save API key: {}", e)),
    }
}

/// Get an API key for the specified provider
pub fn get_api_key(provider: &AiProvider) -> Option<String> {
    let stored = StoredKeys::load();
    stored.keys.get(&provider.key_name()).and_then(|obfuscated| deobfuscate(obfuscated).ok())
}

/// Delete an API key for the specified provider
pub fn delete_api_key(provider: &AiProvider) -> ApiKeyResult {
    let mut stored = StoredKeys::load();

    if stored.keys.remove(&provider.key_name()).is_some() {
        match stored.save() {
            Ok(_) => ApiKeyResult::success(&format!("{} API key deleted successfully", provider.display_name())),
            Err(e) => ApiKeyResult::error(&format!("Failed to delete API key: {}", e)),
        }
    } else {
        ApiKeyResult::success("No API key was set for this provider")
    }
}

/// Check if an API key is set for the specified provider
pub fn has_api_key(provider: &AiProvider) -> bool {
    get_api_key(provider).is_some()
}

/// Mask an API key for display
pub fn mask_api_key(api_key: &str) -> String {
    if api_key.len() <= 8 {
        "*".repeat(api_key.len())
    } else {
        let first = &api_key[..4];
        let last = &api_key[api_key.len() - 4..];
        format!("{}...{}", first, last)
    }
}

/// List all API key entries with their status
pub fn list_api_keys() -> Vec<ApiKeyEntry> {
    AiProvider::standard_providers()
        .into_iter()
        .map(|provider| {
            let api_key = get_api_key(&provider);
            ApiKeyEntry {
                provider,
                is_set: api_key.is_some(),
                masked_key: api_key.map(|k| mask_api_key(&k)),
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_provider_key_name() {
        assert_eq!(AiProvider::OpenAI.key_name(), "openai");
        assert_eq!(AiProvider::Anthropic.key_name(), "anthropic");
        assert_eq!(AiProvider::Google.key_name(), "google");
        assert_eq!(AiProvider::XAI.key_name(), "xai");
    }

    #[test]
    fn test_mask_api_key() {
        assert_eq!(mask_api_key("abc"), "***");
        assert_eq!(mask_api_key("sk-1234567890abcdef"), "sk-1...cdef");
    }

    #[test]
    fn test_obfuscation_roundtrip() {
        let original = "sk-test-api-key-12345";
        let obfuscated = obfuscate(original);
        let deobfuscated = deobfuscate(&obfuscated).unwrap();
        assert_eq!(original, deobfuscated);
    }
}
