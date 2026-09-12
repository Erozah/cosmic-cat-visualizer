// src/core/panelBounds.js - Viewport canvas sizing & natural central placement (L25)

function syncPanelBounds(engine) {
    if (!engine.canvas) return;

    engine.dpr = window.devicePixelRatio || 1;
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;

    const targetW = Math.floor(engine.width * engine.dpr);
    const targetH = Math.floor(engine.height * engine.dpr);

    if (engine.canvas.width !== targetW || engine.canvas.height !== targetH) {
        engine.canvas.width = targetW;
        engine.canvas.height = targetH;
        engine.ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);
        engine.env.resize(engine.width, engine.height);
    }

    // Direct natural centering across the full viewport
    engine.catCenterX = engine.width * 0.5;
    engine.catCenterY = engine.height * 0.52;
}

function setupResizeHandling(engine) {
    const handleResize = () => {
        syncPanelBounds(engine);
        if (engine.isFrozen) {
            engine.renderFrame(0.016, true);
        }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
}
