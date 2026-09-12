// src/models/cosmic/deckLighting.js - Wooden deck rim light, reflection, and contact shadow with audio transients

function renderDeckLighting(ctx, width, height, deckY, palette, audioState, centerX = null) {
    const deckHeight = height - deckY;
    const bass = audioState.bass || 0;
    const beat = audioState.beatImpulse || 0;
    const snare = audioState.snareImpulse || 0;
    const energy = audioState.energy || 0.5;
    const isDrop = audioState.isDrop || false;
    const dropMultiplier = isDrop ? 1.4 : 1.0;
    const cx = centerX !== null ? centerX : width * 0.5;

    // 1. Deck Horizon Rim Light
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const rimGrad = ctx.createLinearGradient(0, deckY - 4, 0, deckY + 8);
    rimGrad.addColorStop(0, palette.accentAlpha(Math.min(1.0, (0.65 + beat * 0.35 + snare * 0.3) * dropMultiplier)));
    rimGrad.addColorStop(0.35, palette.primaryAlpha(Math.min(1.0, (0.4 + bass * 0.3) * dropMultiplier)));
    rimGrad.addColorStop(1.0, "transparent");

    ctx.fillStyle = rimGrad;
    ctx.fillRect(0, deckY - 3, width, 10);

    // Diffuse rim line
    ctx.strokeStyle = palette.accentAlpha(Math.min(1.0, (0.5 + beat * 0.3 + snare * 0.25) * dropMultiplier));
    ctx.lineWidth = 3.0 + (isDrop ? 1.5 : 0);
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    // Crisp white core rim (flashes bright on snares & drops)
    const whiteRimAlpha = Math.min(1.0, (0.6 + beat * 0.4 + snare * 0.4) * dropMultiplier);
    ctx.strokeStyle = `rgba(255, 255, 255, ${whiteRimAlpha})`;
    ctx.lineWidth = 1.0 + (isDrop ? 0.5 : 0);
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    ctx.restore();

    // 2. Ambient Cat & Energy Reflection on Polished Wood Surface
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const reflW = width * 0.34 * (1.0 + bass * 0.25 + (isDrop ? 0.3 : 0));
    const reflH = deckHeight * 0.85;

    const woodReflGrad = ctx.createRadialGradient(
        cx, deckY + 6, 4,
        cx, deckY + reflH * 0.5, reflW
    );

    const reflAlpha = Math.min(1.0, (0.22 + bass * 0.18 + beat * 0.2 + snare * 0.15) * (0.8 + energy * 0.4) * dropMultiplier);
    woodReflGrad.addColorStop(0, palette.accentAlpha(reflAlpha * 0.95));
    woodReflGrad.addColorStop(0.3, palette.primaryAlpha(reflAlpha * 0.65));
    woodReflGrad.addColorStop(0.7, palette.secondaryAlpha(reflAlpha * 0.3));
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
