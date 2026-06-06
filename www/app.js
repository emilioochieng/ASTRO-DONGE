const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uiScreen = document.getElementById('ui-screen');
const uiTitle = document.getElementById('ui-title');
const uiScoreMsg = document.getElementById('ui-score-msg');
const actionBtn = document.getElementById('action-btn');

// Game core configuration variables
let gameState = 'MENU'; // Possible states: 'MENU', 'PLAYING', 'GAMEOVER'
let score = 0;
let player;
let obstacles = [];
let spawnTimer = 0;
let animationFrameId;

// Establish responsive dimensions on boot and dynamically recalculate on resize
function resizeCanvas() {
    const container = document.getElementById('game-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Player Spacecraft Class Structure
class Spaceship {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 80; // Positions ship safely above bottom screen edge
        this.speed = 7;
        this.movingLeft = false;
        this.movingRight = false;
    }

    draw() {
        ctx.fillStyle = '#00d4ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00d4ff';

        // Draw a clean triangular sci-fi fighter ship pointing up
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // Reset shadows to ensure high performance on lower-tier mobile hardware
        ctx.shadowBlur = 0;
    }

    update() {
        if (this.movingLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.movingRight && this.x + this.width < canvas.width) {
            this.x += this.speed;
        }
    }
}

// Asteroid Obstacle Class Structure
class Asteroid {
    constructor() {
        this.radius = Math.random() * 15 + 10; // Variable randomized sizes
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = Math.random() * 3 + 3 + (score * 0.1); // Gradually gets faster as score climbs
    }

    draw() {
        ctx.fillStyle = '#ff3366';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff3366';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
    }

    update() {
        this.y += this.speed;
    }
}

// Mobile-friendly input mapping (Touch zones and Keyboard fallback)
function setupInputListeners() {
    // 1. Desktop Keyboard Controls
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a') player.movingLeft = true;
        if (e.key === 'ArrowRight' || e.key === 'd') player.movingRight = true;
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a') player.movingLeft = false;
        if (e.key === 'ArrowRight' || e.key === 'd') player.movingRight = false;
    });

    // 2. Mobile Responsive Touchscreen Controls
    window.addEventListener('touchstart', (e) => {
        if (gameState !== 'PLAYING') return;
        const touchX = e.touches[0].clientX;
        const screenMiddle = window.innerWidth / 2;

        if (touchX < screenMiddle) {
            player.movingLeft = true;
        } else {
            player.movingRight = true;
        }
    });

    window.addEventListener('touchend', () => {
        // Stop moving whenever a touch is lifted from the device screen
        player.movingLeft = false;
        player.movingRight = false;
    });
}

// Structural collision check utility (Rectangle vs Circle overlapping algorithms)
function checkCollision(rect, circle) {
    let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

    return distanceSquared < (circle.radius * circle.radius);
}

// Core Execution loop driving the interactive screen frames
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw active live tracker score text layout on top left margin
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`SCORE: ${score}`, 20, 35);

    player.update();
    player.draw();

    // Handle incoming procedural asteroid wave timings
    spawnTimer++;
    if (spawnTimer % 40 === 0) {
        obstacles.push(new Asteroid());
    }

    // Process all active obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].draw();

        // Check if an asteroid collided with the player
        if (checkCollision(player, obstacles[i])) {
            endGame();
            return;
        }

        // Clean up out-of-bounds obstacles to save smartphone memory
        if (obstacles[i].y - obstacles[i].radius > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    if (gameState === 'PLAYING') {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// State transition orchestration functions
function startGame() {
    gameState = 'PLAYING';
    score = 0;
    obstacles = [];
    spawnTimer = 0;
    player = new Spaceship();
    
    uiScreen.classList.remove('visible');
    gameLoop();
}

function endGame() {
    gameState = 'GAMEOVER';
    cancelAnimationFrame(animationFrameId);
    
    uiTitle.innerText = 'GAME OVER';
    uiScoreMsg.innerText = `You managed to survive and scored ${score} points!`;
    actionBtn.innerText = 'TRY AGAIN';
    uiScreen.classList.add('visible');
}

// Bind physical action execution to the centralized menu interaction button
actionBtn.addEventListener('click', startGame);
setupInputListeners();
