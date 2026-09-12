// src/models/cosmic/deckLighting.js - Wooden deck rim light, reflection, and contact shadow

function renderDeckLighting(ctx, width, height, deckY, palette, audioState) {
    const deckHeight = height - deckY;
    const bass = audioState.bass || 0;
    const beat = audioState.beatImpulse || 0;
    const energy = audioState.energy || 0.5;
    const cx = width * 0.5;

    // 1. Deck Horizon Rim Light
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

    // 2. Ambient Cat & Energy Reflection on Polished Wood Surface
    ctx.save();
    ctx.globalCompositeOperation = "screen";

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

    // 3. Contact Shadow directly beneath the cat's seated paws & haunches
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
}
