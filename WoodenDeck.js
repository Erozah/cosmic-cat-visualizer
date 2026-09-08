/**
 * WoodenDeck.js
 * Sleek, compact wooden deck/platform under the cat.
 * Grounded at the bottom ~15% of the screen with refined perspective planks,
 * wood grain, nail fasteners, surface specular reflections, and horizon rim light.
 */

class WoodenDeck {
    constructor() {
        this.plankCount = 4;
        this.planks = [];
        this.initPlanks();
    }

    initPlanks() {
        this.planks = [];
        for (let i = 0; i < this.plankCount; i++) {
            const shift = (Math.random() - 0.5) * 8;
            const r = Math.max(8, Math.min(32, 16 + shift));
            const g = Math.max(6, Math.min(26, 12 + shift * 0.8));
            const b = Math.max(10, Math.min(38, 22 + shift * 1.2));

            this.planks.push({
                r: r | 0,
                g: g | 0,
                b: b | 0,
                topColor: `rgba(${r + 6 | 0}, ${g + 5 | 0}, ${b + 8 | 0}, 0.95)`,
                midColor: `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.95)`,
                botColor: `rgba(${r - 4 | 0}, ${g - 3 | 0}, ${b - 5 | 0}, 0.95)`,
                grainColor: `rgba(${r + 14 | 0}, ${g + 12 | 0}, ${b + 18 | 0}, 0.16)`,
                nails: [0.12, 0.32, 0.5, 0.68, 0.88]
            });
        }
    }

    /**
     * Render the compact wooden deck at the bottom
     */
    render(ctx, width, height, deckY, palette, audioState) {
        if (deckY >= height) return;

        const deckHeight = height - deckY;
        const bass = audioState.bass || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0.5;

        ctx.save();

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

        for (let i = 0; i < this.plankCount; i++) {
            const progress = i / this.plankCount;
            const pHeight = deckHeight * (0.16 + progress * 0.16);
            const plankBottom = Math.min(height, currentY + pHeight);
            const plank = this.planks[i];

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

        // 3. Deck Horizon Rim Light (GPU Accelerated)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const rimGrad = ctx.createLinearGradient(0, deckY - 3, 0, deckY + 6);
        rimGrad.addColorStop(0, palette.accentAlpha(0.65 + beat * 0.35));
        rimGrad.addColorStop(0.35, palette.primaryAlpha(0.4 + bass * 0.3));
        rimGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = rimGrad;
        ctx.fillRect(0, deckY - 2, width, 8);

        // Diffuse rim line
        ctx.strokeStyle = palette.accentAlpha(0.5 + beat * 0.3);
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(0, deckY);
        ctx.lineTo(width, deckY);
        ctx.stroke();

        // Crisp white core rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + beat * 0.4})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, deckY);
        ctx.lineTo(width, deckY);
        ctx.stroke();

        ctx.restore();

        // 4. Ambient Cat & Energy Reflection on Polished Wood Surface
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const cx = width * 0.5;
        const reflW = width * 0.34 * (1.0 + bass * 0.2);
        const reflH = deckHeight * 0.85;

        const woodReflGrad = ctx.createRadialGradient(
            cx, deckY + 6, 4,
            cx, deckY + reflH * 0.5, reflW
        );

        const reflAlpha = (0.22 + bass * 0.18 + beat * 0.2) * (0.8 + energy * 0.4);
        woodReflGrad.addColorStop(0, palette.accentAlpha(reflAlpha * 0.9));
        woodReflGrad.addColorStop(0.3, palette.primaryAlpha(reflAlpha * 0.6));
        woodReflGrad.addColorStop(0.7, palette.secondaryAlpha(reflAlpha * 0.25));
        woodReflGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = woodReflGrad;
        ctx.beginPath();
        ctx.ellipse(cx, deckY + reflH * 0.4, reflW, reflH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 5. Contact Shadow directly beneath the cat's seated paws & haunches
        ctx.save();
        const contactShadowGrad = ctx.createRadialGradient(
            cx, deckY + 3, 8,
            cx, deckY + 4, width * 0.16
        );
        contactShadowGrad.addColorStop(0, "rgba(2, 1, 5, 0.90)");
        contactShadowGrad.addColorStop(0.6, "rgba(4, 2, 8, 0.6)");
        contactShadowGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = contactShadowGrad;
        ctx.beginPath();
        ctx.ellipse(cx, deckY + 3, width * 0.18, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = WoodenDeck;
}
