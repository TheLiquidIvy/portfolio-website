# 🎨 Design System Studio

![Cyberpunk Theme](https://img.shields.io/badge/theme-cyberpunk-00ffff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Responsive](https://img.shields.io/badge/design-responsive-ff00ff?style=for-the-badge)

## 🚀 Overview

**Design System Studio** is a comprehensive design system builder and component showcase featuring live theme editing, component variants, code generation for multiple frameworks, and built-in accessibility checking. Create, customize, and export complete design systems with real-time preview.

## ✨ Features

### 🧩 Component Showcase
- **Buttons** - Multiple variants (Primary, Secondary, Success, Outline)
- **Cards** - Interactive cards with hover effects
- **Form Inputs** - Text, Email, Password, Select, Textarea
- **Modals** - Customizable modal dialogs
- **All Components** - Live editing and real-time updates

### 🎨 Theme Builder
- **Color System**
  - Primary, Secondary, Success, Error colors
  - Live color picker with hex values
  - Real-time preview updates
  - Color palette generator with shades
  
- **Typography System**
  - Font family selection (5+ fonts)
  - Base size control (12-20px)
  - Type scale configuration (1.1 - 1.5)
  - 8-level typography scale visualization
  
- **Spacing System**
  - 8px grid system (configurable 4-16px)
  - 10 spacing scales
  - Visual spacing guides
  
- **Border Radius**
  - Adjustable radius (0-24px)
  - Live component updates

### 💻 Code Generator
Generate production-ready code in multiple frameworks:

#### React
```jsx
- Functional components
- Props support
- Style objects
- Export statements
```

#### Vue 3
```vue
- Single File Components
- Computed properties
- Scoped styles
- Event emitters
```

#### HTML
```html
- Semantic markup
- Linked stylesheets
- Accessibility attributes
```

#### CSS
```css
- CSS custom properties
- Modern syntax
- Responsive utilities
- Design tokens
```

### 🎨 Color Palette Generator
- **Automatic Shade Generation** - 5 shades per color
- **Click to Copy** - One-click color code copying
- **Contrast Calculator** - Smart text color selection
- **Visual Swatches** - Beautiful color preview cards

### 📐 Typography Scale Visualizer
- **8 Typography Levels** - Display, H1-H4, Body, Small, Tiny
- **Font Size Display** - Show px and rem values
- **Live Preview** - See fonts in action
- **Scale Calculator** - Mathematical type scale

### ♿ Accessibility Checker
Real-time accessibility validation:

- ✅ **Color Contrast** - WCAG AA compliance checking
- ✅ **Touch Target Size** - Minimum 44x44px validation
- ✅ **Focus Indicators** - Keyboard navigation support
- ✅ **Semantic HTML** - Proper element usage
- ⚠️ **ARIA Labels** - Screen reader compatibility
- ✅ **Keyboard Navigation** - Full keyboard access

### 💾 Import/Export
- **Export Theme** - Download complete theme as JSON
- **Import Theme** - Load saved theme configurations
- **Reset Theme** - Restore default cyberpunk theme
- **Copy Code** - One-click code copying

## 🛠️ Technical Stack

- **Vanilla JavaScript (ES6+)** - Class-based architecture
- **CSS3 Grid & Flexbox** - Modern layout techniques
- **CSS Custom Properties** - Dynamic theming
- **LocalStorage** - Theme persistence
- **Canvas/SVG** - Vector graphics rendering

## 📦 Project Structure

```
design-system-studio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete styling system
├── js/
│   └── main.js         # Application logic & generators
└── README.md           # This file
```

## 🎮 Usage

### Creating a Custom Theme

1. **Adjust Colors**
   - Click color pickers in the controls panel
   - See live updates in the preview
   - Watch components change in real-time

2. **Configure Typography**
   - Select heading and body fonts
   - Adjust base size with slider
   - Modify type scale ratio
   - Preview all typography levels

3. **Set Spacing**
   - Adjust base spacing unit (8px grid)
   - Preview spacing scale
   - See visual spacing guides

4. **Customize Border Radius**
   - Slide to adjust corner radius
   - See instant component updates

### Generating Code

1. **Select Framework Tab**
   - Choose React, Vue, HTML, or CSS
   - Code updates automatically

2. **Copy Code**
   - Click "Copy" button
   - Paste into your project
   - Start using immediately

### Exporting Your Theme

1. **Click "Export Theme"**
2. **Save JSON file**
3. **Import later** or share with team

### Checking Accessibility

- View real-time accessibility checklist
- Green ✓ = Pass
- Yellow ! = Warning
- Red ✗ = Fail (auto-fix when possible)

## 🎨 Cyberpunk Theme

Default theme specifications:

### Colors
- **Primary**: `#00ffff` (Cyan)
- **Secondary**: `#ff00ff` (Magenta)  
- **Success**: `#00ff41` (Neon Green)
- **Error**: `#ff4757` (Red)

### Typography
- **Heading Font**: Orbitron
- **Body Font**: Rajdhani
- **Base Size**: 16px
- **Scale**: 1.25 (Major Third)

### Spacing
- **Base Unit**: 8px
- **Scale**: [8, 16, 24, 32, 48, 64, 96, 128, 192, 256]px

### Effects
- Neon glow shadows
- Smooth hover transitions
- Backdrop blur
- Glitch animations

## 🔧 Customization

### Adding New Fonts

```javascript
// In renderControls():
<option value="YourFont">Your Font Name</option>
```

### Adding New Component Types

```javascript
// In renderComponentsTab():
<div class="showcase-section fade-in">
    <div class="showcase-header">
        <h3 class="showcase-title">🆕 New Component</h3>
    </div>
    <div class="showcase-content">
        // Your component markup
    </div>
</div>
```

### Custom Code Templates

```javascript
// Add to generateReactCode(), generateVueCode(), etc.:
const customTemplate = `
    // Your custom code template
`;
```

## 📱 Responsive Design

### Desktop (1024px+)
- Side-by-side controls and preview
- Multi-column component grid
- Full feature set

### Tablet (768-1024px)
- Stacked layout
- Flexible grids
- Touch-optimized controls

### Mobile (<768px)
- Single column
- Simplified controls
- Optimized for small screens

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab through all controls
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: ARIA labels and roles
- **Color Contrast**: WCAG AA compliant
- **Touch Targets**: Minimum 44x44px buttons
- **Semantic HTML**: Proper heading hierarchy

## 🚀 Performance

- **CSS Grid Layout** - Hardware accelerated
- **Debounced Updates** - Smooth slider interactions
- **Lazy Rendering** - On-demand tab content
- **Optimized Reflows** - Minimal DOM manipulation
- **CSS Transforms** - GPU-accelerated animations

## 🌐 Browser Support

- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 not supported

## 💡 Use Cases

### For Designers
- Create design tokens
- Visualize type scales
- Generate color palettes
- Check accessibility

### For Developers
- Export theme configurations
- Generate component code
- Reference design tokens
- Test responsiveness

### For Teams
- Share design systems
- Maintain consistency
- Document components
- Onboard new members

## 📚 Code Examples

### Exported React Button

```jsx
import React from 'react';

const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      style={{
        fontFamily: 'Rajdhani',
        borderRadius: '6px'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Exported CSS Variables

```css
:root {
  --color-primary: #00ffff;
  --color-secondary: #ff00ff;
  --font-heading: 'Orbitron', sans-serif;
  --font-body: 'Rajdhani', sans-serif;
  --spacing-base: 8px;
  --border-radius: 6px;
}
```

## 🎯 Key Learnings

This project demonstrates:

- **Design System Architecture** - Scalable token-based design
- **Real-Time UI Updates** - Instant visual feedback
- **Code Generation** - Multi-framework support
- **Accessibility** - WCAG compliance checking
- **Modern JavaScript** - ES6+ class architecture
- **Responsive Design** - Mobile-first approach

## 🐛 Known Limitations

- Font loading requires internet connection
- Some fonts may not preview correctly
- Color contrast calculation is simplified
- Export doesn't include images/icons

## 🔮 Future Enhancements

- [ ] Component variant editor
- [ ] Animation timeline builder
- [ ] Grid system visualizer
- [ ] Icon library integration
- [ ] Dark/Light mode toggle
- [ ] Component composition tool
- [ ] Theme marketplace
- [ ] Collaborative editing
- [ ] Version control
- [ ] Figma integration

## 📄 License

This project is part of Maya Smith's portfolio and is available for demonstration purposes.

## 🤝 Contributing

This is a portfolio project showcasing design system development skills.

## 📧 Contact

- **Portfolio**: [Back to Portfolio](../../../index.html)
- **GitHub**: [View Source](https://github.com/mayasmith)
- **Email**: maya.smith@example.com

## 🌟 Highlights

> "A component library showcase with theme switching, design tokens, and interactive documentation for streamlined design consistency."

### Technologies Demonstrated
- ✅ Design Token Systems
- ✅ Component Architecture
- ✅ Code Generation
- ✅ Accessibility Testing
- ✅ Theme Management
- ✅ Multi-Framework Support

---

**Built with 💜 by Maya Smith** | [View More Projects](../../../index.html#projects)
