# 🚀 Crypto Tracker

A visually stunning cryptocurrency tracking dashboard with live price updates, sparkline charts, and portfolio calculator - all wrapped in a cyberpunk aesthetic.

![Crypto Tracker](https://img.shields.io/badge/Frontend-Project-00ffff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-ff00ff?style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-Modern-00ff41?style=for-the-badge)

## ✨ Features

### 🎨 Visual Features
- **Particle Effects Background** - Animated particles with connection lines
- **Live Price Ticker** - Smoothly scrolling price ribbon with real-time updates
- **Sparkline Charts** - Mini price history charts for each cryptocurrency
- **Gradient Cards** - Beautiful card-based layout with hover effects
- **Glowing Animations** - Cyberpunk-style neon glows and pulse effects

### 📊 Functional Features
- **Real-Time Price Updates** - Simulated live price changes every 10 seconds
- **Price Change Indicators** - Color-coded positive/negative changes
- **Portfolio Calculator** - Calculate your holdings value in real-time
- **Market Statistics** - Total market cap and 24h volume tracking
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 🎯 Interactive Elements
- **Refresh Button** - Manually trigger data updates with visual feedback
- **Hover Effects** - Smooth animations on card interactions
- **Auto-Updates** - Automatic price refreshes in the background
- **Dynamic Sparklines** - Generated price history visualizations

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, gradients, animations
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **Canvas API** - Particles and sparkline charts
- **CSS Grid & Flexbox** - Responsive layouts

## 📁 Project Structure

```
crypto-tracker/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (cyberpunk theme)
├── js/
│   └── main.js         # Core functionality
└── README.md           # This file
```

## 🚀 Setup & Usage

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your browser
3. **That's it!** No build process or dependencies required

### Customization

#### Add More Cryptocurrencies
Edit the `cryptoData` array in `js/main.js`:

```javascript
const cryptoData = [
    { 
        id: 'bitcoin', 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        icon: '₿', 
        rank: 1, 
        price: 45234.67, 
        change: 5.23, 
        volume: 28500000000, 
        marketCap: 885000000000 
    },
    // Add more cryptocurrencies here...
];
```

#### Modify Colors
Update CSS custom properties in `css/style.css`:

```css
:root {
    --primary: #00ffff;      /* Cyan */
    --secondary: #ff00ff;    /* Magenta */
    --neon-green: #00ff41;   /* Green */
    --bg-dark: #0a0a0f;      /* Dark background */
}
```

#### Adjust Update Interval
Change the auto-refresh interval in `js/main.js`:

```javascript
// Default: 10000ms (10 seconds)
setInterval(() => {
    // Update logic...
}, 10000);
```

## 🎮 Features Breakdown

### Particles Background
- 80 animated particles with connection lines
- Smooth canvas-based animation
- Responds to window resize
- Two-color particles (cyan and magenta)

### Sparkline Charts
- Canvas-based mini charts
- Gradient fill effect
- 30 data points per chart
- Color-coded (green for up, red for down)
- Responsive sizing

### Portfolio Calculator
- Select any cryptocurrency
- Enter amount to hold
- Real-time value calculation
- 24h profit/loss breakdown
- Animated result display

### Live Price Updates
- Simulated market volatility
- Smooth price transitions
- Color-coded changes
- Automatic refresh
- Manual refresh button

## 📱 Responsive Design

The tracker adapts to all screen sizes:
- **Desktop** (1200px+): Multi-column grid layout
- **Tablet** (768px-1199px): 2-column layout
- **Mobile** (<768px): Single column, optimized touch targets

## 🎨 Design Philosophy

### Cyberpunk Theme
- **Neon Colors**: Cyan (#00ffff), Magenta (#ff00ff), Green (#00ff41)
- **Dark Background**: Deep space black (#0a0a0f)
- **Glowing Effects**: Box-shadows and text-shadows
- **Typography**: Orbitron (headings) + Rajdhani (body)

### Animation Principles
- **Smooth Transitions**: All animations use ease-in-out curves
- **Performance**: CSS transforms for better rendering
- **Accessibility**: Respects user motion preferences
- **Visual Feedback**: Hover states and loading indicators

## 🌟 Key Highlights

1. **Zero Dependencies** - Pure vanilla JavaScript
2. **Lightweight** - Fast loading and smooth performance
3. **Production-Ready** - Clean, maintainable code
4. **Visually Impressive** - Modern cyberpunk aesthetic
5. **Educational** - Well-commented code for learning

## 🔮 Future Enhancements

- [ ] Integration with real cryptocurrency APIs
- [ ] Historical price charts (1D, 1W, 1M, 1Y)
- [ ] Favorites/Watchlist feature
- [ ] Price alerts system
- [ ] Dark/Light theme toggle
- [ ] Export portfolio data
- [ ] Multi-currency support (USD, EUR, BTC)
- [ ] Search and filter functionality

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of Maya Smith's portfolio - showcasing modern frontend development skills.

---

**Note**: This is a demo project using mock data. For production use, integrate with real cryptocurrency APIs like CoinGecko, Binance, or CoinMarketCap.
