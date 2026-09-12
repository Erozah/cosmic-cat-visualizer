// src/models/cosmic/WoodenDeck.js - Grounded wooden deck orchestrator

class WoodenDeck {
    constructor() {
        this.planks = initDeckPlanks(4);
    }

    render(ctx, width, height, deckY, palette, audioState, cx = null) {
        if (deckY >= height) return;

        const centerX = cx !== null ? cx : width * 0.5;
        ctx.save();
        renderDeckPlanks(ctx, width, height, deckY, this.planks);
        renderDeckLighting(ctx, width, height, deckY, palette, audioState, centerX);
        ctx.restore();
    }
}
