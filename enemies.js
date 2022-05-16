class Enemies {
    constructor(lineWidth, baseWidth, baseHeight, gunWidth,
        gunHeight, velX, velY, x, y, color) {
        this.lineWidth = lineWidth;
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.gunWidth = gunWidth;
        this.gunHeight = gunHeight;
        this.velX = velX;
        this.velY = velY;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    update() {
        this.x += this.velX;
    }
    
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.baseWidth, this.baseHeight);
        ctx.fillRect(this.x, this.y, this.gunWidth, this.gunHeight);
        ctx.fillRect(this.x + (this.baseWidth - this.gunWidth), this.y, this.gunWidth, this.gunHeight);
    }
}
