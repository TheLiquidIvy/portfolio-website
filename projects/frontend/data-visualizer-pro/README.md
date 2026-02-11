# 📊 Data Visualizer Pro

![Cyberpunk Theme](https://img.shields.io/badge/theme-cyberpunk-00ffff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Responsive](https://img.shields.io/badge/design-responsive-ff00ff?style=for-the-badge)

## 🚀 Overview

**Data Visualizer Pro** is an advanced, interactive data visualization platform featuring real-time data streaming, multiple chart types, and comprehensive data export capabilities. Built with vanilla JavaScript and featuring a stunning cyberpunk aesthetic with neon colors and smooth animations.

## ✨ Features

### 📈 Advanced Chart Types
- **3D Bar Charts** - Interactive 3D-style bar visualizations with hover effects
- **Donut Charts** - Animated revenue distribution with dynamic legends
- **Heat Maps** - 84-cell interactive heat map with color-coded intensity
- **Line Charts** - SVG-based time series with area gradients and animated drawing
- **Radar Charts** - Multi-axis performance visualization with pulsing effects
- **Flow Diagrams** - Sankey-style data flow visualization with animated connections

### ⚡ Real-Time Features
- **Live Data Streaming** - Toggle real-time updates with 2-second intervals
- **Animated Transitions** - Smooth chart updates with easing animations
- **Auto-Refresh** - Configurable data refresh intervals
- **Status Indicators** - Real-time data stream monitoring with pulse animations

### 🎨 Customization
- **5 Color Schemes**:
  - Cyber (Default) - Neon cyan and magenta
  - Ocean - Blue gradients
  - Sunset - Warm orange and red
  - Forest - Green tones
  - Neon Party - Vibrant multi-color
- **Dynamic Data Range** - Adjust data scale from 10% to 200%
- **Chart Type Filtering** - Show/hide specific chart types
- **Responsive Layout** - Adapts to all screen sizes

### 💾 Data Export
- **JSON Export** - Structured data export
- **CSV Export** - Spreadsheet-compatible format
- **Multi-Format** - Export all formats as ZIP
- **One-Click Download** - Instant file generation

### 📊 Statistics Dashboard
- **Total Revenue** - Aggregated revenue metrics
- **Average Values** - Mean calculations with trends
- **Peak Performance** - Maximum value tracking
- **Data Points Counter** - Real-time data point monitoring

### 🎯 Interactive Features
- **Zoom & Pan** - Chart exploration tools
- **Hover Tooltips** - Detailed value display on hover
- **Click Actions** - Interactive chart elements
- **Keyboard Navigation** - Full keyboard accessibility

## 🛠️ Technical Stack

- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **CSS3 Animations** - Hardware-accelerated transforms
- **SVG Graphics** - Scalable vector charts
- **Canvas API** - High-performance rendering
- **LocalStorage** - Persist user preferences

## 📦 Project Structure

```
data-visualizer-pro/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete styling with animations
├── js/
│   └── main.js         # Full application logic
└── README.md           # This file
```

## 🎮 Usage

### Starting Real-Time Mode
1. Click the "Start Live" button in the control panel
2. Watch charts update automatically every 2 seconds
3. Click "Stop Live" to pause updates

### Changing Color Schemes
1. Select a scheme from the "Color Scheme" dropdown
2. Charts instantly update with new colors
3. Themes persist across sessions

### Exporting Data
1. Click the "Export Data" button
2. Choose format: JSON, CSV, or All
3. Click "Export" to download
4. Files save automatically to your downloads folder

### Adjusting Data Range
1. Use the "Data Range" slider
2. Drag to scale data from 10% to 200%
3. Charts update in real-time

### Chart Type Filtering
1. Select from "Chart Type" dropdown
2. Choose specific chart or "All Charts"
3. Filtered view updates instantly

## 🎨 Cyberpunk Theme

The project features a cohesive cyberpunk aesthetic:

- **Primary Color**: `#00ffff` (Cyan)
- **Secondary Color**: `#ff00ff` (Magenta)
- **Accent Color**: `#00ff41` (Neon Green)
- **Fonts**: 
  - Orbitron (Headers)
  - Rajdhani (Body)

### Visual Effects
- Neon glow shadows
- Glitch animations
- Pulsing indicators
- Smooth hover transitions
- Backdrop blur effects

## 🔧 Customization

### Adding New Chart Types

```javascript
// In js/main.js, add to renderAllCharts():
renderNewChart() {
    const container = document.getElementById('newChart');
    // Your chart rendering logic
}
```

### Custom Color Schemes

```javascript
// In applyColorScheme() method:
const schemes = {
    myScheme: ['#color1', '#color2', '#color3', '#color4']
};
```

### Data Sources

The project generates random data by default. To connect real data:

```javascript
// Replace generateInitialData() with API calls:
async generateInitialData() {
    const response = await fetch('your-api-endpoint');
    return await response.json();
}
```

## 📱 Responsive Design

- **Desktop**: Full grid layout with 2+ columns
- **Tablet**: 1-2 column layout
- **Mobile**: Single column, optimized controls

## ♿ Accessibility

- **Keyboard Navigation**: All controls accessible via keyboard
- **ARIA Labels**: Proper labeling for screen readers
- **High Contrast**: Meets WCAG AA standards
- **Focus Indicators**: Clear focus states for all interactive elements

## 🚀 Performance

- **Efficient Rendering**: RequestAnimationFrame for smooth animations
- **Lazy Loading**: Charts render on-demand
- **Optimized DOM**: Minimal reflows and repaints
- **Hardware Acceleration**: CSS transforms and opacity

## 🐛 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

This project is part of Maya Smith's portfolio and is available for demonstration purposes.

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome!

## 📧 Contact

- **Portfolio**: [Back to Portfolio](../../../index.html)
- **GitHub**: [View Source](https://github.com/mayasmith)
- **Email**: maya.smith@example.com

## 🎯 Future Enhancements

- [ ] WebSocket support for real-time data
- [ ] More chart types (Treemap, Sunburst, Network)
- [ ] Data filtering and aggregation tools
- [ ] Dashboard customization (drag & drop)
- [ ] Chart annotations and markers
- [ ] PDF export with charts
- [ ] Data import from files
- [ ] Collaborative sharing features

## 🌟 Highlights

> "A multi-chart analytics workspace with streaming updates, export tooling, and configurable layouts built for dense, high-impact reporting."

This project demonstrates proficiency in:
- Advanced data visualization techniques
- Real-time data handling
- Interactive UI/UX design
- Performance optimization
- Responsive design principles
- Modern JavaScript (ES6+)

---

**Built with ⚡ by Maya Smith** | [View More Projects](../../../index.html#projects)
