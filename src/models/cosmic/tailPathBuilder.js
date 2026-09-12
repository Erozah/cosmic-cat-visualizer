// src/models/cosmic/tailPathBuilder.js - Catmull-Rom closed spline path builder for feline tail

function buildTailClosedPath(ctx, nodes, leftPoints, rightPoints, segmentCount, baseScale) {
    const lp = leftPoints;
    const rp = rightPoints;
    const n = segmentCount;

    ctx.beginPath();
    ctx.moveTo(lp[0].x, lp[0].y);

    // Left spine side (Smooth Catmull-Rom)
    for (let i = 0; i < n - 1; i++) {
        const p0 = i > 0 ? lp[i - 1] : lp[0];
        const p1 = lp[i];
        const p2 = lp[i + 1];
        const p3 = i < n - 2 ? lp[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
        const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
        const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
        const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    // Rounded tip cap
    const tip = nodes[n - 1];
    const tipRight = rp[n - 1];
    ctx.quadraticCurveTo(tip.x - 4 * baseScale, tip.y + 2 * baseScale, tipRight.x, tipRight.y);

    // Right spine side (back to root)
    for (let i = n - 1; i > 0; i--) {
        const p0 = i < n - 1 ? rp[i + 1] : rp[n - 1];
        const p1 = rp[i];
        const p2 = rp[i - 1];
        const p3 = i > 1 ? rp[i - 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
        const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
        const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
        const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    ctx.closePath();
}
