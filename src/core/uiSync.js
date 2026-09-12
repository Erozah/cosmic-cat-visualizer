// src/core/uiSync.js - Synchronizing visualizer state with DOM UI elements (Legacy Buttons & HUD)

function updateVisualizerUI(engine) {
    const curPalette = engine.paletteManager.active;

    // 1. Playbar Cat Button (Legacy Appearance)
    const playbarBtn = document.getElementById("cosmic-cat-playbar-btn");
    if (playbarBtn) {
        if (engine.isForeground) {
            playbarBtn.classList.add("active");
            playbarBtn.style.color = curPalette.primary;
            playbarBtn.title = `Cosmic Cat : ACTIF (Clic: Pause | Clic-droit: Thème | Double-clic: Modèle [${engine.activeCat}])`;
        } else {
            playbarBtn.classList.remove("active");
            playbarBtn.style.color = "var(--spice-subtext, rgba(255,255,255,0.6))";
            playbarBtn.title = "Cosmic Cat : INACTIF (Clic pour Activer)";
        }
    }

    // 2. Playbar Theme Button (Legacy Appearance)
    const themeBtn = document.getElementById("cosmic-cat-theme-btn");
    if (themeBtn) {
        themeBtn.style.color = curPalette.primary;
        themeBtn.title = `Thème : ${curPalette.name} (Clic: Changer de couleur | Clic-droit: Décor)`;
    }

    // 3. HUD status & swatches
    updateHudThemeSwatch(curPalette.id);

    const hud = document.getElementById("cosmic-cat-theme-hud");
    if (hud) {
        hud.style.display = engine.isForeground ? "flex" : "none";
    }
}
