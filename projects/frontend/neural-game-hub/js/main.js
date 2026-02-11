// Neural Game Hub - 3 Mini Games Implementation

// Global state
let currentGame = null;
let scores = {
    snake: parseInt(localStorage.getItem('snake-score')) || 0,
    tetris: parseInt(localStorage.getItem('tetris-score')) || 0,
    memory: parseInt(localStorage.getItem('memory-score')) || 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeGameCards();
    updateLeaderboard();
    initializeAchievements();
});

// Initialize game cards
function initializeGameCards() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.game;
            startGame(gameId);
        });
    });
}

// Start a game
function startGame(gameId) {
    currentGame = gameId;
    document.getElementById('game-grid').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    
    const container = document.getElementById(`${gameId}-game`);
    if (container) {
        container.classList.add('active');
        initGame(gameId);
    }
}

// Initialize specific game
function initGame(gameId) {
    if (gameId === 'snake') initSnake();
    else if (gameId === 'tetris') initTetris();
    else if (gameId === 'memory') initMemory();
}

// Back to hub
function backToHub() {
    document.querySelectorAll('.game-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById('game-grid').style.display = 'grid';
    document.getElementById('leaderboard').style.display = 'block';
    currentGame = null;
}

// Update score
function updateScore(game, score) {
    if (score > scores[game]) {
        scores[game] = score;
        localStorage.setItem(`${game}-score`, score);
        updateLeaderboard();
        playSound('achievement');
    }
}

// ===== SNAKE GAME =====
let snake = {
    running: false,
    direction: 'right',
    body: [{x: 10, y: 10}],
    food: {x: 15, y: 15},
    score: 0,
    speed: 150,
    interval: null
};

function initSnake() {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    
    // Reset game
    snake = {
        running: false,
        direction: 'right',
        body: [{x: 10, y: 10}],
        food: {x: 15, y: 15},
        score: 0,
        speed: 150,
        interval: null
    };
    
    document.getElementById('snake-score').textContent = '0';
    
    // Keyboard controls
    document.addEventListener('keydown', handleSnakeInput);
    
    // Start button
    document.getElementById('snake-start').onclick = () => {
        if (!snake.running) {
            snake.running = true;
            snake.interval = setInterval(() => updateSnake(canvas, ctx, cellSize), snake.speed);
        }
    };
    
    // Reset button
    document.getElementById('snake-reset').onclick = () => {
        clearInterval(snake.interval);
        initSnake();
    };
    
    // Back button
    document.getElementById('snake-back').onclick = () => {
        clearInterval(snake.interval);
        document.removeEventListener('keydown', handleSnakeInput);
        backToHub();
    };
    
    // Draw initial state
    drawSnake(canvas, ctx, cellSize);
}

function handleSnakeInput(e) {
    if (!snake.running) return;
    
    const key = e.key.toLowerCase();
    if ((key === 'arrowup' || key === 'w') && snake.direction !== 'down') snake.direction = 'up';
    else if ((key === 'arrowdown' || key === 's') && snake.direction !== 'up') snake.direction = 'down';
    else if ((key === 'arrowleft' || key === 'a') && snake.direction !== 'right') snake.direction = 'left';
    else if ((key === 'arrowright' || key === 'd') && snake.direction !== 'left') snake.direction = 'right';
}

function updateSnake(canvas, ctx, cellSize) {
    const head = {...snake.body[0]};
    
    // Move head
    if (snake.direction === 'up') head.y--;
    else if (snake.direction === 'down') head.y++;
    else if (snake.direction === 'left') head.x--;
    else if (snake.direction === 'right') head.x++;
    
    // Check collision with walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        gameOver('Snake');
        return;
    }
    
    // Check collision with self
    if (snake.body.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver('Snake');
        return;
    }
    
    snake.body.unshift(head);
    
    // Check food collision
    if (head.x === snake.food.x && head.y === snake.food.y) {
        snake.score += 10;
        document.getElementById('snake-score').textContent = snake.score;
        updateScore('snake', snake.score);
        spawnFood();
        playSound('collect');
        
        // Increase speed slightly
        if (snake.score % 50 === 0 && snake.speed > 50) {
            clearInterval(snake.interval);
            snake.speed -= 10;
            snake.interval = setInterval(() => updateSnake(canvas, ctx, cellSize), snake.speed);
        }
    } else {
        snake.body.pop();
    }
    
    drawSnake(canvas, ctx, cellSize);
}

function drawSnake(canvas, ctx, cellSize) {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
    
    // Draw snake
    snake.body.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(
            segment.x * cellSize, segment.y * cellSize,
            (segment.x + 1) * cellSize, (segment.y + 1) * cellSize
        );
        gradient.addColorStop(0, index === 0 ? '#00ffff' : '#00aaaa');
        gradient.addColorStop(1, index === 0 ? '#00aaaa' : '#006666');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
        
        if (index === 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(segment.x * cellSize + 6, segment.y * cellSize + 6, 3, 3);
            ctx.fillRect(segment.x * cellSize + 11, segment.y * cellSize + 6, 3, 3);
        }
    });
    
    // Draw food
    ctx.fillStyle = '#00ff41';
    ctx.beginPath();
    ctx.arc((snake.food.x + 0.5) * cellSize, (snake.food.y + 0.5) * cellSize, cellSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
}

function spawnFood() {
    do {
        snake.food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    } while (snake.body.some(segment => segment.x === snake.food.x && segment.y === snake.food.y));
}

function gameOver(game) {
    if (snake.running) {
        snake.running = false;
        clearInterval(snake.interval);
        playSound('gameover');
        setTimeout(() => {
            alert(`Game Over! Score: ${snake.score}`);
        }, 100);
    }
}

// ===== TETRIS (Simplified) =====
let tetris = {
    running: false,
    score: 0,
    grid: Array(20).fill().map(() => Array(10).fill(0)),
    current: null,
    interval: null
};

const TETRIS_PIECES = [
    [[1,1,1,1]], // I
    [[1,1],[1,1]], // O
    [[1,1,1],[0,1,0]], // T
    [[1,1,0],[0,1,1]], // S
    [[0,1,1],[1,1,0]], // Z
    [[1,1,1],[1,0,0]], // L
    [[1,1,1],[0,0,1]] // J
];

const TETRIS_COLORS = ['#00ffff', '#ff00ff', '#00ff41', '#ffa502', '#ff4757', '#00aaff', '#ff6600'];

function initTetris() {
    const canvas = document.getElementById('tetris-canvas');
    const ctx = canvas.getContext('2d');
    
    tetris = {
        running: false,
        score: 0,
        grid: Array(20).fill().map(() => Array(10).fill(0)),
        current: null,
        interval: null
    };
    
    document.getElementById('tetris-score').textContent = '0';
    
    document.getElementById('tetris-start').onclick = () => {
        if (!tetris.running) {
            tetris.running = true;
            spawnTetrisPiece();
            tetris.interval = setInterval(() => updateTetris(canvas, ctx), 500);
        }
    };
    
    document.getElementById('tetris-reset').onclick = () => {
        clearInterval(tetris.interval);
        initTetris();
    };
    
    document.getElementById('tetris-back').onclick = () => {
        clearInterval(tetris.interval);
        backToHub();
    };
    
    drawTetris(canvas, ctx);
}

function spawnTetrisPiece() {
    const pieceIndex = Math.floor(Math.random() * TETRIS_PIECES.length);
    tetris.current = {
        shape: TETRIS_PIECES[pieceIndex],
        color: TETRIS_COLORS[pieceIndex],
        x: 4,
        y: 0
    };
}

function updateTetris(canvas, ctx) {
    if (!tetris.running) return;
    
    if (tetris.current) {
        tetris.current.y++;
        
        if (checkTetrisCollision()) {
            tetris.current.y--;
            lockTetrisPiece();
            clearTetrisLines();
            spawnTetrisPiece();
            
            if (checkTetrisCollision()) {
                tetris.running = false;
                clearInterval(tetris.interval);
                alert(`Game Over! Score: ${tetris.score}`);
            }
        }
    }
    
    drawTetris(canvas, ctx);
}

function checkTetrisCollision() {
    if (!tetris.current) return false;
    
    for (let y = 0; y < tetris.current.shape.length; y++) {
        for (let x = 0; x < tetris.current.shape[y].length; x++) {
            if (tetris.current.shape[y][x]) {
                const newX = tetris.current.x + x;
                const newY = tetris.current.y + y;
                
                if (newY >= 20 || newX < 0 || newX >= 10 || (tetris.grid[newY] && tetris.grid[newY][newX])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function lockTetrisPiece() {
    for (let y = 0; y < tetris.current.shape.length; y++) {
        for (let x = 0; x < tetris.current.shape[y].length; x++) {
            if (tetris.current.shape[y][x]) {
                const gridY = tetris.current.y + y;
                const gridX = tetris.current.x + x;
                if (gridY >= 0 && gridY < 20) {
                    tetris.grid[gridY][gridX] = tetris.current.color;
                }
            }
        }
    }
}

function clearTetrisLines() {
    let linesCleared = 0;
    
    for (let y = 19; y >= 0; y--) {
        if (tetris.grid[y].every(cell => cell !== 0)) {
            tetris.grid.splice(y, 1);
            tetris.grid.unshift(Array(10).fill(0));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        tetris.score += linesCleared * 100;
        document.getElementById('tetris-score').textContent = tetris.score;
        updateScore('tetris', tetris.score);
        playSound('collect');
    }
}

function drawTetris(canvas, ctx) {
    const cellSize = 20;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
    
    // Draw locked pieces
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (tetris.grid[y][x]) {
                ctx.fillStyle = tetris.grid[y][x];
                ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
            }
        }
    }
    
    // Draw current piece
    if (tetris.current) {
        ctx.fillStyle = tetris.current.color;
        for (let y = 0; y < tetris.current.shape.length; y++) {
            for (let x = 0; x < tetris.current.shape[y].length; x++) {
                if (tetris.current.shape[y][x]) {
                    ctx.fillRect(
                        (tetris.current.x + x) * cellSize + 1,
                        (tetris.current.y + y) * cellSize + 1,
                        cellSize - 2,
                        cellSize - 2
                    );
                }
            }
        }
    }
}

// ===== MEMORY GAME =====
let memory = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    score: 0
};

const MEMORY_ICONS = ['🎮', '🎯', '⚡', '🔥', '💎', '🌟', '🚀', '👾'];

function initMemory() {
    memory = {
        cards: [],
        flipped: [],
        matched: [],
        moves: 0,
        score: 0
    };
    
    document.getElementById('memory-score').textContent = '0';
    
    // Create card pairs
    const icons = [...MEMORY_ICONS, ...MEMORY_ICONS];
    memory.cards = icons.sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    
    memory.cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-front">${icon}</div>
            <div class="card-back">?</div>
        `;
        card.onclick = () => flipCard(index);
        grid.appendChild(card);
    });
    
    document.getElementById('memory-reset').onclick = () => initMemory();
    document.getElementById('memory-back').onclick = () => backToHub();
}

function flipCard(index) {
    if (memory.flipped.length >= 2 || memory.flipped.includes(index) || memory.matched.includes(index)) {
        return;
    }
    
    const card = document.querySelectorAll('.memory-card')[index];
    card.classList.add('flipped');
    memory.flipped.push(index);
    playSound('flip');
    
    if (memory.flipped.length === 2) {
        memory.moves++;
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = memory.flipped;
    
    setTimeout(() => {
        if (memory.cards[first] === memory.cards[second]) {
            memory.matched.push(first, second);
            memory.score += 10;
            document.getElementById('memory-score').textContent = memory.score;
            updateScore('memory', memory.score);
            playSound('collect');
            
            if (memory.matched.length === memory.cards.length) {
                setTimeout(() => {
                    alert(`You Won! Score: ${memory.score} Moves: ${memory.moves}`);
                }, 500);
            }
        } else {
            document.querySelectorAll('.memory-card')[first].classList.remove('flipped');
            document.querySelectorAll('.memory-card')[second].classList.remove('flipped');
        }
        
        memory.flipped = [];
    }, 800);
}

// Sound effects (simulated with visual feedback)
function playSound(type) {
    console.log(`🔊 ${type} sound played`);
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboards = [
        { game: 'snake', element: 'snake-leaderboard' },
        { game: 'tetris', element: 'tetris-leaderboard' },
        { game: 'memory', element: 'memory-leaderboard' }
    ];
    
    leaderboards.forEach(({game, element}) => {
        const list = document.getElementById(element);
        if (!list) return;
        
        const mockScores = [
            { name: 'You', score: scores[game] },
            { name: 'CyberPro', score: Math.max(scores[game] - 50, 850) },
            { name: 'NeonGamer', score: Math.max(scores[game] - 100, 720) },
            { name: 'PixelMaster', score: Math.max(scores[game] - 150, 650) },
            { name: 'CodeNinja', score: Math.max(scores[game] - 200, 580) }
        ].sort((a, b) => b.score - a.score);
        
        list.innerHTML = mockScores.map((player, index) => {
            const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
            return `
                <li class="leaderboard-item">
                    <div class="leaderboard-rank ${rankClass}">#${index + 1}</div>
                    <div class="leaderboard-player">
                        <div class="leaderboard-name">${player.name}</div>
                    </div>
                    <div class="leaderboard-score">${player.score}</div>
                </li>
            `;
        }).join('');
    });
}

// Initialize achievements
function initializeAchievements() {
    const achievements = [
        { id: 'first-score', icon: '🎯', unlocked: scores.snake > 0 || scores.tetris > 0 || scores.memory > 0 },
        { id: 'high-scorer', icon: '🏆', unlocked: Object.values(scores).some(s => s >= 500) },
        { id: 'master', icon: '👑', unlocked: Object.values(scores).every(s => s >= 100) },
        { id: 'dedicated', icon: '⭐', unlocked: true }
    ];
    
    const container = document.getElementById('achievements');
    if (container) {
        container.innerHTML = achievements.map(a => `
            <div class="achievement-badge ${a.unlocked ? '' : 'locked'}" title="${a.id}">
                ${a.icon}
            </div>
        `).join('');
    }
}

// Add memory card styles
const memoryStyle = document.createElement('style');
memoryStyle.textContent = `
    #memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        gap: 10px;
        justify-content: center;
        margin: 2rem auto;
    }
    
    .memory-card {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
        border: 2px solid var(--primary);
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        position: relative;
        transition: all 0.3s;
    }
    
    .memory-card:hover {
        transform: scale(1.05);
    }
    
    .card-front {
        display: none;
    }
    
    .card-back {
        font-family: 'Orbitron', monospace;
        color: var(--primary);
        font-size: 2rem;
    }
    
    .memory-card.flipped .card-front {
        display: block;
    }
    
    .memory-card.flipped .card-back {
        display: none;
    }
`;
document.head.appendChild(memoryStyle);
