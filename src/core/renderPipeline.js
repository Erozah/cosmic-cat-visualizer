// src/core/renderPipeline.js - Frame rendering pipeline for backgrounds and cat models (SOLID LSP/OCP)

function renderVisualizerFrame(engine, dt, isStatic = false) {
    const ctx = engine.ctx;
    const palette = engine.paletteManager.active;

    if (!isStatic) {
        engine.audio.update(dt);
        engine.env.update(dt, engine.width, engine.height, engine.audio, palette, engine.catCenterX, engine.catCenterY);
        if (engine.env.mode === 'fractals') {
            engine.cosmicFractals.update(dt, engine.liveTime, engine.audio, engine.audio.isPlaying);
        }
    }

    ctx.save();
    ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);

    // 1. Render Background
    engine.env.render(ctx, engine.width, engine.height, engine.liveTime, engine.audio, palette, engine.catCenterX, engine.catCenterY, engine.cosmicFractals);

    // 2. Polymorphic Model Rendering (Liskov Substitution Principle)
    const model = engine.models[engine.activeCat] || engine.models.cyber;
    const catScale = Math.min(1.2, Math.max(0.65, Math.min(engine.width / 950, engine.height / 700)));

    if (!isStatic && model.update) {
        model.update(dt, engine.liveTime, engine.audio, engine.catCenterX, engine.catCenterY, engine.width, engine.height, engine.audio.isPlaying);
    }

    model.render(
        ctx,
        engine.catCenterX,
        engine.catCenterY,
        catScale,
        engine.liveTime,
        engine.audio,
        palette,
        engine.env.mode,
        engine.width,
        engine.height
    );

    ctx.restore();
}
