// src/ui/controlBar.js - Floating control bar for visualizer switching

function mountControlBar(engineGetter) {
    let bar = document.getElementById('cyber-cat-control-bar');
    if (bar) return bar;

    bar = document.createElement('div');
    bar.id = 'cyber-cat-control-bar';
    bar.innerHTML = `
        <div class="control-left-badges">
            <button id="control-cat-btn" class="control-badge-btn" title="Alterner Modèle Chat: Cyber Cat / Cosmic Cat (C)">
                🐱 CYBER CAT
            </button>
            <button id="control-bg-btn" class="control-badge-btn" title="Alterner Fond: Étoiles / Grille / Fractales / Minimal (G)">
                ✨ ÉTOILES
            </button>
        </div>
        <div class="control-actions">
            <button id="control-theme-btn" class="control-action-btn" title="Changer de Palette de Couleurs (T)">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.59 10.54 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
            </button>
            <button id="control-freeze-btn" class="control-action-btn freeze-btn" title="Activer / Figer le visualiseur (A)">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <button id="control-fs-btn" class="control-action-btn" title="Plein Écran immersif (F)">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
        </div>
    `;

    document.body.appendChild(bar);

    bar.querySelector('#control-cat-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.nextCat();
    });
    bar.querySelector('#control-bg-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.nextBackground();
    });
    bar.querySelector('#control-theme-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.nextPalette();
    });
    bar.querySelector('#control-freeze-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.toggleActive();
    });
    bar.querySelector('#control-fs-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.toggleFullscreen();
    });

    return bar;
}
