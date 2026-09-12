// src/models/cosmic/catContourRenderer.js - Multi-layer laser glowing silhouette contour

function renderCatContour(ctx, p, palette) {
    const { bass, highs, beat } = p;

    ctx.save();

    // Pass 0: Crisp thin dark contrast edge
    ctx.strokeStyle = "rgba(1, 1, 4, 0.95)";
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Layer 1: Fine volumetric glow
    ctx.strokeStyle = palette.primaryAlpha(0.85 + bass * 0.15);
    ctx.lineWidth = 5.2 + bass * 1.5;
    ctx.stroke();

    // Layer 2: Ultra-vibrant laser neon edge
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Layer 3: Pure starlight white laser core
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 + highs * 0.05})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();

    // Layer 4: High-energy beat flash
    if (beat > 0.3) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${beat * 0.8})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
    }

    ctx.restore();
    ctx.restore();
}
