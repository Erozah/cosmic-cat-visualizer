// src/core/uiSync.js - Synchronizing visualizer state with the 2 playbar buttons & settings dropdown

function updateVisualizerUI(engine) {
    const curPalette = engine.paletteManager.active;

    // 1. Bouton On/Off (Chat)
    const toggleBtn = document.getElementById("cosmic-cat-toggle-btn");
    if (toggleBtn) {
        if (engine.isForeground) {
            toggleBtn.classList.add("active");
            toggleBtn.style.color = curPalette.primary;
            toggleBtn.title = `Visualiseur Chat : ACTIF (Clic pour désactiver | Modèle : ${engine.activeCat === 'cyber' ? 'Cyber Cat' : 'Cosmic Cat'})`;
        } else {
            toggleBtn.classList.remove("active");
            toggleBtn.style.color = "var(--spice-subtext, rgba(255,255,255,0.6))";
            toggleBtn.title = "Visualiseur Chat : INACTIF (Clic pour activer)";
        }
    }

    // 2. Bouton Paramètres ⚙️ (Masqué si le visualiseur est inactif)
    const settingsBtn = document.getElementById("cosmic-cat-settings-btn");
    if (settingsBtn) {
        settingsBtn.style.display = engine.isForeground ? "inline-flex" : "none";
        settingsBtn.style.color = engine.isForeground ? curPalette.primary : "var(--spice-subtext, rgba(255,255,255,0.6))";
        settingsBtn.title = "Paramètres du Visualiseur (Modèle, Thème, Effets)";
    }

    // 3. Mise à jour de l'interface du menu déroulant
    if (typeof updateSettingsDropdownUI === "function") {
        updateSettingsDropdownUI(engine);
    }
}
