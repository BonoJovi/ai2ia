/**
 * ai2ia - AI Send Manager
 *
 * Handles sending prompts to AI providers and displaying responses in panels.
 */
class AiSendManager {
    constructor() {
        this.invoke = null;
        this.panels = {};  // panelId -> { provider, model, element }
    }

    init() {
        if (window.__TAURI_INTERNALS__) {
            this.invoke = window.__TAURI_INTERNALS__.invoke;
        } else if (window.__TAURI__) {
            this.invoke = window.__TAURI__.invoke;
        } else {
            console.warn('Tauri API not available');
        }

        this.initPanels();
    }

    /** Get current language name for AI instructions */
    getLanguageName() {
        const locale = window.getLocale ? window.getLocale() : 'en';
        const names = {
            en: 'English', ja: 'Japanese', fr: 'French',
            it: 'Italian', de: 'German', ru: 'Russian', ar: 'Arabic',
        };
        return names[locale] || 'English';
    }

    /** Map panel elements to their provider/model info */
    initPanels() {
        this.panels = {};
        document.querySelectorAll('.output-panel').forEach((panel, index) => {
            const provider = panel.dataset.panel;
            const modelEl = panel.querySelector('.panel-model');
            const key = 'panel_' + index;
            this.panels[key] = {
                provider: provider,
                model: modelEl ? modelEl.textContent.trim() : null,
                element: panel,
            };
        });
    }

    /** Get visible panel IDs based on layout and target selection */
    getTargetPanels(target) {
        if (target && target !== 'all') {
            // Find panels matching this provider
            return Object.keys(this.panels).filter(id => {
                return this.panels[id].provider === target &&
                       this.panels[id].element.style.display !== 'none';
            });
        }
        // Return all visible panels
        return Object.keys(this.panels).filter(id => {
            return this.panels[id].element.style.display !== 'none';
        });
    }

    /** Set panel to loading state */
    setPanelLoading(panelId) {
        const panel = this.panels[panelId];
        if (!panel) return;

        const content = panel.element.querySelector('.panel-content');
        const statusDot = panel.element.querySelector('.status-dot');
        const statusText = panel.element.querySelector('.panel-status span');

        content.innerHTML = '<p class="panel-loading">Waiting for response...</p>';
        statusDot.className = 'status-dot loading';
        statusText.textContent = 'Sending...';
    }

    /** Display response in a panel */
    setPanelResponse(panelId, response) {
        const panel = this.panels[panelId];
        if (!panel) return;

        const content = panel.element.querySelector('.panel-content');
        const statusDot = panel.element.querySelector('.status-dot');
        const statusText = panel.element.querySelector('.panel-status span');

        if (response.success) {
            // Render response text (basic markdown-like formatting)
            content.innerHTML = this.formatResponse(response.content);
            statusDot.className = 'status-dot connected';
            statusText.textContent = t('panel.status.ready');
        } else {
            content.innerHTML = `<p class="panel-error">${response.error || 'Unknown error'}</p>`;
            statusDot.className = 'status-dot error';
            statusText.textContent = 'Error';
        }
    }

    /** Basic formatting for AI response text */
    formatResponse(text) {
        if (!text) return '<p class="panel-placeholder">No response.</p>';

        // Escape HTML
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Code blocks (```...```)
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

        // Inline code (`...`)
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Bold (**...**)
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Split into paragraphs
        html = html.split(/\n\n+/).map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<pre>')) return p;
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
        }).join('');

        return html;
    }

    /**
     * Send a prompt to specified panels
     * @param {string} prompt - The prompt text
     * @param {string} target - 'all' or specific provider id
     * @param {boolean} optimize - Whether to optimize the prompt first
     */
    async sendPrompt(prompt, target, optimize = false) {
        if (!prompt.trim()) return;
        if (!this.invoke) {
            console.error('Tauri invoke not available');
            return;
        }

        const panelIds = this.getTargetPanels(target);

        if (optimize) {
            // Use the selected optimize model to rewrite the prompt first
            const optimizeModel = document.getElementById('optimizeModel');
            const optimizeProvider = optimizeModel ? optimizeModel.value : 'auto';
            prompt = await this.optimizePrompt(prompt, optimizeProvider);
            if (!prompt) return; // optimization failed
        }

        // Set all target panels to loading
        panelIds.forEach(id => this.setPanelLoading(id));

        // Send to all target panels in parallel
        const promises = panelIds.map(async (panelId) => {
            try {
                const panel = this.panels[panelId];
                const response = await this.invoke('send_to_ai', {
                    provider: panel.provider,
                    prompt: prompt,
                    model: panel.model,
                });
                this.setPanelResponse(panelId, response);
            } catch (error) {
                this.setPanelResponse(panelId, {
                    success: false,
                    error: String(error),
                });
            }
        });

        await Promise.all(promises);
    }

    /**
     * Optimize a prompt using an AI model before sending
     */
    async optimizePrompt(prompt, optimizeProvider) {
        // Determine which provider to use for optimization
        let provider = 'openai';
        if (optimizeProvider === 'claude') provider = 'anthropic';
        else if (optimizeProvider === 'gemini') provider = 'google';
        else if (optimizeProvider === 'grok') provider = 'xai';
        else if (optimizeProvider === 'gpt4') provider = 'openai';
        // 'auto' defaults to openai

        const lang = this.getLanguageName();
        const optimizeInstruction = `You are a prompt optimization expert. Rewrite the following prompt to be more effective, clear, and detailed for an AI model. IMPORTANT: Write the optimized prompt in ${lang}. Return ONLY the optimized prompt, nothing else.\n\nOriginal prompt:\n${prompt}`;

        try {
            const response = await this.invoke('send_to_ai', {
                provider: provider,
                prompt: optimizeInstruction,
                model: null,
            });

            if (response.success && response.content) {
                return response.content;
            } else {
                console.error('Optimization failed:', response.error);
                // Fall back to original prompt
                return prompt;
            }
        } catch (error) {
            console.error('Optimization error:', error);
            return prompt;
        }
    }

    /**
     * Generate a prompt from rough input using AI
     */
    async generatePrompt(roughInput, generateProvider) {
        if (!roughInput.trim()) return null;
        if (!this.invoke) return null;

        let provider = 'openai';
        if (generateProvider === 'claude') provider = 'anthropic';
        else if (generateProvider === 'gemini') provider = 'google';
        else if (generateProvider === 'grok') provider = 'xai';
        else if (generateProvider === 'gpt4') provider = 'openai';

        const lang = this.getLanguageName();
        const instruction = `You are a prompt engineering expert. Based on the following rough idea, create a well-structured, detailed prompt that would produce excellent results when sent to an AI model. IMPORTANT: Write the generated prompt in ${lang}. Return ONLY the generated prompt, nothing else.\n\nUser's idea:\n${roughInput}`;

        try {
            const response = await this.invoke('send_to_ai', {
                provider: provider,
                prompt: instruction,
                model: null,
            });

            if (response.success && response.content) {
                return response.content;
            } else {
                console.error('Generation failed:', response.error);
                alert(response.error || 'Failed to generate prompt.');
                return null;
            }
        } catch (error) {
            console.error('Generation error:', error);
            alert('Failed to generate prompt: ' + error);
            return null;
        }
    }
}

window.aiSendManager = new AiSendManager();
