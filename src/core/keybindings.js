// src/core/keybindings.js - Global keyboard shortcut listeners

function setupVisualizerKeybindings(engine) {
    window.addEventListener('keydown', (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

        if (e.key === 'a' || e.key === 'A' || e.key === 'v' || e.key === 'V') {
            e.preventDefault();
            engine.toggleActive();
        } else if (e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            engine.nextCat();
        } else if (e.key === 'b' || e.key === 'B' || e.key === 'g' || e.key === 'G') {
            e.preventDefault();
            engine.nextBackground();
        } else if (e.key === 't' || e.key === 'T') {
            e.preventDefault();
            engine.nextPalette();
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            engine.toggleFullscreen();
        } else if (e.key === 'Escape' && engine.isFullscreen) {
            e.preventDefault();
            engine.toggleFullscreen(false);
        }
    });
}
