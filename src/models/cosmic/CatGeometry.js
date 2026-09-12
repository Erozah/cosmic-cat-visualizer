// src/models/cosmic/CatGeometry.js - Cat mathematical geometry and landmarks facade

class CatGeometry {
    constructor() {
        this.landmarks = {
            tailAnchor: [0, 0],
            leftEarTip: [0, 0],
            leftEarOuter: [0, 0],
            leftEarInner: [0, 0],
            rightEarTip: [0, 0],
            rightEarOuter: [0, 0],
            rightEarInner: [0, 0],
            headCenter: [0, 0],
            spineMid: [0, 0],
            baseCenter: [0, 0]
        };
    }

    getDeformedPath(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
        return computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying);
    }

    buildBodyPath(ctx, p) {
        return buildCatBodyBezier(ctx, p, this.landmarks);
    }

    renderEarContours(ctx, p, landmarks, palette) {
        renderCatEars(ctx, p, landmarks, palette);
    }

    renderInterior(ctx, p, landmarks, palette, time) {
        renderCatInterior(ctx, p, landmarks, palette, time);
    }

    renderContour(ctx, p, palette) {
        renderCatContour(ctx, p, palette);
    }
}
