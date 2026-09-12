// src/models/cosmic/deckPlanks.js - Wooden deck plank geometry, wood grain, and fasteners

function initDeckPlanks(count = 4) {
    const planks = [];
    for (let i = 0; i < count; i++) {
        const shift = (Math.random() - 0.5) * 8;
        const r = Math.max(8, Math.min(32, 16 + shift));
        const g = Math.max(6, Math.min(26, 12 + shift * 0.8));
        const b = Math.max(10, Math.min(38, 22 + shift * 1.2));

        planks.push({
            r: r | 0,
            g: g | 0,
            b: b | 0,
            topColor: `rgba(${(r + 6) | 0}, ${(g + 5) | 0}, ${(b + 8) | 0}, 0.95)`,
            midColor: `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.95)`,
            botColor: `rgba(${(r - 4) | 0}, ${(g - 3) | 0}, ${(b - 5) | 0}, 0.95)`,
            grainColor: `rgba(${(r + 14) | 0}, ${(g + 12) | 0}, ${(b + 18) | 0}, 0.16)`,
            nails: [0.12, 0.32, 0.5, 0.68, 0.88]
        });
    }
    return planks;
}

function renderDeckPlanks(ctx, width, height, deckY, planks) {
    const deckHeight = height - deckY;

    // 1. Base Deck Floor Fill
    const baseDeckGrad = ctx.createLinearGradient(0, deckY, 0, height);
    baseDeckGrad.addColorStop(0, "rgba(14, 10, 20, 0.98)");
    baseDeckGrad.addColorStop(0.35, "rgba(20, 14, 26, 0.99)");
    baseDeckGrad.addColorStop(0.7, "rgba(12, 8, 18, 1.0)");
    baseDeckGrad.addColorStop(1.0, "rgba(6, 4, 12, 1.0)");

    ctx.fillStyle = baseDeckGrad;
    ctx.fillRect(0, deckY, width, deckHeight);

    // 2. Horizontal Wooden Planks
    let currentY = deckY;
    const count = planks.length;

    for (let i = 0; i < count; i++) {
        const progress = i / count;
        const pHeight = deckHeight * (0.16 + progress * 0.16);
        const plankBottom = Math.min(height, currentY + pHeight);
        const plank = planks[i];

        const pGrad = ctx.createLinearGradient(0, currentY, 0, plankBottom);
        pGrad.addColorStop(0, plank.topColor);
        pGrad.addColorStop(0.5, plank.midColor);
        pGrad.addColorStop(1.0, plank.botColor);

        ctx.fillStyle = pGrad;
        ctx.fillRect(0, currentY, width, pHeight);

        // Wood Grain Streaks
        ctx.strokeStyle = plank.grainColor;
        ctx.lineWidth = 1.0;
        const grainY = currentY + pHeight * 0.45;

        ctx.beginPath();
        ctx.moveTo(0, grainY);
        ctx.quadraticCurveTo(width * 0.45, grainY - 1.2, width, grainY + 0.8);
        ctx.stroke();

        // Plank Seam Shadow
        ctx.fillStyle = "rgba(4, 3, 8, 0.95)";
        ctx.fillRect(0, plankBottom - 1.5, width, 1.5);

        // Plank Top Bevel Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
        ctx.fillRect(0, currentY, width, 1);

        // Nail Fasteners
        const nails = plank.nails;
        const nailY = currentY + pHeight * 0.5;
        for (let j = 0; j < nails.length; j++) {
            const nailX = nails[j] * width;

            ctx.beginPath();
            ctx.arc(nailX, nailY, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(10, 8, 16, 0.85)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(nailX - 0.4, nailY - 0.4, 0.9, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
            ctx.fill();
        }

        currentY = plankBottom;
    }
}
