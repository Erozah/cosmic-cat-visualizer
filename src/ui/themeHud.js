// src/ui/themeHud.js - Floating HUD pill with model, background, theme swatches, and power button

function mountThemeHud(engineGetter) {
    if (document.getElementById('cyber-cat-hud')) return;

    const hud = document.createElement('div');
    hud.id = 'cyber-cat-hud';
    hud.className = 'cyber-cat-hud-pill';

    // 1. Cat model switcher button
    const catBtn = document.createElement('button');
    catBtn.id = 'hud-cat-btn';
    catBtn.className = 'hud-text-btn';
    catBtn.title = 'Changer de modèle (C): Cyber Cat / Cosmic Cat';
    catBtn.innerHTML = `<span class="hud-title"><svg viewBox="0 0 24 24" width="12" height="12" fill="#00f0ff"><circle cx="12" cy="12" r="8"/></svg> Cyber Cat</span>`;
    catBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.nextCat();
    });

    // 2. Background switcher button
    const bgBtn = document.createElement('button');
    bgBtn.id = 'hud-bg-btn';
    bgBtn.className = 'hud-text-btn';
    bgBtn.title = 'Changer de fond (G): Étoiles / Grille / Fractales / Minimal';
    bgBtn.innerHTML = `<span>✨ Fond</span>`;
    bgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.nextBackground();
    });

    // 3. Theme color swatches
    const swatches = document.createElement('div');
    swatches.className = 'hud-swatches';

    const palettes = VisualizerPalettes;
    Object.keys(palettes).forEach(key => {
        const p = palettes[key];
        const swatch = document.createElement('button');
        swatch.className = 'theme-swatch' + (key === 'cyberpunk' ? ' active' : '');
        swatch.setAttribute('data-palette', key);
        swatch.title = p.name;
        swatch.style.background = `linear-gradient(135deg, ${p.primary}, ${p.accent})`;
        swatch.style.color = p.primary;

        swatch.addEventListener('click', (e) => {
            e.stopPropagation();
            const eng = engineGetter();
            if (eng) eng.setPalette(key);
        });

        swatches.appendChild(swatch);
    });

    // 4. Power/Freeze toggle button
    const powerBtn = document.createElement('button');
    powerBtn.id = 'hud-power-btn';
    powerBtn.className = 'hud-action-btn';
    powerBtn.title = 'Activer au premier plan / Figer en arrière-plan (A)';
    powerBtn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>`;
    powerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.toggleActive();
    });

    hud.appendChild(catBtn);
    hud.appendChild(bgBtn);
    hud.appendChild(swatches);
    hud.appendChild(powerBtn);

    document.body.appendChild(hud);
}
