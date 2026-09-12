// src/models/cosmic/WoodenDeck.js - Grounded wooden deck orchestrator

class WoodenDeck {
    constructor() {
        this.planks = initDeckPlanks(4);
    }

    render(ctx, width, height, deckY, palette, audioState) {
        if (deckY >= height) return;

        ctx.save();
        renderDeckPlanks(ctx, width, height, deckY, this.planks);
        renderDeckLighting(ctx, width, height, deckY, palette, audioState);
        ctx.restore();
    }
}
