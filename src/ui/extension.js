// src/ui/extension.js - Spicetify Extension Entry Point for Cyber & Cosmic Cat Visualizer

(function() {
    let engineInstance = null;
    const getEngine = () => engineInstance;

    function initCyberCatVisualizer() {
        if (!Spicetify.Player || !Spicetify.Platform) {
            setTimeout(initCyberCatVisualizer, 250);
            return;
        }

        // 1. Mount Persistent Full-Window Wallpaper Canvas
        const canvas = mountGlobalCanvas();

        // 2. Initialize Visualizer Engine
        if (!engineInstance && canvas) {
            engineInstance = new VisualizerEngine(canvas);
            window.cyberCatEngine = engineInstance;
            window.catVisualizerEngine = engineInstance;
        }

        // 3. Mount UI Controls (The 2 Playbar Buttons & Settings Dropdown)
        mountPlaybarButtons(getEngine);
        initPlaybarObserver(getEngine);
        mountSettingsDropdown(getEngine);

        // 4. Click canvas in fullscreen to exit
        if (canvas) {
            canvas.addEventListener('click', () => {
                if (engineInstance && engineInstance.isFullscreen) {
                    engineInstance.toggleFullscreen(false);
                }
            });
        }

        // 5. Register Spicetify Menu Items (Heritage Legacy)
        if (typeof Spicetify !== "undefined" && Spicetify.Menu && Spicetify.Menu.Item) {
            try {
                new Spicetify.Menu.Item("Cat Visualizer : Modèle Suivant (C)", false, () => {
                    if (engineInstance) engineInstance.nextCat();
                }).register();
                new Spicetify.Menu.Item("Cat Visualizer : Fond Suivant (G)", false, () => {
                    if (engineInstance) engineInstance.nextBackground();
                }).register();
                new Spicetify.Menu.Item("Cat Visualizer : Thème Suivant (T)", false, () => {
                    if (engineInstance) engineInstance.nextPalette();
                }).register();
            } catch (e) {}
        }

        console.log('[CyberCat] Global wallpaper visualizer safely initialized.');
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initCyberCatVisualizer();
    } else {
        document.addEventListener('DOMContentLoaded', initCyberCatVisualizer);
    }
})();
