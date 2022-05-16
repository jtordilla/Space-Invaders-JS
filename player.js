class Player {
    constructor(baseWidth, baseHeight, gunWidth, gunHeight, color, velX, x, y) {
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.gunWidth = gunWidth;
        this.gunHeight = gunHeight;
        this.color = color;
        this.velX = velX;
        this.x = x;
        this.y = y;
    }

    enemyCollision(collider) {
        const dx = this.x - collider.x;
        const dy = this.y - collider.y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (this.x >= canvas.width - this.size) {
            this.x = this.x - 5;
        }
        if (this.x <= 0) {
            this.x = this.x + 5;
        }
        return r;
    }

    collisionDetect() {
        if (this.x > canvas.width - this.baseWidth) {
            this.x -= 5;
        }
        if (this.x < 0) {
            this.x += 5;
        }
    }

    update() {
        if (rightPressed) {
            this.x += this.velX;
        }
        if (leftPressed) {
            this.x -= this.velX;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.baseWidth, this.baseHeight);
        ctx.fillRect(this.x + (this.baseWidth / 2) - (this.gunWidth / 2), this.y -
            (this.baseHeight * 1.5), this.gunWidth, this.gunHeight);
    }
}
