/**
 * Confetti & Heart Particles Explosion for Celebrations
 */
class ConfettiManager {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'confettiCanvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '99999';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 100) {
        const colors = [
            '#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a', '#800f2f',
            '#ffd166', '#ffb703', '#fb8500', '#ffffff', '#e0aaff', '#ff007f'
        ];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 12 + 4;
            const type = Math.random() > 0.4 ? 'heart' : (Math.random() > 0.5 ? 'circle' : 'ribbon');

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - Math.random() * 5,
                gravity: 0.22,
                drag: 0.96,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 12 + 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                decay: Math.random() * 0.015 + 0.008,
                type: type
            });
        }

        if (!this.isActive) {
            this.isActive = true;
            this.loop();
        }
    }

    stream(durationMs = 3000) {
        const interval = setInterval(() => {
            this.burst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.6, 25);
        }, 300);

        setTimeout(() => clearInterval(interval), durationMs);
    }

    drawHeart(ctx, x, y, size, color, opacity, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        // Left curve
        ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
        // Right curve
        ctx.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.vx *= p.drag;
            p.vy *= p.drag;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            if (p.type === 'heart') {
                this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
            } else if (p.type === 'circle') {
                this.ctx.save();
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else {
                // Ribbon / strip
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                this.ctx.restore();
            }
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        } else {
            this.isActive = false;
        }
    }
}

// Global celebration helper
let confettiInstance = null;
window.triggerCelebrationBurst = (x, y, count = 120) => {
    if (!confettiInstance) confettiInstance = new ConfettiManager();
    confettiInstance.burst(x, y, count);
};

window.triggerConfettiStream = (duration = 3500) => {
    if (!confettiInstance) confettiInstance = new ConfettiManager();
    confettiInstance.stream(duration);
};
