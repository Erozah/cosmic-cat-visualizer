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

        if (time > this.nextTwitchTime) {
            if (Math.random() > 0.5) {
                this.leftEarTwitch = 0.08 + Math.random() * 0.08;
            } else {
                this.rightEarTwitch = -0.08 - Math.random() * 0.08;
            }
            this.nextTwitchTime = time + 1.8 + Math.random() * 3.5;
        }
        this.leftEarTwitch += (0 - this.leftEarTwitch) * (dt * 6.0);
        this.rightEarTwitch += (0 - this.rightEarTwitch) * (dt * 6.0);

        const earBeatBounce = audio.mid * 0.05;
        this.currentLeftEarAngle = this.leftEarTwitch - earBeatBounce;
        this.currentRightEarAngle = this.rightEarTwitch + earBeatBounce;
    }

    render(ctx, centerX, centerY, scale, time, audio, palette, bgMode, width, height) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);

        const breath = Math.sin(time * 2.0) * 2.0 * (1 + audio.energy * 0.5);
        const bassBounce = audio.bass * 4.0;
        ctx.translate(0, -bassBounce + breath);

        renderCyberTail(ctx, this.tailPoints, this.tailSegments, time, audio, palette);
        renderCyberBodyAura(ctx, audio, palette);
        renderCyberConstellation(ctx, this.constellationNodes, this.constellationLinks, time, audio, palette);
        renderCyberBodyContours(ctx, audio, palette);
        renderCyberHead(ctx, this.currentLeftEarAngle, this.currentRightEarAngle, time, audio, palette);
        renderCyberEyes(ctx, this.isBlinking, this.blinkProgress, audio, palette);

        ctx.restore();
    }
}
