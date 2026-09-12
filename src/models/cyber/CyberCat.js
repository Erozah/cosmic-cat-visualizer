// src/models/cyber/CyberCat.js - Cyberpunk & Celestial Cat vector model orchestrator

class CyberCat {
    constructor() {
        this.blinkProgress = 0;
        this.nextBlinkTime = 3.0;
        this.isBlinking = false;

        this.leftEarTwitch = 0;
        this.rightEarTwitch = 0;
        this.nextTwitchTime = 2.0;

        this.currentLeftEarAngle = 0;
        this.currentRightEarAngle = 0;

        this.tailSegments = 14;
        this.tailPoints = [];
        for (let i = 0; i < this.tailSegments; i++) {
            this.tailPoints.push({ x: 0, y: 0 });
        }

        this.constellationNodes = CYBER_CONSTELLATION_NODES;
        this.constellationLinks = CYBER_CONSTELLATION_LINKS;
    }

    update(dt, time, audio) {
        if (time > this.nextBlinkTime) {
            this.isBlinking = true;
            this.blinkProgress += dt * 12;
            if (this.blinkProgress >= Math.PI) {
                this.blinkProgress = 0;
                this.isBlinking = false;
                this.nextBlinkTime = time + 2.5 + Math.random() * 4.0;
            }
        }

        // Feline ear twitch reflexes on snare / claps or natural intervals
        const isPlaying = audio.isPlaying !== false;
        const energy = audio.energy || 0.35;
        const energyScale = 0.35 + energy * 0.65;

        // Snare / high transient reflex twitch (attenuated on quiet chill music)
        const snare = audio.snareImpulse || 0;
        if (snare > 0.45 && energy > 0.3) {
            this.leftEarTwitch = (Math.random() - 0.5) * 0.35 * snare * energyScale;
            this.rightEarTwitch = (Math.random() - 0.5) * 0.35 * snare * energyScale;
        } else {
            this.leftEarTwitch *= Math.pow(0.88, dt * 60);
            this.rightEarTwitch *= Math.pow(0.88, dt * 60);
        }

        const earBeatBounce = ((audio.mid || 0) * 0.04 + (audio.snareImpulse || 0) * 0.05) * energyScale;
        this.currentLeftEarAngle = this.leftEarTwitch - earBeatBounce;
        this.currentRightEarAngle = this.rightEarTwitch + earBeatBounce;
    }

    render(ctx, centerX, centerY, scale, time, audio, palette, bgMode, width, height) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const energy = audio.energy || 0.35;
        const energyScale = 0.35 + energy * 0.65;
        const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || 120) / 120));
        const isDrop = !!audio.isDrop;
        const dropMultiplier = isDrop ? 1.5 : 1.0;
        const beat = audio.beatImpulse || 0;
        const bass = audio.bass || 0;

        // Feline squash & stretch scaling (cushioned on chill music)
        const squashX = 1.0 + (beat * 0.06 + bass * 0.03) * dropMultiplier * energyScale;
        const squashY = 1.0 - (beat * 0.045) * dropMultiplier * energyScale;
        ctx.scale(scale * squashX, scale * squashY);

        // Natural breath & springy bass bounce (slow, deep breathing on chill music)
        const breathFreq = 0.65 + tempoNorm * 0.45 * (0.35 + energy * 0.65);
        const breath = Math.sin(time * breathFreq) * (1.6 + energy * 2.0);
        const bassBounce = (bass * 5.0 + beat * 7.5) * dropMultiplier * energyScale;
        ctx.translate(0, -bassBounce + breath);

        // Organic rhythm sway (gentle, hypnotic posture sway)
        const swayFreq = 0.35 + tempoNorm * 0.45 * (0.4 + energy * 0.6);
        const swayAngle = Math.sin(time * swayFreq) * ((0.008 + (audio.mid || 0) * 0.016) * energyScale);
        ctx.rotate(swayAngle);

        renderCyberTail(ctx, this.tailPoints, this.tailSegments, time, audio, palette);
        renderCyberBodyAura(ctx, audio, palette);
        renderCyberConstellation(ctx, this.constellationNodes, this.constellationLinks, time, audio, palette);
        renderCyberBodyContours(ctx, audio, palette);
        renderCyberHead(ctx, this.currentLeftEarAngle, this.currentRightEarAngle, time, audio, palette);
        renderCyberEyes(ctx, this.isBlinking, this.blinkProgress, audio, palette);

        ctx.restore();
    }
}
