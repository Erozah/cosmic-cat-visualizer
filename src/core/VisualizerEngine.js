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
        this.woodenDeck = new WoodenDeck();

        // Polymorphic Model Registry (SOLID OCP / LSP)
        this.models = {
            cyber: new CyberCat(),
            cosmic: new CosmicCat()
        };

        // Saved or default model selection (Exclusive selection)
        const savedModel = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-model') : null;
        this.activeCat = (savedModel && this.models[savedModel]) ? savedModel : 'cyber';

        // Saved theme
        const savedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-theme') : null;
        if (savedTheme) {
            this.paletteManager.setPalette(savedTheme, true);
        }

        // State: Active vs Frozen/Paused
        const savedActive = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-bg-enabled') === 'true' : false;
        this.isForeground = savedActive;
        this.isFrozen = true;
        this.loopRunning = false;
        this.isFullscreen = false;

        this.liveTime = 0;
        this.lastFrameTime = performance.now();

        this.width = window.innerWidth || 800;
        this.height = window.innerHeight || 600;
        this.catCenterX = this.width * 0.5;
        this.catCenterY = this.height * 0.52;

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.toggle('cyber-cat-visualizer-active', this.isForeground);
        }

        if (this.canvas) {
            this.canvas.style.display = this.isForeground ? 'block' : 'none';
        }

        setupResizeHandling(this);
        setupVisualizerKeybindings(this);
        setupFullscreenClickHandler(this);

        // Spotify player hook: freeze when music is paused, unfreeze when playing
        if (typeof Spicetify !== "undefined" && Spicetify.Player) {
            Spicetify.Player.addEventListener("onplaypause", () => {
                const playing = Spicetify.Player.isPlaying();
                this.audio.isPlaying = playing;
                if (this.isForeground) {
                    if (playing) {
                        this.unfreeze();
                    } else {
                        this.freeze();
                    }
                }
            });
        }

        this.loop = this.loop.bind(this);
        if (this.isForeground) {
            const isPlaying = this.audio && this.audio.isPlaying;
            if (isPlaying) {
                this.unfreeze();
            } else {
                this.freeze();
            }
        }
    }

    freeze() {
        if (!this.isForeground) return;
        this.isFrozen = true;
        this.loopRunning = false;
        this.renderFrame(0.016, true);
    }

    unfreeze() {
        if (!this.isForeground) return;
        this.isFrozen = false;
        if (!this.loopRunning) {
            this.loopRunning = true;
            this.lastFrameTime = performance.now();
            requestAnimationFrame(this.loop);
        }
    }

    syncBounds() {
        syncPanelBounds(this);
    }

    toggleActive(forceState) {
        const nextActive = typeof forceState === 'boolean' ? forceState : !this.isForeground;
        this.isForeground = nextActive;

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cosmic-cat-bg-enabled', this.isForeground ? 'true' : 'false');
        }

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.toggle('cyber-cat-visualizer-active', this.isForeground);
        }

        if (this.isForeground) {
            // ON: show canvas and resume/freeze depending on playback state
            if (this.canvas) {
                this.canvas.style.display = 'block';
            }
            const isPlaying = this.audio && this.audio.isPlaying;
            if (isPlaying) {
                this.unfreeze();
            } else {
                this.freeze();
            }
        } else {
            // OFF: completely hide canvas, clear canvas pixels and stop loop
            this.loopRunning = false;
            this.isFrozen = true;
            if (this.canvas) {
                this.canvas.style.display = 'none';
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (typeof closeSettingsDropdown === 'function') {
                closeSettingsDropdown();
            }
        }

        this.updateAllUI();
    }

    get currentModel() {
        return this.activeCat;
    }

    get isActive() {
        return this.isForeground;
    }

    get cyberCat() {
        return this.models.cyber;
    }

    get cosmicCat() {
        return this.models.cosmic;
    }

    // Exclusive Cat Model Selection (Activating one disables the other)
    setCat(cat) {
        if (this.models[cat]) {
            this.activeCat = cat;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('cosmic-cat-model', cat);
            }
            this.updateAllUI();
            if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        }
        return this.activeCat;
    }

    nextCat() {
        const keys = Object.keys(this.models);
        const idx = keys.indexOf(this.activeCat);
        return this.setCat(keys[(idx + 1) % keys.length]);
    }

    // Exclusive Palette Selection (Activating one disables the previous)
    setPalette(id) {
        this.paletteManager.setPalette(id, true);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cosmic-cat-theme', id);
        }
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
    }

    nextPalette() {
        const p = this.paletteManager.nextPalette();
        if (typeof localStorage !== 'undefined' && p && p.id) {
            localStorage.setItem('cosmic-cat-theme', p.id);
        }
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return p;
    }

    // Independent Effect Toggles (Fractals, Stars, Nebula, Grid, Shockwaves, Deck)
    toggleEffect(name) {
        const res = this.env.toggleEffect(name);
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return res;
    }

    setEffect(name, enabled) {
        const res = this.env.setEffect(name, enabled);
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return res;
    }

    getEffect(name) {
        return this.env.getEffect(name);
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
        if (!this.isForeground) {
            this.loopRunning = false;
            return;
        }

        // When visualizer is active but music is paused, freeze animation (0% CPU)
        if (this.audio && !this.audio.isPlaying) {
            this.freeze();
            return;
        }

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
            if (this.loopRunning && !this.isFrozen && this.isForeground) {
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
