// src/models/cosmic/CosmicCat.js - Cohesive facade for Cosmic Cat model (Liskov Substitution Principle)

class CosmicCat {
    constructor() {
        this.geometry = new CatGeometry();
        this.tail = new TailPhysics(20);
        this.lastDeformedParams = null;
        this.lastScale = 1.0;
        this.lastDeckY = 0;
    }

    update(dt, time, audio, cx, cy, width, height, isPlaying = true) {
        const w = width || window.innerWidth || 800;
        const h = height || window.innerHeight || 600;
        const deckY = h * 0.86;
        const catWidth = Math.min(270, Math.min(w * 0.32, h * 0.44));
        const catHeight = catWidth * 1.35;
        const catScale = catWidth / 260;

        const deformedParams = this.geometry.getDeformedPath(
            cx, cy,
            catWidth, catHeight,
            audio, time,
            deckY, isPlaying
        );

        this.tail.update(
            this.geometry.landmarks.tailAnchor,
            catScale,
            audio,
            dt,
            time,
            deckY,
            isPlaying
        );

        this.lastDeformedParams = deformedParams;
        this.lastScale = catScale;
        this.lastDeckY = deckY;
    }

    render(ctx, cx, cy, scale, time, audio, palette, effects = null, width = 800, height = 600) {
        const w = width || window.innerWidth || 800;
        const h = height || window.innerHeight || 600;
        const deckY = this.lastDeckY || (h * 0.86);

        const catWidth = Math.min(270, Math.min(w * 0.32, h * 0.44)) * (scale || 1.0);
        const catHeight = catWidth * 1.35;
        const catScale = catWidth / 260;

        const p = this.lastDeformedParams || this.geometry.getDeformedPath(
            cx, cy, catWidth, catHeight, audio, time, deckY, audio.isPlaying
        );

        // 2. Render tail physics resting on deck
        this.tail.render(ctx, palette, audio, catScale, deckY);

        // 3. Render Cosmic Cat body interior, glowing ears and laser contour
        this.geometry.buildBodyPath(ctx, p);
        this.geometry.renderInterior(ctx, p, this.geometry.landmarks, palette, time);
        this.geometry.renderEarContours(ctx, p, this.geometry.landmarks, palette);

        this.geometry.buildBodyPath(ctx, p);
        this.geometry.renderContour(ctx, p, palette);
    }
}
