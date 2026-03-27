/**
 * ai2ia - API Key Management
 */
class ApiKeyManager {
    constructor() {
        this.modal = null;
        this.isInitialized = false;
        this.invoke = null;
    }

    async init() {
        if (this.isInitialized) return;

        if (window.__TAURI_INTERNALS__) {
            this.invoke = window.__TAURI_INTERNALS__.invoke;
        } else if (window.__TAURI__) {
            this.invoke = window.__TAURI__.invoke;
        } else {
            console.warn('Tauri API not available');
        }

        this.createModal();
        this.bindEvents();
        this.isInitialized = true;
    }

    createModal() {
        const title = window.t ? window.t('settings.apiKey.title') : 'API Key Settings';
        const description = window.t ? window.t('settings.apiKey.description') : 'Configure your AI service API keys. Keys are securely stored on your system.';
        const closeText = window.t ? window.t('settings.apiKey.close') : 'Close';

        const modalHtml = `
            <div id="apiKeyModal" class="modal-overlay" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 data-i18n="settings.apiKey.title">${title}</h2>
                        <button class="modal-close" id="closeApiKeyModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-description" data-i18n="settings.apiKey.description">${description}</p>
                        <div id="apiKeyList" class="api-key-list"></div>
                    </div>
                    <div class="modal-footer">
                        <button id="closeApiKeyModalBtn" class="btn-secondary" data-i18n="settings.apiKey.close">${closeText}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.modal = document.getElementById('apiKeyModal');
    }

    bindEvents() {
        document.getElementById('closeApiKeyModal').addEventListener('click', () => this.hideModal());
        document.getElementById('closeApiKeyModalBtn').addEventListener('click', () => this.hideModal());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hideModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                this.hideModal();
            }
        });
    }

    async showModal() {
        this.modal.style.display = 'flex';

        try {
            await this.loadApiKeys();
        } catch (error) {
            console.error('Failed to load API keys:', error);
            const listContainer = document.getElementById('apiKeyList');
            if (listContainer) {
                const errorMsg = window.t ? window.t('settings.apiKey.loadFailed') : 'Failed to load API keys.';
                listContainer.innerHTML = `<p class="error-message">${errorMsg}</p>`;
            }
        }
    }

    hideModal() {
        this.modal.style.display = 'none';
    }

    async loadApiKeys() {
        const listContainer = document.getElementById('apiKeyList');

        try {
            const keys = await this.invoke('list_api_keys');
            listContainer.innerHTML = '';

            for (const entry of keys) {
                const itemHtml = this.createApiKeyItem(entry);
                listContainer.insertAdjacentHTML('beforeend', itemHtml);
            }

            this.bindApiKeyItemEvents();
        } catch (error) {
            console.error('Failed to load API keys:', error);
            listContainer.innerHTML = `<p class="error-message">Failed to load API keys: ${error}</p>`;
        }
    }

    createApiKeyItem(entry) {
        const providerName = this.getProviderDisplayName(entry.provider);
        const statusClass = entry.is_set ? 'status-set' : 'status-not-set';
        const statusTextSet = window.t ? window.t('settings.apiKey.status.set') : 'Set';
        const statusTextNotSet = window.t ? window.t('settings.apiKey.status.notSet') : 'Not Set';
        const statusText = entry.is_set ? statusTextSet : statusTextNotSet;
        const maskedKey = entry.masked_key || '';
        const providerKey = this.getProviderKey(entry.provider);

        const editText = window.t ? window.t('settings.apiKey.edit') : 'Edit';
        const saveText = window.t ? window.t('settings.apiKey.save') : 'Save';
        const cancelText = window.t ? window.t('settings.apiKey.cancel') : 'Cancel';
        const deleteText = window.t ? window.t('settings.apiKey.delete') : 'Delete';
        const placeholder = window.t ? window.t('settings.apiKey.placeholder') : 'Enter API key...';

        return `
            <div class="api-key-item" data-provider="${providerKey}">
                <div class="api-key-info">
                    <span class="api-key-provider">${providerName}</span>
                    <span class="api-key-status ${statusClass}">${statusText}</span>
                    ${entry.is_set ? `<span class="api-key-masked">${maskedKey}</span>` : ''}
                </div>
                <div class="api-key-actions">
                    <input type="password" class="api-key-input" placeholder="${placeholder}" style="display: none;">
                    <button class="btn-edit-key" title="${editText}">${editText}</button>
                    <button class="btn-save-key" title="${saveText}" style="display: none;">${saveText}</button>
                    <button class="btn-cancel-key" title="${cancelText}" style="display: none;">${cancelText}</button>
                    ${entry.is_set ? `<button class="btn-delete-key" title="${deleteText}">${deleteText}</button>` : ''}
                </div>
            </div>
        `;
    }

    getProviderDisplayName(provider) {
        if (typeof provider === 'string') return provider;
        if (provider.Custom) return provider.Custom;
        return provider;
    }

    getProviderKey(provider) {
        if (typeof provider === 'string') return provider.toLowerCase();
        if (provider.Custom) return provider.Custom.toLowerCase();
        return provider.toLowerCase();
    }

    bindApiKeyItemEvents() {
        document.querySelectorAll('.btn-edit-key').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showEditMode(e.target.closest('.api-key-item'));
            });
        });

        document.querySelectorAll('.btn-save-key').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                await this.saveApiKey(e.target.closest('.api-key-item'));
            });
        });

        document.querySelectorAll('.btn-cancel-key').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.hideEditMode(e.target.closest('.api-key-item'));
            });
        });

        document.querySelectorAll('.btn-delete-key').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                await this.deleteApiKey(e.target.closest('.api-key-item'));
            });
        });

        document.querySelectorAll('.api-key-input').forEach(input => {
            input.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter') {
                    await this.saveApiKey(e.target.closest('.api-key-item'));
                } else if (e.key === 'Escape') {
                    this.hideEditMode(e.target.closest('.api-key-item'));
                }
            });
        });
    }

    showEditMode(item) {
        const input = item.querySelector('.api-key-input');
        const editBtn = item.querySelector('.btn-edit-key');
        const saveBtn = item.querySelector('.btn-save-key');
        const cancelBtn = item.querySelector('.btn-cancel-key');
        const deleteBtn = item.querySelector('.btn-delete-key');

        input.style.display = 'block';
        input.value = '';
        input.focus();

        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        if (deleteBtn) deleteBtn.style.display = 'none';
    }

    hideEditMode(item) {
        const input = item.querySelector('.api-key-input');
        const editBtn = item.querySelector('.btn-edit-key');
        const saveBtn = item.querySelector('.btn-save-key');
        const cancelBtn = item.querySelector('.btn-cancel-key');
        const deleteBtn = item.querySelector('.btn-delete-key');

        input.style.display = 'none';
        input.value = '';

        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        if (deleteBtn) deleteBtn.style.display = 'inline-block';
    }

    async saveApiKey(item) {
        const provider = item.dataset.provider;
        const input = item.querySelector('.api-key-input');
        const apiKey = input.value.trim();

        if (!apiKey) {
            await this.showAlertDialog(window.t ? window.t('settings.apiKey.enterKey') : 'Please enter an API key.');
            return;
        }

        try {
            const result = await this.invoke('save_api_key', { provider, apiKey });
            const isSuccess = result === true || result?.success === true;

            if (isSuccess) {
                await this.loadApiKeys();
            } else {
                const message = result?.message || 'Unknown error';
                await this.showAlertDialog('Failed to save API key: ' + message);
            }
        } catch (error) {
            console.error('Failed to save API key:', error);
            await this.showAlertDialog('Failed to save API key: ' + error);
        }
    }

    /** Show a custom confirm dialog and return a Promise<boolean> */
    showConfirmDialog(message, title) {
        return new Promise((resolve) => {
            const titleText = title || (window.t ? window.t('dialog.confirm') : 'Confirm');
            const okText = window.t ? window.t('dialog.ok') : 'OK';
            const cancelText = window.t ? window.t('dialog.cancel') : 'Cancel';

            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <div class="modal-content confirm-dialog">
                    <div class="modal-header">
                        <h2>${titleText}</h2>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary confirm-cancel">${cancelText}</button>
                        <button class="btn-primary confirm-ok">${okText}</button>
                    </div>
                </div>
            `;

            const cleanup = (result) => {
                overlay.remove();
                resolve(result);
            };

            overlay.querySelector('.confirm-ok').addEventListener('click', () => cleanup(true));
            overlay.querySelector('.confirm-cancel').addEventListener('click', () => cleanup(false));
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) cleanup(false);
            });
            overlay.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') cleanup(false);
                if (e.key === 'Enter') cleanup(true);
            });

            document.body.appendChild(overlay);
            overlay.querySelector('.confirm-cancel').focus();
        });
    }

    /** Show a custom alert dialog */
    showAlertDialog(message, title) {
        return new Promise((resolve) => {
            const titleText = title || (window.t ? window.t('dialog.alert') : 'Alert');
            const okText = window.t ? window.t('dialog.ok') : 'OK';

            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <div class="modal-content confirm-dialog">
                    <div class="modal-header">
                        <h2>${titleText}</h2>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary confirm-ok">${okText}</button>
                    </div>
                </div>
            `;

            const cleanup = () => {
                overlay.remove();
                resolve();
            };

            overlay.querySelector('.confirm-ok').addEventListener('click', cleanup);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) cleanup();
            });
            overlay.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' || e.key === 'Enter') cleanup();
            });

            document.body.appendChild(overlay);
            overlay.querySelector('.confirm-ok').focus();
        });
    }

    async deleteApiKey(item) {
        const provider = item.dataset.provider;
        const providerName = item.querySelector('.api-key-provider').textContent;

        const confirmMsg = window.t
            ? window.t('settings.apiKey.confirmDelete', { provider: providerName })
            : `Are you sure you want to delete the API key for ${providerName}?`;

        const confirmed = await this.showConfirmDialog(confirmMsg, window.t ? window.t('settings.apiKey.deleteTitle') : 'Delete API Key');
        if (!confirmed) return;

        try {
            const result = await this.invoke('delete_api_key', { provider });

            if (result.success) {
                await this.loadApiKeys();
            } else {
                await this.showAlertDialog('Failed to delete API key: ' + result.message);
            }
        } catch (error) {
            console.error('Failed to delete API key:', error);
            await this.showAlertDialog('Failed to delete API key: ' + error);
        }
    }
}

window.apiKeyManager = new ApiKeyManager();
