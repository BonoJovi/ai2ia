mod commands;
mod modules;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            commands::save_api_key,
            commands::get_api_key,
            commands::delete_api_key,
            commands::list_api_keys,
            commands::has_api_key,
            commands::send_to_ai,
            commands::send_to_multiple_ai,
            commands::get_ai_providers,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
