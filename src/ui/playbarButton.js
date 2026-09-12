// src/ui/playbarButton.js - Injects visualizer toggle button into Spotify's player bar

function mountPlaybarButton(engineGetter) {
    if (document.getElementById('cyber-cat-playbar-btn')) return;

    const controls = document.querySelector('.main-nowPlayingBar-right') || 
                     document.querySelector('.Root__now-playing-bar');

    if (!controls) {
        setTimeout(() => mountPlaybarButton(engineGetter), 500);
        return;
    }

    const btn = document.createElement('button');
    btn.id = 'cyber-cat-playbar-btn';
    btn.className = 'cyber-cat-btn';
    btn.setAttribute('aria-label', 'Visualiseur Chat');
    btn.title = 'Cyber & Cosmic Cat Visualizer (Clic: Activer / Figer en arrière-plan, F: Plein écran)';
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4.5 10.5L3 4.5L9 7.5C10 7 11 6.8 12 6.8C13 6.8 14 7 15 7.5L21 4.5L19.5 10.5C20.5 12 21 13.8 21 15.5C21 19 17 21 12 21C7 21 3 19 3 15.5C3 13.8 3.5 12 4.5 10.5ZM8.5 13.5C7.67 13.5 7 14.17 7 15C7 15.83 7.67 16.5 8.5 16.5C9.33 16.5 10 15.83 10 15C10 14.17 9.33 13.5 8.5 13.5ZM15.5 13.5C14.67 13.5 14 14.17 14 15C14 15.83 14.67 16.5 15.5 16.5C16.33 16.5 17 15.83 17 15C17 14.17 16.33 13.5 15.5 13.5Z"/>
    </svg>`;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) eng.toggleActive();
    });

    controls.prepend(btn);
}
