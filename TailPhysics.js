/**
 * TailPhysics.js
 * Realistic feline tail kinematics and organic rendering.
 * Simulates a cat's tail resting naturally on the wooden deck,
 * with authentic feline thickness tapering, gentle BPM-synchronized swish,
 * realistic deck contact, and rhythmic tip twitches.
 */

class TailPhysics {
    constructor(segmentCount = 20) {
        this.segmentCount = segmentCount;
        this.nodes = [];
        this.leftPoints = [];
        this.rightPoints = [];
        
        for (let i = 0; i < this.segmentCount; i++) {
            this.nodes.push({
                x: 0,
                y: 0,
                thickness: 1.0
            });
            this.leftPoints.push({ x: 0, y: 0 });
            this.rightPoints.push({ x: 0, y: 0 });
        }

        this.swayPhase = 0;
        this.tipTwitch = 0;
        this.deckTapImpulse = 0;
        this.initialized = false;
        this.sparkTrail = [];
    }

    /**
     * Update realistic feline tail physics
     */
    update(anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying = true) {
        const bpm = audioState.bpm || 120;
        const energy = audioState.energy || 0;
        const bass = audioState.bass || 0;
        const highs = audioState.highs || 0;
        const beat = audioState.beatImpulse || 0;

        const rootX = anchorPoint[0];
        const rootY = anchorPoint[1];

        // 1. Natural Feline Sway Rhythm
        const tempoHz = isPlaying ? Math.max(0.5, Math.min(2.5, (bpm / 60) * 0.45)) : 0.12;
        const swaySpeed = isPlaying ? (tempoHz * (1.0 + energy * 0.4)) : 0.12;
        this.swayPhase += swaySpeed * dt;

        // 2. Beat Deck Tap & Tip Twitch
        if (isPlaying && beat > 0.4) {
            this.tipTwitch += (beat * 1.8) * (Math.sin(this.swayPhase) > 0 ? 1 : -1);
            this.deckTapImpulse = Math.min(1.0, this.deckTapImpulse + beat * 0.8);
        } else if (!isPlaying) {
            this.tipTwitch = 0;
            this.deckTapImpulse = 0;
        }
        this.tipTwitch *= Math.pow(0.86, dt * 60);
        this.deckTapImpulse *= Math.pow(0.88, dt * 60);
        if (isNaN(this.tipTwitch)) this.tipTwitch = 0;
        if (isNaN(this.deckTapImpulse)) this.deckTapImpulse = 0;

        // 3. Feline Tail Spine Kinematics
        const totalTailLength = 175 * baseScale;
        const segLen = totalTailLength / (this.segmentCount - 1);

        if (!this.initialized) {
            for (let i = 0; i < this.segmentCount; i++) {
                this.nodes[i].x = rootX - i * segLen * 0.8;
                this.nodes[i].y = rootY + i * segLen * 0.3;
                this.nodes[i].thickness = 11.0 * baseScale;
            }
            this.initialized = true;
        }

        // Set Root Node
        this.nodes[0].x = rootX;
        this.nodes[0].y = rootY;
        this.nodes[0].thickness = 11.0 * baseScale;

        const maxSwayAngle = isPlaying ? (0.35 + energy * 0.25 + bass * 0.2) : 0.05;

        for (let i = 1; i < this.segmentCount; i++) {
            const frac = i / (this.segmentCount - 1); // 0.0 at root, 1.0 at tip
            
            // Feline S-curve harmonic wave
            const wavePhase = this.swayPhase - frac * 2.2;
            const horizontalSway = Math.sin(wavePhase) * maxSwayAngle * (frac * 1.3);
            const secondaryHarmonic = isPlaying ? (Math.sin(wavePhase * 1.8) * 0.15 * frac) : 0;

            // Tip twitch & energetic whip
            const tipCurl = this.tipTwitch * Math.pow(frac, 2.5) * 1.4;

            // Target natural resting angle
            const baseDirAngle = Math.PI * 0.88; // extending towards left rear deck
            const currentAngle = baseDirAngle + horizontalSway + secondaryHarmonic + tipCurl;

            // Target position
            const prev = this.nodes[i - 1];
            let targetX = prev.x + Math.cos(currentAngle) * segLen;
            let targetY = prev.y + Math.sin(currentAngle) * segLen;

            // Deck constraint: tail rests gracefully on the wooden deck surface
            if (deckY && targetY > deckY + 12 * baseScale) {
                targetY = deckY + 12 * baseScale;
            }

            // Tip lifts gently off the deck when active
            if (isPlaying && frac > 0.75) {
                const tipLift = Math.sin(time * 3 + frac * 4) * (6 * baseScale * highs) - (this.deckTapImpulse * 8 * baseScale);
                targetY += tipLift;
            }

            // Smooth spring damping towards target
            const blend = 0.38 + (1 - frac) * 0.25;
            this.nodes[i].x += (targetX - this.nodes[i].x) * blend;
            this.nodes[i].y += (targetY - this.nodes[i].y) * blend;

            // Realistic Feline Thickness Profile
            const thicknessProfile = 1.0 - Math.pow(frac, 1.4) * 0.65;
            this.nodes[i].thickness = thicknessProfile * (11.0 * baseScale);
        }

        // 4. Precalculate Envelope Curves in pre-allocated buffers (Zero runtime GC)
        for (let i = 0; i < this.segmentCount; i++) {
            const curr = this.nodes[i];
            const next = i < this.segmentCount - 1 ? this.nodes[i + 1] : curr;
            const prev = i > 0 ? this.nodes[i - 1] : curr;

            const dx = next.x - prev.x;
            const dy = next.y - prev.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            const t = curr.thickness;
            this.leftPoints[i].x = curr.x + nx * t;
            this.leftPoints[i].y = curr.y + ny * t;
            this.rightPoints[i].x = curr.x - nx * t;
            this.rightPoints[i].y = curr.y - ny * t;
        }

        // 5. Tip Sparkle Trail (only when playing)
        const tip = this.nodes[this.segmentCount - 1];
        if (isPlaying && Math.random() < 0.35 + highs * 0.5 + beat * 0.3) {
            this.sparkTrail.push({
                x: tip.x + (Math.random() - 0.5) * 6,
                y: tip.y + (Math.random() - 0.5) * 6,
                vx: (Math.random() - 0.5) * 20 - 10,
                vy: (Math.random() - 0.5) * 20 - 10,
                life: 1.0,
                decay: 1.1 + Math.random() * 1.4,
                size: (1.5 + Math.random() * 2.5) * baseScale,
                color: Math.random() < 0.6 ? "accent" : "starlight"
            });
        }

        // Update sparks
        for (let i = this.sparkTrail.length - 1; i >= 0; i--) {
            const sp = this.sparkTrail[i];
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.life -= sp.decay * dt;
            if (sp.life <= 0 || !isPlaying) {
                this.sparkTrail.splice(i, 1);
            }
        }
    }

    /**
     * Build closed tail path on canvas (zero allocations)
     */
    buildTailPath(ctx, baseScale) {
        const lp = this.leftPoints;
        const rp = this.rightPoints;
        const n = this.segmentCount;

        ctx.beginPath();
        ctx.moveTo(lp[0].x, lp[0].y);

        // Left spine side (Smooth Catmull-Rom)
        for (let i = 0; i < n - 1; i++) {
            const p0 = i > 0 ? lp[i - 1] : lp[0];
            const p1 = lp[i];
            const p2 = lp[i + 1];
            const p3 = i < n - 2 ? lp[i + 2] : p2;

            const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
            const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
            const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
            const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        // Rounded tip cap
        const tip = this.nodes[n - 1];
        const tipRight = rp[n - 1];
        ctx.quadraticCurveTo(tip.x - 4 * baseScale, tip.y + 2 * baseScale, tipRight.x, tipRight.y);

        // Right spine side (back to root)
        for (let i = n - 1; i > 0; i--) {
            const p0 = i < n - 1 ? rp[i + 1] : rp[n - 1];
            const p1 = rp[i];
            const p2 = rp[i - 1];
            const p3 = i > 1 ? rp[i - 2] : p2;

            const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
            const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
            const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
            const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        ctx.closePath();
    }

    /**
     * Render the realistic feline tail with organic thickness envelope & fur glow
     */
    render(ctx, palette, audioState, baseScale, deckY) {
        if (this.nodes.length < 3) return;

        const bass = audioState.bass || 0;
        const highs = audioState.highs || 0;
        const beat = audioState.beatImpulse || 0;

        ctx.save();

        // 1. Tail Contact Shadow onto Wooden Deck
        if (deckY) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.nodes[0].x, deckY + 4);
            for (let i = 1; i < this.segmentCount; i++) {
                ctx.lineTo(this.nodes[i].x, deckY + 6);
            }
            ctx.lineWidth = 14 * baseScale;
            ctx.strokeStyle = "rgba(2, 1, 6, 0.45)";
            ctx.stroke();
            ctx.restore();
        }

        // 2. Tail Interior Cosmic Shimmer
        this.buildTailPath(ctx, baseScale);
        const rootNode = this.nodes[0];
        const tipNode = this.nodes[this.segmentCount - 1];
        const tailGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
        tailGrad.addColorStop(0, "rgba(16, 12, 32, 0.95)");
        tailGrad.addColorStop(0.5, "rgba(10, 8, 24, 0.98)");
        tailGrad.addColorStop(1.0, "rgba(6, 4, 16, 1.0)");
        ctx.fillStyle = tailGrad;
        ctx.fill();

        // Subtle inner energy core
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const innerEnergyGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
        innerEnergyGrad.addColorStop(0, palette.primaryAlpha(0.25 + bass * 0.2));
        innerEnergyGrad.addColorStop(0.6, palette.accentAlpha(0.20 + highs * 0.2));
        innerEnergyGrad.addColorStop(1.0, palette.accentAlpha(0.35 + beat * 0.3));
        ctx.fillStyle = innerEnergyGrad;
        ctx.fill();
        ctx.restore();

        // 3. Glowing Feline Fur Outer Contour (GPU Accelerated)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Outer soft glow
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = palette.primaryAlpha(0.75 + bass * 0.25);
        ctx.lineWidth = 3.5 * baseScale;
        ctx.stroke();

        // Vibrant neon rim
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = palette.accentAlpha(1.0);
        ctx.lineWidth = 1.8 * baseScale;
        ctx.stroke();

        // Starlight crisp highlight
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.92 + highs * 0.08})`;
        ctx.lineWidth = 0.9 * baseScale;
        ctx.stroke();

        // Tip glowing energy tuft
        const tipGlow = ctx.createRadialGradient(tipNode.x, tipNode.y, 0, tipNode.x, tipNode.y, 16 * baseScale);
        tipGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        tipGlow.addColorStop(0.35, palette.accentAlpha(0.85));
        tipGlow.addColorStop(0.75, palette.primaryAlpha(0.4));
        tipGlow.addColorStop(1.0, "transparent");

        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(tipNode.x, tipNode.y, 16 * baseScale, 0, Math.PI * 2);
        ctx.fill();

        // Spark trail
        for (let i = 0; i < this.sparkTrail.length; i++) {
            const sp = this.sparkTrail[i];
            ctx.fillStyle = sp.color === "starlight" ? `rgba(255, 255, 255, ${sp.life})` : palette.accentAlpha(sp.life);
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = TailPhysics;
}
