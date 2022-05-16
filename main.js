const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let playerShooting = false;
let bulletCollision = false;
let enemyListLength = 18;
let enemyRowLength = 6;
let enemyColumnLength = 3;
let enemyStartX = 60;
let enemySpaceX = 50;
let enemySpaceY = 70;
let n_enemy = 0;

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

function keyPressed(e) {
    if (e.keyCode == 68 || e.keyCode == 39 || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.keyCode == 65 || e.keyCode == 37 || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.keyCode == 32 || e.code == "Space") {
        spacePressed = true;
    }
}

function keyReleased(e) {
    if (e.keyCode == 68 || e.keyCode == 39 || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.keyCode == 65 || e.keyCode == 37 || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.keyCode == 32 || e.code == "Space") {
        spacePressed = false;
    }
}

const ship = new Player(100, 20, 20, 30, "red", 5, canvas.width / 2 - 50, canvas.height - 40);
const bullet = new Bullet(ship.baseWidth, ship.baseHeight, 20, 30, "green", 5, 10, canvas.width / 2 - 50, canvas.height - 40);

let enemyList = [];
for (let i = 0; i < enemyListLength; i++) {
    if (i == 6 || i == 12) {
        n_enemy++;
        enemySpaceX = 50;
    }
    let enemy = new Enemies(
        0,
        100,
        20,
        20,
        40,
        1,
        0.3,
        enemySpaceX,
        (enemySpaceY * n_enemy) + 50,
        "blue"
    );
    enemySpaceX += 120;
    enemyList.push(enemy);
}

function gameOver() {
    ctx.fillStyle = "yellow";
    ctx.font = "50px Arial"
    ctx.strokeText("Game Over", canvas.width/2, canvas.height/2);
    ctx.fill();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bullet.update();
    bullet.collisionDetect();
    ship.update();
    ship.draw();
    ship.collisionDetect();
    for (let i = 0; i < enemyListLength; i++) {
        enemyList[i].update();
        enemyList[i].draw();
        if (enemyList[0].x > 100) {
            enemyList[i].velX = -(enemyList[i].velX);
            enemyList[i].y += enemyList[i].baseHeight;
        }
        if (enemyList[0].x < 0) {
            enemyList[i].velX = -(enemyList[i].velX);
            enemyList[i].y += enemyList[i].baseHeight;
        }
        if ((bullet.enemyCollision(enemyList[i]) < bullet.baseWidth + enemyList[i].baseWidth - 140) && !(ship.enemyCollision(enemyList[i]) < ship.baseWidth + enemyList[i].baseWidth - 110)) {
            bulletCollision = true;
            console.log(bulletCollision);
            enemyList[i].y = -canvas.height;
        }
        if (ship.enemyCollision(enemyList[i]) < ship.baseWidth + enemyList[i].baseWidth - 110) {
            for (let i = 0; i < enemyListLength; i++) {
                enemyList[i].color = "black";
            }
            ship.color = "black";
            location.reload();
        }
        if (enemyList[i].y > canvas.height - (enemyList[i].baseHeight * 2)) {
            for (let i = 0; i < enemyListLength; i++) {
                enemyList[i].color = "black";
            }
            ship.color = "black";
            location.reload();
        }
    }
    requestAnimationFrame(loop);
}
loop();

/*
TO DO:
- enemy fire 
- score counter
- start and end screens (screen handler)
- level 2 and 3
- sound effects
*/
