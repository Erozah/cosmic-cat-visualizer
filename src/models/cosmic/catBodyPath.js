// src/models/cosmic/catBodyPath.js - Anatomical bezier spline path for cat viewed from behind

function buildCatBodyBezier(ctx, p, landmarks) {
    const { cx, cy, scaleX, scaleY, spineSway, earPerk, bass } = p;

    ctx.beginPath();

    // Start at bottom center base (resting flat on deck)
    const bX = cx;
    const bY = cy + 0.98 * scaleY;
    ctx.moveTo(bX, bY);

    // 1. Bottom center to Left Paw / Base
    const lpX = cx - 0.54 * scaleX;
    const lpY = cy + 0.97 * scaleY;
    ctx.quadraticCurveTo(cx - 0.25 * scaleX, cy + 0.98 * scaleY, lpX, lpY);

    // 2. Left Paw around seated Thigh / Flank
    const lThighX = cx + (-0.66 - bass * 0.04) * scaleX;
    const lThighY = cy + 0.68 * scaleY;
    ctx.quadraticCurveTo(cx - 0.64 * scaleX, cy + 0.92 * scaleY, lThighX, lThighY);

    // 3. Left Thigh up to Mid-Back / Waist
    const lBackX = cx + (-0.42 + spineSway * 0.2) * scaleX;
    const lBackY = cy + 0.24 * scaleY;
    ctx.quadraticCurveTo(cx - 0.65 * scaleX, cy + 0.44 * scaleY, lBackX, lBackY);

    // 4. Left Mid-Back to Shoulder
    const lShX = cx + (-0.34 + spineSway * 0.4) * scaleX;
    const lShY = cy - 0.04 * scaleY;
    ctx.quadraticCurveTo(cx - 0.40 * scaleX, cy + 0.08 * scaleY, lShX, lShY);

    // 5. Left Shoulder to Neck & Head Nape
    const lNapeX = cx + (-0.32 + spineSway * 0.6) * scaleX;
    const lNapeY = cy - 0.36 * scaleY;
    ctx.quadraticCurveTo(cx - 0.28 * scaleX, cy - 0.20 * scaleY, lNapeX, lNapeY);

    // 6. Left Nape to Outer Ear Base
    const lEarOuterX = cx + (-0.36 + spineSway * 0.6) * scaleX;
    const lEarOuterY = cy - 0.52 * scaleY;
    ctx.lineTo(lEarOuterX, lEarOuterY);

    // 7. Outer Ear Base to LEFT EAR TIP
    const lEarTipX = cx + (-0.31 - earPerk * 0.2 + spineSway * 0.7) * scaleX;
    const lEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
    ctx.quadraticCurveTo(cx - 0.37 * scaleX, cy - 0.76 * scaleY, lEarTipX, lEarTipY);

    // 8. Left Ear Tip to Inner Ear Base
    const lEarInnerX = cx + (-0.13 + spineSway * 0.7) * scaleX;
    const lEarInnerY = cy - 0.64 * scaleY;
    ctx.quadraticCurveTo(cx - 0.20 * scaleX, cy - 0.78 * scaleY, lEarInnerX, lEarInnerY);

    // 9. Inner Left Ear Base across Top of Head
    const rEarInnerX = cx + (0.13 + spineSway * 0.7) * scaleX;
    const rEarInnerY = cy - 0.64 * scaleY;
    ctx.quadraticCurveTo(cx + (0.0 + spineSway * 0.7) * scaleX, cy - 0.67 * scaleY, rEarInnerX, rEarInnerY);

    // 10. Inner Right Ear Base to RIGHT EAR TIP
    const rEarTipX = cx + (0.31 + earPerk * 0.2 + spineSway * 0.7) * scaleX;
    const rEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
    ctx.quadraticCurveTo(cx + 0.20 * scaleX, cy - 0.78 * scaleY, rEarTipX, rEarTipY);

    // 11. Right Ear Tip to Outer Right Ear Base
    const rEarOuterX = cx + (0.36 + spineSway * 0.6) * scaleX;
    const rEarOuterY = cy - 0.52 * scaleY;
    ctx.quadraticCurveTo(cx + 0.37 * scaleX, cy - 0.76 * scaleY, rEarOuterX, rEarOuterY);

    // 12. Outer Right Ear Base to Right Nape
    const rNapeX = cx + (0.32 + spineSway * 0.6) * scaleX;
    const rNapeY = cy - 0.36 * scaleY;
    ctx.lineTo(rNapeX, rNapeY);

    // 13. Right Nape to Right Shoulder
    const rShX = cx + (0.34 + spineSway * 0.4) * scaleX;
    const rShY = cy - 0.04 * scaleY;
    ctx.quadraticCurveTo(cx + 0.28 * scaleX, cy - 0.20 * scaleY, rShX, rShY);

    // 14. Right Shoulder to Mid-Back
    const rBackX = cx + (0.42 + spineSway * 0.2) * scaleX;
    const rBackY = cy + 0.24 * scaleY;
    ctx.quadraticCurveTo(cx + 0.40 * scaleX, cy + 0.08 * scaleY, rBackX, rBackY);

    // 15. Right Mid-Back to Right Thigh
    const rThighX = cx + (0.66 + bass * 0.04) * scaleX;
    const rThighY = cy + 0.68 * scaleY;
    ctx.quadraticCurveTo(cx + 0.65 * scaleX, cy + 0.44 * scaleY, rThighX, rThighY);

    // 16. Right Thigh to Right Paw & back to Bottom Center
    const rpX = cx + 0.54 * scaleX;
    const rpY = cy + 0.97 * scaleY;
    ctx.quadraticCurveTo(cx + 0.64 * scaleX, cy + 0.92 * scaleY, rpX, rpY);
    ctx.quadraticCurveTo(cx + 0.25 * scaleX, cy + 0.98 * scaleY, bX, bY);

    ctx.closePath();

    // Update landmarks
    if (landmarks) {
        landmarks.tailAnchor[0] = cx - 0.14 * scaleX;
        landmarks.tailAnchor[1] = cy + 0.92 * scaleY;
        landmarks.leftEarTip[0] = lEarTipX;
        landmarks.leftEarTip[1] = lEarTipY;
        landmarks.leftEarOuter[0] = lEarOuterX;
        landmarks.leftEarOuter[1] = lEarOuterY;
        landmarks.leftEarInner[0] = lEarInnerX;
        landmarks.leftEarInner[1] = lEarInnerY;
        landmarks.rightEarTip[0] = rEarTipX;
        landmarks.rightEarTip[1] = rEarTipY;
        landmarks.rightEarOuter[0] = rEarOuterX;
        landmarks.rightEarOuter[1] = rEarOuterY;
        landmarks.rightEarInner[0] = rEarInnerX;
        landmarks.rightEarInner[1] = rEarInnerY;
        landmarks.headCenter[0] = cx + (0.0 + spineSway * 0.7) * scaleX;
        landmarks.headCenter[1] = cy - 0.45 * scaleY;
        landmarks.spineMid[0] = cx + (0.0 + spineSway * 0.3) * scaleX;
        landmarks.spineMid[1] = cy + 0.12 * scaleY;
        landmarks.baseCenter[0] = bX;
        landmarks.baseCenter[1] = bY;
    }

    return landmarks;
}
