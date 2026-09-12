/**
 * VisualizerEngine.js
 * 60/120 FPS high-performance modular visualizer engine.
 * Renders celestial starfield, sacred geometry fractals, compact wooden deck,
 * and sitting cat silhouette with zero frame drops and smart resource suspension.
 */

class VisualizerEngine {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        
        // Modules
        this.audio = new AudioAnalysisEngine();
        this.palette = new ColorPalette();
        this.environment = new CosmicEnvironment(220);
        this.fractals = new CosmicFractals();
        this.deck = new WoodenDeck();
        this.cat = new CatGeometry();
        this.tail = new TailPhysics(20);

        // State & Timing
        this.isRunning = false;
        this.isPlaying = true;
        this.isPageVisible = typeof document === "undefined" || !document.hidden;
        this.animationFrameId = null;
        this.lastTime = performance.now();
        this.lastPausedFrameTime = 0;
        this.totalTime = 0;
        this.width = 0;
        this.height = 0;
        this.dpr = 1.0;

        // Customization settings
        this.settings = {
            sensitivity: options.sensitivity || 1.1,
            shockwavePower: options.shockwavePower || 1.2,
            theme: options.theme || "aurora",
            adaptiveColors: options.adaptiveColors === true
        };

        this.palette.setTheme(this.settings.theme, true);

        this.loop = this.loop.bind(this);
        this.resize = this.resize.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }

        this.resize();
    }

    handleVisibilityChange() {
        this.isPageVisible = !document.hidden;
        if (this.isPageVisible && this.isRunning && !this.animationFrameId) {
            this.lastTime = performance.now();
            this.animationFrameId = requestAnimationFrame(this.loop);
        }
    }

    resize() {
        if (!this.canvas) return;
        this.dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        
        const w = window.innerWidth || document.documentElement.clientWidth || 800;
        const h = window.innerHeight || document.documentElement.clientHeight || 600;

        this.width = Math.max(300, Math.floor(w));
        this.height = Math.max(300, Math.floor(h));

        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);

        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.resize();
        if (this.isPageVisible && !this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    updateSpotifyState(trackUri, progressMs, isPlaying = true, volume = 1.0) {
        if (trackUri) {
            this.audio.loadSpotifyAnalysis(trackUri);
        }
        this.currentProgressMs = progressMs;
        this.isPlaying = isPlaying;
        this.currentVolume = volume;
    }

    setTheme(themeKey, immediate = true) {
        this.settings.theme = themeKey;
        this.settings.adaptiveColors = false;
        if (this.palette) {
            this.palette.setTheme(themeKey, immediate);
        }
    }

    updateTrackColors(extractedColors) {
        if (this.settings.adaptiveColors && extractedColors) {
            this.palette.setAdaptiveFromColors(extractedColors);
        }
    }

    loop(currentTime) {
        this.animationFrameId = null;
        if (!this.isRunning || !this.isPageVisible) return;

        try {
            if (!currentTime || isNaN(currentTime)) {
                currentTime = performance.now();
            }

            const isPlaying = this.isPlaying !== false;

            const dt = Math.min(0.1, Math.max(0.001, (currentTime - this.lastTime) * 0.001));
            this.lastTime = currentTime;

            // Smooth continuous time progression
            const effectiveDt = isPlaying ? dt : dt * 0.7;
            this.totalTime += effectiveDt;

            // 1. Audio analysis update
            const rawAudio = this.audio.update(dt, this.currentProgressMs, isPlaying, this.currentVolume);
            
            const audioState = {
                ...rawAudio,
                energy: Math.min(1.0, (rawAudio?.energy || 0.5) * this.settings.sensitivity),
                bass: Math.min(1.0, (rawAudio?.bass || 0.2) * this.settings.sensitivity),
                mids: Math.min(1.0, (rawAudio?.mids || 0.2) * this.settings.sensitivity),
                highs: Math.min(1.0, (rawAudio?.highs || 0.2) * this.settings.sensitivity),
                beatImpulse: Math.min(1.0, (rawAudio?.beatImpulse || 0.0) * this.settings.sensitivity * this.settings.shockwavePower)
            };

            // 2. Color palette update
            this.palette.update(effectiveDt);

            // 3. Layout Coordinates (Compact wooden deck at bottom ~15%)
            const deckY = this.height * 0.85;
            const cx = this.width * 0.5;
            const cy = deckY - this.height * 0.28;

            const maxCatW = this.width * 0.44;
            const maxCatH = this.height * 0.65;
            const baseDim = Math.min(maxCatW * 1.17647, maxCatH * 0.90909);

            const catW = baseDim * 0.85;
            const catH = baseDim * 1.1;

            // 4. Update Dynamics
            this.environment.update(effectiveDt, this.totalTime, audioState, cx, cy, baseDim * 0.5, this.palette, this.width, this.height, isPlaying);
            this.fractals.update(effectiveDt, this.totalTime, audioState, isPlaying);

            // 5. Compute Deformed Cat Silhouette
            const deformedParams = this.cat.getDeformedPath(cx, cy, catW, catH, audioState, this.totalTime, deckY, isPlaying);

            // 6. RENDER SCENE LAYERS (Strict Z-ordering)
            const ctx = this.ctx;

            // Layer 1: Deep Cosmic Space & Stationary Pulsating Starfield
            this.environment.renderBackground(ctx, this.width, this.height, this.palette);

            // Layer 2: Volumetric Nebula Clouds & Large Ultra-Luminous Ambient Aura
            this.environment.renderNebulaAndAura(ctx, this.width, this.height, cx, cy, baseDim * 0.5, audioState, this.palette, this.totalTime);

            // Layer 3: Sacred Geometry Fractal Mandala Circle (Behind the Cat)
            this.fractals.render(ctx, cx, cy, baseDim * 0.50, this.palette, audioState);

            // Layer 4: Powerful Pulsing Radial Energy Waves (Emanating from Cat)
            this.environment.renderEnergyWaves(ctx, this.palette, this.totalTime);

            // Layer 5: Compact Wooden Deck Platform
            this.deck.render(ctx, this.width, this.height, deckY, this.palette, audioState);

            // Landmarks for Cat & Tail
            const landmarks = this.cat.buildBodyPath(ctx, deformedParams);

            // Layer 6: Realistic Cat Tail (Resting on wooden deck)
            const tailScale = (baseDim * 0.002) * 1.05;
            this.tail.update(landmarks.tailAnchor, tailScale, audioState, effectiveDt, this.totalTime, deckY, isPlaying);
            this.tail.render(ctx, this.palette, audioState, tailScale, deckY);

            // Layer 7: Cat Body Interior
            this.cat.buildBodyPath(ctx, deformedParams);
            this.cat.renderInterior(ctx, deformedParams, landmarks, this.palette, this.totalTime);

            // Layer 8: Cat Body Main Glowing Contour
            this.cat.buildBodyPath(ctx, deformedParams);
            this.cat.renderContour(ctx, deformedParams, this.palette);

            // Layer 9: Luminous Cat Ears
            this.cat.renderEarContours(ctx, deformedParams, landmarks, this.palette);
        } catch (err) {
            console.error("Cosmic Cat Visualizer loop error:", err);
        } finally {
            if (this.isRunning && this.isPageVisible) {
                this.animationFrameId = requestAnimationFrame(this.loop);
            }
        }
    }

    destroy() {
        this.stop();
        if (typeof document !== "undefined") {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        if (this.audio && this.audio.audioContext) {
            try {
                this.audio.audioContext.close();
            } catch (e) {}
        }
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = VisualizerEngine;
}
