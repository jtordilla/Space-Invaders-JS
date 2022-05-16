class Bullet extends Player {
    constructor(baseWidth, baseHeight, gunWidth, gunHeight, color, velX, velY, x, y) {
        super(baseWidth, baseHeight, gunWidth, gunHeight, color, velX, x, y);
        this.velY = velY;
    }

    shoot() {
        if (this.y >= -this.gunHeight) {
            this.velX = 0;
            this.y -= this.velY;
        }
        if (bulletCollision || this.y <= -this.gunHeight) {
            playerShooting = false;
            bulletCollision = false;
            this.velX = ship.velX;
            this.x = ship.x;
            this.y = canvas.height - 40;
        }
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
        } else if (this.x < 0) {
            this.x += 5;
        } else if (!playerShooting) {
            this.velX = ship.velX;
        }
    }

    update() {
        if (rightPressed) {
            this.x += this.velX;
        }
        if (leftPressed) {
            this.x -= this.velX;
        }
        if (spacePressed) {
            playerShooting = true;
        }
        if (playerShooting) {
            this.draw();
            this.shoot();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + (this.baseWidth / 2) - (this.gunWidth / 2), this.y -
            (this.baseHeight * 1.5), this.gunWidth, this.gunHeight);
    }
}
