// src/core/uiSync.js - Synchronizing visualizer state with DOM UI elements

function updateHudThemeSwatch(activePaletteId) {
    const hud = document.getElementById('cyber-cat-hud');
    if (!hud) return;
    const swatches = hud.querySelectorAll('.theme-swatch');
    swatches.forEach(s => {
        s.classList.toggle('active', s.getAttribute('data-palette') === activePaletteId);
    });
}

function updateVisualizerUI(engine) {
    // 1. Playbar Button
    const playbarBtn = document.getElementById('cyber-cat-playbar-btn');
    if (playbarBtn) {
        playbarBtn.classList.toggle('deactivated', !engine.isForeground);
        playbarBtn.title = engine.isForeground 
            ? 'Cyber & Cosmic Cat: Visualiseur Actif (Clic pour passer en mode navigation)'
            : 'Cyber & Cosmic Cat: Mode Navigation (Clic pour activer le visualiseur)';
    }

    // 2. Control Bar Badges
    const catBadge = document.getElementById('control-cat-btn') || document.getElementById('panel-cat-switcher-btn');
    if (catBadge) {
        catBadge.innerHTML = engine.activeCat === 'cyber' ? '🐱 CYBER CAT' : '🌌 COSMIC CAT';
    }

    const bgBadge = document.getElementById('control-bg-btn') || document.getElementById('panel-bg-switcher-btn');
    if (bgBadge) {
        const bgLabels = {
            stars: '✨ ÉTOILES',
            grid: '🌐 CYBER GRILLE',
            fractals: '☸️ FRACTALES',
            nebula: '🌌 NÉBULEUSE',
            minimal: '🌑 MINIMAL'
        };
        bgBadge.innerHTML = bgLabels[engine.activeBg] || '✨ ÉTOILES';
    }

    const freezeBtn = document.getElementById('control-freeze-btn') || document.getElementById('panel-freeze-btn');
    if (freezeBtn) {
        freezeBtn.title = engine.isForeground ? 'Figer / mode navigation (A)' : 'Réactiver le visualiseur (A)';
        freezeBtn.innerHTML = engine.isForeground 
            ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
            : '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    }

    // 3. HUD status
    const hudTitle = document.querySelector('#cyber-cat-hud .hud-title');
    if (hudTitle) {
        const catName = engine.activeCat === 'cyber' ? 'Cyber Cat' : 'Cosmic Cat';
        const statusDot = engine.isForeground ? '#00f0ff' : '#666666';
        hudTitle.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="${statusDot}"><circle cx="12" cy="12" r="8"/></svg> ${catName}`;
    }
}
