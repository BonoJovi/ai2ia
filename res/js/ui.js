// ============================================
// Theme Management
// ============================================
function initTheme() {
  const saved = localStorage.getItem('ai2ia-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  updateThemeButton();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ai2ia-theme', next);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('btnTheme');
  if (!btn) return;
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const sun = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" fill="#f0c040"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#f0c040" stroke="#f0c040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  btn.innerHTML = theme === 'dark' ? moon : sun;
  btn.title = typeof t === 'function'
    ? t(theme === 'dark' ? 'toolbar.theme.toLight' : 'toolbar.theme.toDark')
    : (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

document.getElementById('btnTheme').addEventListener('click', toggleTheme);
initTheme();

// ============================================
// Language Select Dropdown
// ============================================
const langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.value = window.i18n?.getLocale() || 'en';
  langSelect.addEventListener('change', (e) => {
    if (window.i18n && typeof window.i18n.setLocale === 'function') {
      window.i18n.setLocale(e.target.value);
    }
  });
}

// Update character counts on locale change
window.addEventListener('localechange', () => {
  updateWriteCharCount();
  updateGenCharCount();
});

initI18n();

// ============================================
// Settings (API Key Management)
// ============================================
document.getElementById('btnSettings').addEventListener('click', async () => {
  if (window.apiKeyManager) {
    await window.apiKeyManager.init();
    await window.apiKeyManager.showModal();
  }
});

// ============================================
// Mode Tab Switching
// ============================================
const modeTabs = document.querySelectorAll('.mode-tab');
const writeMode = document.getElementById('writeMode');
const generateMode = document.getElementById('generateMode');
const generateActions = document.getElementById('generateActions');

modeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const mode = tab.dataset.mode;
    if (mode === 'write') {
      writeMode.classList.add('active');
      generateMode.classList.remove('active');
      generateActions.style.display = 'none';
    } else {
      writeMode.classList.remove('active');
      generateMode.classList.add('active');
      generateActions.style.display = 'flex';
    }
  });
});

// ============================================
// Character Count
// ============================================
const writeArea = document.getElementById('writeArea');
const writeCharCount = document.getElementById('writeCharCount');

function updateWriteCharCount() {
  writeCharCount.textContent = t('input.charcount', { count: writeArea.value.length });
}

writeArea.addEventListener('input', updateWriteCharCount);
updateWriteCharCount();

const roughArea = document.getElementById('roughArea');
const generatedArea = document.getElementById('generatedArea');
const genCharCount = document.getElementById('genCharCount');

function updateGenCharCount() {
  genCharCount.textContent = t('input.gen.charcount', {
    inputCount: roughArea.value.length,
    genCount: generatedArea.value.length
  });
}

roughArea.addEventListener('input', updateGenCharCount);
generatedArea.addEventListener('input', updateGenCharCount);

// ============================================
// Drag and Drop for Output Panels
// ============================================
const outputSection = document.getElementById('outputSection');
let draggedPanel = null;

document.querySelectorAll('.output-panel').forEach(panel => {
  panel.addEventListener('dragstart', (e) => {
    draggedPanel = panel;
    panel.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  panel.addEventListener('dragend', () => {
    panel.classList.remove('dragging');
    document.querySelectorAll('.output-panel').forEach(p => {
      p.classList.remove('drag-over');
    });
    draggedPanel = null;
  });

  panel.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (panel !== draggedPanel) {
      panel.classList.add('drag-over');
    }
  });

  panel.addEventListener('dragleave', () => {
    panel.classList.remove('drag-over');
  });

  panel.addEventListener('drop', (e) => {
    e.preventDefault();
    panel.classList.remove('drag-over');
    if (draggedPanel && draggedPanel !== panel) {
      const allPanels = [...outputSection.children];
      const draggedIdx = allPanels.indexOf(draggedPanel);
      const targetIdx = allPanels.indexOf(panel);

      if (draggedIdx < targetIdx) {
        outputSection.insertBefore(draggedPanel, panel.nextSibling);
      } else {
        outputSection.insertBefore(draggedPanel, panel);
      }
    }
  });
});

// ============================================
// Layout Column Change
// ============================================
const layoutSelect = document.getElementById('layoutSelect');

layoutSelect.addEventListener('change', (e) => {
  const cols = parseInt(e.target.value);
  const panels = document.querySelectorAll('.output-panel');
  panels.forEach((panel, i) => {
    panel.style.display = i < cols ? 'flex' : 'none';
  });
});

// ============================================
// Panel Provider Switching
// ============================================
const PROVIDER_MAP = {
  'OpenAI':    { id: 'openai',    icon: 'O', model: 'gpt-4o' },
  'Anthropic': { id: 'anthropic', icon: 'A', model: 'claude-sonnet-4-6' },
  'Google':    { id: 'google',    icon: 'G', model: 'gemini-2.5-flash' },
  'xAI':       { id: 'xai',      icon: 'X', model: 'grok-3' },
};

document.querySelectorAll('.panel-select').forEach(select => {
  select.addEventListener('change', (e) => {
    const panel = e.target.closest('.output-panel');
    const selected = e.target.value;
    const info = PROVIDER_MAP[selected];
    if (!panel || !info) return;

    // Update data-panel attribute
    panel.dataset.panel = info.id;

    // Update icon
    const icon = panel.querySelector('.ai-icon');
    if (icon) {
      icon.className = 'ai-icon ' + info.id;
      icon.textContent = info.icon;
    }

    // Update model display
    const modelEl = panel.querySelector('.panel-model');
    if (modelEl) {
      modelEl.textContent = info.model;
    }

    // Re-init aiSendManager panels to pick up the change
    if (window.aiSendManager) {
      window.aiSendManager.initPanels();
    }
  });
});

// ============================================
// AI Send Manager Init
// ============================================
if (window.aiSendManager) {
  window.aiSendManager.init();
}

// ============================================
// Write Mode Buttons
// ============================================

// Optimize & Send (Write Mode)
document.getElementById('btnOptimizeSend').addEventListener('click', async () => {
  const prompt = writeArea.value.trim();
  if (!prompt) return;
  const target = document.getElementById('outputTarget').value;
  await window.aiSendManager.sendPrompt(prompt, target, true);
});

// Send Raw (Write Mode)
document.getElementById('btnSendRaw').addEventListener('click', async () => {
  const prompt = writeArea.value.trim();
  if (!prompt) return;
  const target = document.getElementById('outputTarget').value;
  await window.aiSendManager.sendPrompt(prompt, target, false);
});

// ============================================
// Generate Mode Buttons
// ============================================

// Generate Prompt
document.getElementById('btnGenerate').addEventListener('click', async () => {
  const roughInput = roughArea.value.trim();
  if (!roughInput) return;
  const generateProvider = document.getElementById('generateAI').value;

  // Show loading state
  generatedArea.value = 'Generating...';
  generatedArea.disabled = true;

  const result = await window.aiSendManager.generatePrompt(roughInput, generateProvider);

  generatedArea.disabled = false;
  if (result) {
    generatedArea.value = result;
    updateGenCharCount();
  } else {
    generatedArea.value = '';
  }
});

// Optimize & Send (Generate Mode)
document.getElementById('btnOptimizeGenerated').addEventListener('click', async () => {
  const prompt = generatedArea.value.trim();
  if (!prompt) return;
  const target = document.getElementById('outputTarget').value;
  await window.aiSendManager.sendPrompt(prompt, target, true);
});

// Send Generated
document.getElementById('btnSendGenerated').addEventListener('click', async () => {
  const prompt = generatedArea.value.trim();
  if (!prompt) return;
  const target = document.getElementById('outputTarget').value;
  await window.aiSendManager.sendPrompt(prompt, target, false);
});
