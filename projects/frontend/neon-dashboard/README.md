# 📊 Neon Dashboard

A stunning cyberpunk-themed analytics dashboard with real-time data visualization and interactive charts.

## ✨ Features

- **Real-time Data Updates**: Live updating statistics and metrics
- **Interactive Charts**: Multiple chart types (line, bar, doughnut, area) built with Chart.js
- **Glassmorphism Design**: Modern UI with backdrop blur and neon accents
- **Smooth Animations**: Animated stat counters, hover effects, and transitions
- **Responsive Layout**: Fully responsive grid system that works on all devices
- **Activity Feed**: Real-time activity tracking with smooth animations
- **Data Tables**: Sortable tables with status badges and hover effects

## 🎨 Design Highlights

- Neon cyan (#00ffff) and magenta (#ff00ff) color scheme
- Glowing effects and animated scan lines
- Cyberpunk-inspired glassmorphism cards
- Animated stat counters with smooth transitions
- Hover effects with scale transforms and shadows

## 🚀 Technologies

- **HTML5**: Semantic markup structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Modern vanilla JS for interactivity
- **Chart.js**: Professional charting library for data visualization
- **Orbitron & Rajdhani**: Google Fonts for cyberpunk aesthetic

## 📊 Chart Types

1. **Revenue Line Chart**: Trending revenue data with gradient fill
2. **User Growth Bar Chart**: Monthly new user statistics
3. **Traffic Sources Doughnut**: Visitor traffic breakdown by source
4. **Conversion Rate Area Chart**: Multi-line comparison chart

## 🎯 Interactive Features

- Animated stat counters on page load
- Real-time data simulation (updates every 3 seconds)
- Hover effects on all interactive elements
- Smooth transitions between states
- Time range selector for data filtering
- Refresh data button for manual updates

## 📁 File Structure

```
neon-dashboard/
├── index.html          # Main HTML file with dashboard structure
├── css/
│   └── style.css      # Dashboard-specific styles
├── js/
│   └── main.js        # Chart initialization and interactivity
└── README.md          # This file
```

## 🛠️ Setup

1. Open `index.html` in a modern web browser
2. No build process or installation required
3. For local development, use a local server (e.g., `python -m http.server` or Live Server extension)

## 💻 Usage

### Viewing Live Data
The dashboard automatically updates statistics every 3 seconds to simulate real-time data.

### Changing Time Range
Use the time range dropdown to filter data (demo only - logs to console).

### Refreshing Data
Click the "Refresh Data" button to trigger visual feedback and data updates.

## 🎨 Customization

### Colors
Edit CSS variables in the main `style.css` file:
```css
--primary: #00ffff;      /* Cyan */
--secondary: #ff00ff;    /* Magenta */
--neon-green: #00ff41;   /* Success */
```

### Data
Modify the data generation functions in `main.js`:
```javascript
generateRandomData(count, min, max)
generateTrendingData(count, base, variance)
```

### Widgets
Add new widgets by copying the `.widget` structure and updating the grid-column span:
```html
<div class="widget widget-stat">
    <!-- Widget content -->
</div>
```

## 📱 Responsive Breakpoints

- **Desktop**: Full 12-column grid layout
- **Tablet (< 1200px)**: 6-column spans for widgets
- **Mobile (< 768px)**: Single column stack layout

## 🌟 Key Features Explained

### Stat Counters
Animated number counters that count up from 0 to the target value on page load.

### Scanning Effect
The animated line at the top of each widget creates a futuristic scanning effect.

### Hover Interactions
All widgets lift up and glow when hovered, providing tactile feedback.

### Chart Animations
Charts animate in on load and respond to hover with tooltips and highlighting.

## 🔧 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📝 Notes

- This is a demo dashboard with simulated data
- In production, connect to real API endpoints for live data
- Chart.js is loaded via CDN in the HTML file
- All animations use CSS transitions for smooth performance

## 🚀 Future Enhancements

- Connect to real-time data sources
- Add more chart types (radar, scatter, bubble)
- Implement data export functionality
- Add customizable themes
- Create widget drag-and-drop functionality
- Add alert/notification system

## 📄 License

Free to use for personal and commercial projects.

---

**Built with 💙 in the Cyberpunk Universe**
