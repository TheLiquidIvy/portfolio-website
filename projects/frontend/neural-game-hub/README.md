# 🎮 Neural Game Hub

A stunning cyberpunk game arcade featuring 3 addictive mini-games: Snake, Tetris, and Memory Match. Complete with leaderboards, achievements, and neon-drenched visuals.

![Neural Game Hub](https://img.shields.io/badge/Games-3-00ffff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Canvas-API-ff00ff?style=for-the-badge)
![Score Tracking](https://img.shields.io/badge/LocalStorage-Enabled-00ff41?style=for-the-badge)

## 🎯 Featured Games

### 🐍 Neural Snake
Classic snake gameplay with a cyberpunk twist. Control a neon snake that grows as it eats food. Speed increases as you score higher!

**Features:**
- Smooth WASD/Arrow key controls
- Progressive difficulty (speeds up every 50 points)
- Collision detection with walls and self
- Gradient snake rendering with eyes
- Score tracking and high score saving

### 🎮 Cyber Tetris
Stack falling blocks to clear lines and rack up points. Simple mechanics, endless challenge!

**Features:**
- 7 different piece types with unique colors
- Line-clearing mechanics
- Real-time grid rendering
- Score multiplier for multiple lines
- Game over detection

### 🧩 Memory Matrix  
Test your memory by matching pairs of emoji cards. Fewer moves means higher scores!

**Features:**
- 8 pairs of cards (16 total)
- Flip animation
- Move counter
- Match detection
- Win condition

## ✨ Hub Features

### 🏆 Leaderboards
- **Per-Game Rankings** - Separate leaderboards for each game
- **High Score Tracking** - Automatic high score saving via localStorage
- **Mock Competition** - Compete against AI players
- **Top 5 Display** - See the best performers
- **Medal System** - Gold/Silver/Bronze for top 3

### 🎖️ Achievements
- **First Score** - Play any game
- **High Scorer** - Reach 500+ points
- **Master** - Score 100+ in all games
- **Dedicated** - Play regularly

### 🎨 Visual Design
- **Cyberpunk Theme** - Neon blues, magentas, and greens
- **Animated Cards** - Hover effects and transitions
- **Gradient Backgrounds** - Dynamic color mixing
- **Glow Effects** - Text and element shadows
- **Smooth Animations** - CSS transitions throughout

## 🛠️ Technologies

- **HTML5 Canvas** - For Snake and Tetris rendering
- **JavaScript ES6+** - Game logic and state management
- **localStorage** - Persistent high score saving
- **CSS3 Animations** - Smooth transitions and effects
- **Responsive Design** - Works on all devices

## 📁 Project Structure

```
neural-game-hub/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # Cyberpunk styling
├── js/
│   └── main.js         # All 3 games + hub logic
└── README.md           # This file
```

## 🚀 Setup & Play

### Installation
1. Open `index.html` in any modern browser
2. Click on any game card to start playing
3. Your high scores are automatically saved!

### Game Controls

#### Neural Snake 🐍
- **Arrow Keys** or **WASD** - Move snake
- **Start Button** - Begin game
- **Reset Button** - Restart from scratch

#### Cyber Tetris 🎮
- **Start Button** - Begin dropping pieces
- **Reset Button** - Clear board and restart
- Pieces automatically fall and lock

#### Memory Matrix 🧩
- **Mouse Click** - Flip cards
- **Reset Button** - Shuffle and restart
- Match all pairs to win!

## 🎮 How to Play

### Snake Strategy
1. Eat green food to grow longer
2. Avoid hitting walls
3. Don't run into yourself
4. Game speeds up as you score more
5. Plan your path ahead!

### Tetris Tips
1. Stack pieces to form complete lines
2. Lines clear automatically when filled
3. Keep your stack low
4. Game ends when pieces reach the top
5. Multiple lines = bonus points!

### Memory Tricks
1. Click a card to reveal its icon
2. Click another to find its match
3. If they match, they stay flipped
4. If not, they flip back
5. Remember locations to minimize moves!

## 💾 Data Persistence

High scores are saved using `localStorage`:
```javascript
localStorage.setItem('snake-score', score);
localStorage.getItem('snake-score');
```

Clear your data:
```javascript
localStorage.clear();
```

## 🎨 Customization

### Add New Games
Add a new game card in the HTML:
```html
<div class="game-card" data-game="yourgame">
    <!-- Game card content -->
</div>
```

Then implement in `main.js`:
```javascript
function initYourGame() {
    // Your game logic
}
```

### Modify Colors
Edit CSS variables:
```css
:root {
    --primary: #00ffff;      /* Cyan */
    --secondary: #ff00ff;    /* Magenta */
    --neon-green: #00ff41;   /* Green */
}
```

### Adjust Difficulty
Snake speed:
```javascript
snake.speed = 150; // Lower = faster
```

Tetris speed:
```javascript
setInterval(updateTetris, 500); // Lower = faster
```

Memory cards:
```javascript
const MEMORY_ICONS = ['🎮', '🎯', /* add more */];
```

## 📱 Responsive Features

- **Desktop** - Full-size canvases and multi-column layout
- **Tablet** - Responsive grid adjustments
- **Mobile** - Touch-friendly controls, single column

## 🌟 Technical Highlights

### Canvas Rendering
Efficient 2D rendering for games:
```javascript
const ctx = canvas.getContext('2d');
ctx.fillRect(x, y, width, height);
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
```

### State Management
Clean game state objects:
```javascript
let snake = {
    body: [{x: 10, y: 10}],
    direction: 'right',
    score: 0
};
```

### Event Handling
Keyboard input for Snake:
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') snake.direction = 'up';
});
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Multiplayer support
- [ ] More games (Pong, Space Invaders, Breakout)
- [ ] Sound effects and music
- [ ] Custom themes
- [ ] Global online leaderboard
- [ ] Social sharing
- [ ] Replay system
- [ ] Tournament mode
- [ ] Power-ups and bonuses

### Advanced Features
- [ ] WebGL for 3D games
- [ ] AI opponents
- [ ] Procedural level generation
- [ ] Achievement notifications
- [ ] Profile system
- [ ] Game statistics and analytics

## 🎓 Learning Resources

This project demonstrates:
1. **Canvas API** - 2D game rendering
2. **Game Loops** - Using setInterval for updates
3. **Collision Detection** - Boundary and object collision
4. **State Management** - Tracking game data
5. **Event Handling** - Keyboard and mouse input
6. **Local Storage** - Data persistence
7. **Animation** - CSS and JavaScript animations

## 📊 Score System

### Snake
- +10 points per food
- Speed increases every 50 points
- Bonus for long snake length

### Tetris
- +100 points per line cleared
- Combo bonuses for multiple lines
- Progressive difficulty

### Memory
- +10 points per match
- Lower moves = better performance
- Perfect game = bonus stars

## 📄 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

Open source and free for educational purposes.

## 👨‍💻 Author

Created by Maya Smith - Showcasing game development and interactive design skills.

---

**Ready to Play?** Click a game and beat the high scores! 🎮✨
