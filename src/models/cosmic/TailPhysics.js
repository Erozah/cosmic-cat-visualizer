// src/models/cosmic/TailPhysics.js - Tail physics orchestrator

class TailPhysics {
    constructor(segmentCount = 20) {
        this.segmentCount = segmentCount;
        this.nodes = [];
        this.leftPoints = [];
        this.rightPoints = [];

        for (let i = 0; i < this.segmentCount; i++) {
            this.nodes.push({ x: 0, y: 0, thickness: 1.0 });
            this.leftPoints.push({ x: 0, y: 0 });
            this.rightPoints.push({ x: 0, y: 0 });
        }

        this.swayPhase = 0;
        this.tipTwitch = 0;
        this.deckTapImpulse = 0;
        this.initialized = false;
        this.sparkTrail = [];
    }

    update(anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying = true) {
        updateTailKinematics(this, anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying);
        const tipNode = this.nodes[this.segmentCount - 1];
        updateTailSparks(this.sparkTrail, tipNode, baseScale, audioState, dt, isPlaying);
    }

    buildTailPath(ctx, baseScale) {
        buildTailClosedPath(ctx, this.nodes, this.leftPoints, this.rightPoints, this.segmentCount, baseScale);
    }

    render(ctx, palette, audioState, baseScale, deckY) {
        renderTailLayers(ctx, this, palette, audioState, baseScale, deckY);
    }
}
