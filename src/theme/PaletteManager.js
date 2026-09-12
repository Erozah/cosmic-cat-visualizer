// src/theme/PaletteManager.js - State manager for visualizer color themes

class PaletteManager {
    constructor() {
        this.paletteKeys = Object.keys(VisualizerPalettes);
        this.currentIndex = 0;
        this.current = decoratePalette(VisualizerPalettes[this.paletteKeys[0]]);
    }

    setPalette(id, immediate = true) {
        if (!VisualizerPalettes[id]) return;
        this.currentIndex = this.paletteKeys.indexOf(id);
        this.current = decoratePalette(VisualizerPalettes[id]);
    }

    nextPalette() {
        this.currentIndex = (this.currentIndex + 1) % this.paletteKeys.length;
        const nextId = this.paletteKeys[this.currentIndex];
        this.setPalette(nextId, true);
        return this.current;
    }

    get active() {
        return this.current;
    }
}
