/**
 * Romantic Falling Rose Petals & Floating Sparkles Canvas Animation
 */
class PetalCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.petals = [];
        this.sparkles = [];
        this.petalCount = window.innerWidth < 768 ? 25 : 45;
        this.sparkleCount = window.innerWidth < 768 ? 20 : 35;
        this.mouse = { x: -1000, y: -1000 };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            if (Math.random() < 0.25) {
                this.addTrailSparkle(e.clientX, e.clientY);
            }
        });

        // Initialize Petals
        for (let i = 0; i < this.petalCount; i++) {
            this.petals.push(this.createPetal(true));
        }

        // Initialize Ambient Sparkles / Bokeh
        for (let i = 0; i < this.sparkleCount; i++) {
            this.sparkles.push(this.createSparkle(true));
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createPetal(randomY = false) {
        const colors = [
            'rgba(255, 183, 197, ', // Light blush
            'rgba(244, 143, 177, ', // Rose pink
            'rgba(233, 30, 99, ',   // Deep rose
            'rgba(216, 27, 96, ',   // Crimson tint
            'rgba(255, 214, 224, '  // Pale petal
        ];
        return {
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : -30,
            size: Math.random() * 12 + 10,
            speedY: Math.random() * 1.5 + 0.8,
            speedX: Math.random() * 1.5 - 0.75,
            oscillationSpeed: Math.random() * 0.03 + 0.01,
            oscillationDistance: Math.random() * 40 + 20,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: (Math.random() - 0.5) * 0.04,
            flip: Math.random() * Math.PI,
            flipSpeed: Math.random() * 0.03 + 0.01,
            baseColor: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.4 + 0.4
        };
    }

    createSparkle(randomY = false) {
        return {
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedY: (Math.random() - 0.5) * 0.4,
            speedX: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.6 + 0.2,
            alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            color: Math.random() > 0.4 ? 'rgba(255, 223, 186,' : 'rgba(255, 192, 203,'
        };
    }

    addTrailSparkle(x, y) {
        this.sparkles.push({
            x: x + (Math.random() - 0.5) * 15,
            y: y + (Math.random() - 0.5) * 15,
            size: Math.random() * 4 + 2,
            speedY: -Math.random() * 1 - 0.5,
            speedX: (Math.random() - 0.5) * 1,
            alpha: 0.9,
            alphaSpeed: -0.03,
            color: 'rgba(255, 230, 200,'
        });
    }

    drawPetal(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.angle);
        this.ctx.scale(Math.cos(p.flip), 1);

        // Elegant curved petal shape
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
        this.ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
        
        // Petal Gradient
        const grad = this.ctx.createRadialGradient(0, p.size / 2, 1, 0, p.size / 2, p.size);
        grad.addColorStop(0, p.baseColor + (p.opacity + 0.1) + ')');
        grad.addColorStop(1, p.baseColor + (p.opacity * 0.6) + ')');
        
        this.ctx.fillStyle = grad;
        this.ctx.shadowColor = 'rgba(255, 105, 135, 0.2)';
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        this.ctx.restore();
    }

    drawSparkle(s) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        this.ctx.fillStyle = s.color + Math.max(0, s.alpha) + ')';
        this.ctx.shadowColor = 'rgba(255, 235, 179, 0.8)';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw and update sparkles
        for (let i = this.sparkles.length - 1; i >= 0; i--) {
            const s = this.sparkles[i];
            s.x += s.speedX;
            s.y += s.speedY;
            s.alpha += s.alphaSpeed;

            if (s.alpha <= 0.05 || s.alpha >= 0.85) {
                s.alphaSpeed = -s.alphaSpeed;
            }

            this.drawSparkle(s);

            // Clean up temporary cursor trail sparkles
            if (s.alpha <= 0) {
                this.sparkles.splice(i, 1);
            }
        }

        // Draw and update petals
        for (let i = 0; i < this.petals.length; i++) {
            const p = this.petals[i];
            p.y += p.speedY;
            p.x += Math.sin(p.y * p.oscillationSpeed) * 0.8 + p.speedX;
            p.angle += p.angularSpeed;
            p.flip += p.flipSpeed;

            this.drawPetal(p);

            // Reset when bottom or edges reached
            if (p.y > this.canvas.height + 40 || p.x < -40 || p.x > this.canvas.width + 40) {
                this.petals[i] = this.createPetal(false);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PetalCanvas('petalsCanvas');
});
