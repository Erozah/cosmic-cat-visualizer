// src/core/VisualizerEngine.js - Master Orchestrator for Cyberpunk & Cosmic Cat Visualizer (SOLID Architecture)

class VisualizerEngine {
    constructor(canvas, panel) {
        this.canvas = canvas;
        this.panel = panel || null;
        this.ctx = canvas.getContext('2d', { alpha: false });
        this.dpr = window.devicePixelRatio || 1;

        this.paletteManager = new PaletteManager();
        this.audio = new AudioEngine();
        this.env = new BackgroundManager();
        this.cosmicFractals = new CosmicFractals();

        // Polymorphic Model Registry (SOLID OCP / LSP)
        this.models = {
            cyber: new CyberCat(),
            cosmic: new CosmicCat()
        };

        // Model & background selection
        this.activeCat = 'cyber'; // 'cyber' | 'cosmic'
        this.activeBg = 'stars';  // 'stars' | 'grid' | 'fractals' | 'nebula' | 'minimal'

        // State: Active/Foreground vs Deactivated/Frozen Background
        this.isForeground = true;
        this.isFrozen = false;
        this.loopRunning = true;
        this.isFullscreen = false;

        this.liveTime = 0;
        this.lastFrameTime = performance.now();

        this.width = window.innerWidth || 800;
        this.height = window.innerHeight || 600;
        this.catCenterX = this.width * 0.5;
        this.catCenterY = this.height * 0.52;

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.add('cyber-cat-visualizer-active');
        }

        setupResizeHandling(this);
        setupVisualizerKeybindings(this);

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    syncBounds() {
        syncPanelBounds(this);
    }

    toggleActive(forceState) {
        const nextActive = typeof forceState === 'boolean' ? forceState : !this.isForeground;
        this.isForeground = nextActive;
        this.isFrozen = !nextActive;

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.toggle('cyber-cat-visualizer-active', this.isForeground);
        }

        if (this.isForeground) {
            if (!this.loopRunning) {
                this.loopRunning = true;
                this.lastFrameTime = performance.now();
                requestAnimationFrame(this.loop);
            }
        } else {
            this.renderFrame(0.016, true);
            this.loopRunning = false;
        }

        this.updateAllUI();
    }

    get currentModel() {
        return this.activeCat;
    }

    get currentBg() {
        return this.activeBg;
    }

    get isActive() {
        return this.isForeground;
    }

    // Model getters for backward compatibility
    get cyberCat() {
        return this.models.cyber;
    }

    get cosmicCat() {
        return this.models.cosmic;
    }

    setCat(cat) {
        if (this.models[cat]) {
            this.activeCat = cat;
            this.updateAllUI();
            if (this.isFrozen) this.renderFrame(0.016, true);
        }
        return this.activeCat;
    }

    setBackground(mode) {
        this.env.setMode(mode);
        this.activeBg = this.env.mode;
        this.updateAllUI();
        if (this.isFrozen) this.renderFrame(0.016, true);
        return this.activeBg;
    }

    nextCat() {
        const keys = Object.keys(this.models);
        const idx = keys.indexOf(this.activeCat);
        this.activeCat = keys[(idx + 1) % keys.length];
        this.updateAllUI();
        if (this.isFrozen) this.renderFrame(0.016, true);
        return this.activeCat;
    }

    nextBackground() {
        this.activeBg = this.env.nextMode();
        this.updateAllUI();
        if (this.isFrozen) this.renderFrame(0.016, true);
        return this.activeBg;
    }

    nextPalette() {
        const p = this.paletteManager.nextPalette();
        this.updateHudSwatch();
        if (this.isFrozen) this.renderFrame(0.016, true);
        return p;
    }

    setPalette(id) {
        this.paletteManager.setPalette(id, true);
        this.updateHudSwatch();
        if (this.isFrozen) this.renderFrame(0.016, true);
    }

    updateHudSwatch() {
        updateHudThemeSwatch(this.paletteManager.active.id);
    }

    updateAllUI() {
        updateVisualizerUI(this);
    }

    toggleFullscreen(forceState) {
        toggleVisualizerFullscreen(this, forceState);
    }

    renderFrame(dt, isStatic = false) {
        renderVisualizerFrame(this, dt, isStatic);
    }

    loop(now) {
        try {
            const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000) || 0.016;
            this.lastFrameTime = now;
            this.liveTime += dt;

            if ((Math.floor(this.liveTime * 60) % 30) === 0) {
                syncPanelBounds(this);
            }

            if (this.isFrozen) return;

            this.renderFrame(dt, false);
        } catch (err) {
            console.error('[VisualizerEngine] Loop error:', err);
        } finally {
            if (this.loopRunning && !this.isFrozen) {
                requestAnimationFrame(this.loop);
            }
        }
    }

    destroy() {
        this.loopRunning = false;
        if (this.audio) {
            this.audio.disconnectLiveSource();
        }
    }
}
