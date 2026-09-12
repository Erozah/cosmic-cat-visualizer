// src/core/fullscreenManager.js - Fullscreen immersion mode and toast hint

let fullscreenHintTimer = null;

function showFullscreenHint() {
    let hint = document.getElementById('cyber-cat-fs-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'cyber-cat-fs-hint';
        hint.textContent = 'Cliquez n\'importe où pour quitter le plein écran';
        document.body.appendChild(hint);
    }
    hint.classList.add('visible');
    clearTimeout(fullscreenHintTimer);
    fullscreenHintTimer = setTimeout(() => {
        hint.classList.remove('visible');
    }, 3200);
}

function setupFullscreenClickHandler(engine) {
    window.addEventListener('click', (e) => {
        if (engine && engine.isFullscreen) {
            e.preventDefault();
            e.stopPropagation();
            engine.toggleFullscreen(false);
        }
    }, true);
}

function toggleVisualizerFullscreen(engine, forceState) {
    engine.isFullscreen = typeof forceState === 'boolean' ? forceState : !engine.isFullscreen;

    if (engine.isFullscreen && !engine.isForeground) {
        engine.toggleActive(true);
    }

    document.body.classList.toggle('cyber-cat-fullscreen-active', engine.isFullscreen);

    syncPanelBounds(engine);

    if (engine.isFullscreen) {
        showFullscreenHint();
    }
}
