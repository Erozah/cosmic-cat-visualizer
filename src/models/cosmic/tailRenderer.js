// src/models/cosmic/tailRenderer.js - Tail canvas rendering with glow and contact shadow

function renderTailLayers(ctx, tail, palette, audioState, baseScale, deckY) {
    if (tail.nodes.length < 3) return;

    const bass = audioState.bass || 0;
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    ctx.save();

    // 1. Tail Contact Shadow onto Wooden Deck
    if (deckY) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tail.nodes[0].x, deckY + 4);
        for (let i = 1; i < tail.segmentCount; i++) {
            ctx.lineTo(tail.nodes[i].x, deckY + 6);
        }
        ctx.lineWidth = 14 * baseScale;
        ctx.strokeStyle = "rgba(2, 1, 6, 0.45)";
        ctx.stroke();
        ctx.restore();
    }

    // 2. Tail Interior Cosmic Shimmer
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    const rootNode = tail.nodes[0];
    const tipNode = tail.nodes[tail.segmentCount - 1];
    const tailGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
    tailGrad.addColorStop(0, "rgba(16, 12, 32, 0.95)");
    tailGrad.addColorStop(0.5, "rgba(10, 8, 24, 0.98)");
    tailGrad.addColorStop(1.0, "rgba(6, 4, 16, 1.0)");
    ctx.fillStyle = tailGrad;
    ctx.fill();

    // Subtle inner energy core
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const innerEnergyGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
    innerEnergyGrad.addColorStop(0, palette.primaryAlpha(0.25 + bass * 0.2));
    innerEnergyGrad.addColorStop(0.6, palette.accentAlpha(0.20 + highs * 0.2));
    innerEnergyGrad.addColorStop(1.0, palette.accentAlpha(0.35 + beat * 0.3));
    ctx.fillStyle = innerEnergyGrad;
    ctx.fill();
    ctx.restore();

    // 3. Glowing Feline Fur Outer Contour (GPU Accelerated)
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Outer soft glow
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = palette.primaryAlpha(0.75 + bass * 0.25);
    ctx.lineWidth = 3.5 * baseScale;
    ctx.stroke();

    // Vibrant neon rim
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 1.8 * baseScale;
    ctx.stroke();

    // Starlight crisp highlight
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.92 + highs * 0.08})`;
    ctx.lineWidth = 0.9 * baseScale;
    ctx.stroke();

    // Tip glowing energy tuft
    const tipGlow = ctx.createRadialGradient(tipNode.x, tipNode.y, 0, tipNode.x, tipNode.y, 16 * baseScale);
    tipGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    tipGlow.addColorStop(0.35, palette.accentAlpha(0.85));
    tipGlow.addColorStop(0.75, palette.primaryAlpha(0.4));
    tipGlow.addColorStop(1.0, "transparent");

    ctx.fillStyle = tipGlow;
    ctx.beginPath();
    ctx.arc(tipNode.x, tipNode.y, 16 * baseScale, 0, Math.PI * 2);
    ctx.fill();

    // Spark trail
    renderTailSparks(ctx, tail.sparkTrail, palette);

    ctx.restore();
    ctx.restore();
}
