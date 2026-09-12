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
        const snareTrigger = (audio.snareImpulse || 0) > 0.5;
        if (snareTrigger || time > this.nextTwitchTime) {
            if (Math.random() > 0.5) {
                this.leftEarTwitch = 0.12 + Math.random() * 0.12;
            } else {
                this.rightEarTwitch = -0.12 - Math.random() * 0.12;
            }
            this.nextTwitchTime = time + 1.5 + Math.random() * 3.0;
        }
        this.leftEarTwitch += (0 - this.leftEarTwitch) * (dt * 7.0);
        this.rightEarTwitch += (0 - this.rightEarTwitch) * (dt * 7.0);

        const earBeatBounce = (audio.mid || 0) * 0.08 + (audio.snareImpulse || 0) * 0.06;
        this.currentLeftEarAngle = this.leftEarTwitch - earBeatBounce;
        this.currentRightEarAngle = this.rightEarTwitch + earBeatBounce;
    }

    render(ctx, centerX, centerY, scale, time, audio, palette, bgMode, width, height) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const isDrop = !!audio.isDrop;
        const dropMultiplier = isDrop ? 1.5 : 1.0;
        const beat = audio.beatImpulse || 0;
        const bass = audio.bass || 0;

        // Feline squash & stretch scaling
        const squashX = 1.0 + (beat * 0.08 + bass * 0.04) * dropMultiplier;
        const squashY = 1.0 - (beat * 0.06) * dropMultiplier;
        ctx.scale(scale * squashX, scale * squashY);

        // Natural breath & springy bass bounce
        const breath = Math.sin(time * 2.2) * 3.0 * (1 + (audio.energy || 0) * 0.6);
        const bassBounce = (bass * 10.0 + beat * 14.0) * dropMultiplier;
        ctx.translate(0, -bassBounce + breath);

        // Organic rhythm sway
        const swayAngle = Math.sin(time * ((audio.bpm || 120) / 60) * Math.PI) * (0.015 + (audio.mid || 0) * 0.025);
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
