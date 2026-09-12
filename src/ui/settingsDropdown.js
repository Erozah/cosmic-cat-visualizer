// src/ui/settingsDropdown.js - Glassmorphic settings dropdown with exclusive model/color and independent effect toggles

let settingsDropdownEl = null;

function toggleSettingsDropdown(engineGetter) {
    if (!settingsDropdownEl) {
        settingsDropdownEl = mountSettingsDropdown(engineGetter);
    }

    const isOpen = settingsDropdownEl.classList.contains("open");
    if (isOpen) {
        closeSettingsDropdown();
    } else {
        openSettingsDropdown(engineGetter);
    }
}

function openSettingsDropdown(engineGetter) {
    if (!settingsDropdownEl) {
        settingsDropdownEl = mountSettingsDropdown(engineGetter);
    }

    updateSettingsDropdownUI(engineGetter());
    settingsDropdownEl.classList.add("open");

    // Position above settings button if possible
    const btn = document.getElementById("cosmic-cat-settings-btn");
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const rightOffset = Math.max(16, window.innerWidth - rect.right - 10);
        settingsDropdownEl.style.right = `${rightOffset}px`;
        settingsDropdownEl.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    }
}

function closeSettingsDropdown() {
    if (settingsDropdownEl) {
        settingsDropdownEl.classList.remove("open");
    }
}

function mountSettingsDropdown(engineGetter) {
    let dropdown = document.getElementById("cosmic-cat-settings-dropdown");
    if (dropdown) return dropdown;

    dropdown = document.createElement("div");
    dropdown.id = "cosmic-cat-settings-dropdown";
    dropdown.className = "cosmic-cat-settings-dropdown";

    dropdown.innerHTML = `
        <div class="dropdown-header">
            <div class="dropdown-title">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                <span>Paramètres Visualiseur</span>
            </div>
            <button type="button" class="dropdown-close-btn" title="Fermer">✕</button>
        </div>

        <!-- Section 1: Modèle (Sélection exclusive) -->
        <div class="dropdown-section">
            <div class="section-label">Modèle de Chat (Exclusif)</div>
            <div class="model-selector-grid">
                <button type="button" class="model-btn" data-model="cyber">
                    <span class="model-icon">🐱</span>
                    <div class="model-info">
                        <span class="model-name">Cyber Cat</span>
                        <span class="model-desc">De face • Yeux animés • Constellation</span>
                    </div>
                </button>
                <button type="button" class="model-btn" data-model="cosmic">
                    <span class="model-icon">🌌</span>
                    <div class="model-info">
                        <span class="model-name">Cosmic Cat</span>
                        <span class="model-desc">De dos • Queue articulée • Deck</span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Section 2: Couleur (Sélection exclusive) -->
        <div class="dropdown-section">
            <div class="section-label">Palette de Couleurs (Exclusive)</div>
            <div class="palette-swatches-row">
                <!-- Swatches injected dynamically -->
            </div>
        </div>

        <!-- Section 3: Effets & Arrière-plan (Toggles indépendants) -->
        <div class="dropdown-section">
            <div class="section-label">Effets d'Arrière-Plan (Indépendants)</div>
            <div class="effects-toggle-list">
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">☸️</span>
                        <span class="effect-name">Fractales & Mandalas sacrés</span>
                    </span>
                    <input type="checkbox" data-effect="fractals" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">✨</span>
                        <span class="effect-name">Particules & Étoiles célestes</span>
                    </span>
                    <input type="checkbox" data-effect="stars" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🌌</span>
                        <span class="effect-name">Nébuleuse & Aura volumétrique</span>
                    </span>
                    <input type="checkbox" data-effect="nebula" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🌐</span>
                        <span class="effect-name">Grille Cyber 3D Synthwave</span>
                    </span>
                    <input type="checkbox" data-effect="grid" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">💥</span>
                        <span class="effect-name">Ondes de choc sur le beat</span>
                    </span>
                    <input type="checkbox" data-effect="shockwaves" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🪵</span>
                        <span class="effect-name">Deck en bois (Plateforme sol)</span>
                    </span>
                    <input type="checkbox" data-effect="deck" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
            </div>
        </div>

        <!-- Section 4: Plein écran & raccourcis -->
        <div class="dropdown-footer">
            <button type="button" class="footer-action-btn" id="dropdown-fs-btn">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                <span>Plein Écran (F)</span>
            </button>
            <span class="footer-hint"><kbd>A</kbd> On/Off &nbsp;|&nbsp; <kbd>C</kbd> Modèle &nbsp;|&nbsp; <kbd>T</kbd> Couleur</span>
        </div>
    `;

    document.body.appendChild(dropdown);

    // Event: Close Button
    dropdown.querySelector(".dropdown-close-btn").addEventListener("click", closeSettingsDropdown);

    // Event: Model selection (Exclusive)
    dropdown.querySelectorAll(".model-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const modelKey = btn.getAttribute("data-model");
            const eng = engineGetter();
            if (eng && modelKey) {
                eng.setCat(modelKey);
                updateSettingsDropdownUI(eng);
            }
        });
    });

    // Dynamic Swatches injection
    const swatchesRow = dropdown.querySelector(".palette-swatches-row");
    const palettes = VisualizerPalettes;
    Object.keys(palettes).forEach(key => {
        const p = palettes[key];
        const swatchBtn = document.createElement("button");
        swatchBtn.type = "button";
        swatchBtn.className = "dropdown-palette-btn";
        swatchBtn.setAttribute("data-palette", key);
        swatchBtn.title = p.name;
        swatchBtn.style.background = `linear-gradient(135deg, ${p.primary}, ${p.accent})`;
        swatchBtn.style.color = p.primary;

        swatchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const eng = engineGetter();
            if (eng) {
                eng.setPalette(key);
                updateSettingsDropdownUI(eng);
            }
        });

        swatchesRow.appendChild(swatchBtn);
    });

    // Event: Independent Effect Toggles
    dropdown.querySelectorAll(".toggle-checkbox").forEach(chk => {
        chk.addEventListener("change", (e) => {
            e.stopPropagation();
            const effectName = chk.getAttribute("data-effect");
            const eng = engineGetter();
            if (eng && effectName) {
                eng.setEffect(effectName, chk.checked);
            }
        });
    });

    // Event: Fullscreen button
    dropdown.querySelector("#dropdown-fs-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) {
            eng.toggleFullscreen();
            closeSettingsDropdown();
        }
    });

    // Click outside to dismiss
    document.addEventListener("click", (e) => {
        if (!dropdown.classList.contains("open")) return;
        if (dropdown.contains(e.target) || e.target.closest("#cosmic-cat-settings-btn")) return;
        closeSettingsDropdown();
    });

    // Escape key to dismiss
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.classList.contains("open")) {
            closeSettingsDropdown();
        }
    });

    return dropdown;
}

function updateSettingsDropdownUI(engine) {
    if (!settingsDropdownEl || !engine) return;

    // 1. Update Model Selection (Exclusive active state)
    settingsDropdownEl.querySelectorAll(".model-btn").forEach(btn => {
        const key = btn.getAttribute("data-model");
        btn.classList.toggle("active", key === engine.activeCat);
    });

    // 2. Update Palette Selection (Exclusive active state)
    const activePaletteId = engine.paletteManager.active ? engine.paletteManager.active.id : "cyberpunk";
    settingsDropdownEl.querySelectorAll(".dropdown-palette-btn").forEach(btn => {
        const key = btn.getAttribute("data-palette");
        btn.classList.toggle("active", key === activePaletteId);
    });

    // 3. Update Independent Effects Toggles
    const effects = engine.env.effects || {};
    settingsDropdownEl.querySelectorAll(".toggle-checkbox").forEach(chk => {
        const key = chk.getAttribute("data-effect");
        chk.checked = !!effects[key];
    });
}
