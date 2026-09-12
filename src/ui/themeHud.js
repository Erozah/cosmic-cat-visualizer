// src/ui/themeHud.js - Floating Theme Selector HUD as in legacy

function mountThemeHud(engineGetter) {
    let hud = document.getElementById("cosmic-cat-theme-hud");
    if (hud) return hud;

    hud = document.createElement("div");
    hud.id = "cosmic-cat-theme-hud";

    const updateHudContent = () => {
        const eng = engineGetter();
        const curPalette = eng ? eng.paletteManager.active : VisualizerPalettes.cyberpunk;
        const palettes = VisualizerPalettes;

        let swatchesHtml = "";
        for (const key of Object.keys(palettes)) {
            const p = palettes[key];
            const isActive = curPalette.id === p.id;
            swatchesHtml += `<button type="button" class="theme-swatch ${isActive ? 'active' : ''}" data-theme="${p.id}" style="background-color: ${p.primary}; color: ${p.primary};" title="${p.name}"></button>`;
        }

        hud.innerHTML = `
            <div class="hud-title" title="Cliquez pour changer de couleur (Raccourci: T)">
                <span class="hud-icon">🔮</span>
                <span class="hud-name">${curPalette.name}</span>
            </div>
            <div class="hud-swatches">
                ${swatchesHtml}
            </div>
        `;

        hud.querySelectorAll(".theme-swatch").forEach(sw => {
            sw.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const themeKey = sw.getAttribute("data-theme");
                const engInst = engineGetter();
                if (engInst && themeKey) engInst.setPalette(themeKey);
            });
        });

        const titleEl = hud.querySelector(".hud-title");
        if (titleEl) {
            titleEl.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const engInst = engineGetter();
                if (engInst) engInst.nextPalette();
            });
        }
    };

    updateHudContent();
    document.body.appendChild(hud);
    return hud;
}

function updateHudThemeSwatch(activePaletteId) {
    const hud = document.getElementById("cosmic-cat-theme-hud");
    if (!hud) return;

    const cur = VisualizerPalettes[activePaletteId];
    const nameEl = hud.querySelector(".hud-name");
    if (nameEl && cur) {
        nameEl.textContent = cur.name;
    }

    hud.querySelectorAll(".theme-swatch").forEach(sw => {
        const key = sw.getAttribute("data-theme");
        sw.classList.toggle("active", key === activePaletteId);
    });
}
