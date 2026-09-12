// src/core/fullscreenManager.js - Fullscreen immersion mode and toast hint

let fullscreenHintTimer = null;

function showFullscreenHint() {
    let hint = document.getElementById('cyber-cat-fs-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'cyber-cat-fs-hint';
        hint.textContent = 'Appuyez sur Échap ou cliquez pour quitter le plein écran';
        document.body.appendChild(hint);
    }
    hint.classList.add('visible');
    clearTimeout(fullscreenHintTimer);
    fullscreenHintTimer = setTimeout(() => {
        hint.classList.remove('visible');
    }, 3000);
}

function toggleVisualizerFullscreen(engine, forceState) {
    engine.isFullscreen = typeof forceState === 'boolean' ? forceState : !engine.isFullscreen;

    if (engine.isFullscreen && !engine.isForeground) {
        engine.toggleActive(true);
    }

    document.body.classList.toggle('cyber-cat-fullscreen-active', engine.isFullscreen);
    if (engine.panel) {
        engine.panel.classList.toggle('fullscreen', engine.isFullscreen);
    }

    syncPanelBounds(engine);

    if (engine.isFullscreen) {
        showFullscreenHint();
    }
}
