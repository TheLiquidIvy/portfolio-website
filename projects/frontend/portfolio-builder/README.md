# 💼 Portfolio Builder

A powerful drag-and-drop portfolio builder with live preview, template system, and HTML export. Create stunning portfolios visually without writing code!

![Portfolio Builder](https://img.shields.io/badge/DragDrop-Enabled-00ffff?style=for-the-badge)
![Templates](https://img.shields.io/badge/Templates-3-ff00ff?style=for-the-badge)
![Export](https://img.shields.io/badge/Export-HTML-00ff41?style=for-the-badge)

## ✨ Features

### 🎨 Visual Editor
- **Drag & Drop Interface** - Intuitive component placement
- **7 Pre-built Components** - Hero, About, Projects, Skills, Contact, Testimonial, Gallery
- **Real-time Preview** - See changes instantly
- **Block Reordering** - Drag blocks to rearrange
- **Component Customization** - Edit properties per block

### 🎯 Component Library
All components are drag-and-drop ready:
- **🎯 Hero Section** - Eye-catching landing area
- **👤 About Section** - Personal introduction
- **💼 Project Grid** - Showcase your work
- **⚡ Skills List** - Display expertise
- **📧 Contact Form** - Get in touch section
- **💬 Testimonial** - Social proof
- **🖼️ Image Gallery** - Visual portfolio

### 🎨 Customization Panel
Edit any selected block:
- **Background Color** - Custom color picker
- **Text Color** - Typography control
- **Padding** - Spacing adjustment (8-48px)
- **Border Radius** - Corner rounding (0-32px)
- **Animation** - Fade/Slide/Scale effects

### 📋 Templates
Quick-start with pre-made layouts:
- **Minimal** - Simple 3-section portfolio
- **Standard** - Full-featured layout
- **Creative** - Visual-first design

### 💾 Persistence & Export
- **Auto-save** - Changes saved to localStorage
- **Preview Mode** - Full-screen preview
- **HTML Export** - Download complete HTML file
- **Browser Storage** - Reload anytime

## 🛠️ Technologies

- **HTML5 Drag & Drop API** - Native browser functionality
- **JavaScript ES6+** - Modern vanilla JS
- **CSS3** - Grid, Flexbox, Animations
- **localStorage** - Client-side persistence
- **Blob API** - File generation & download

## 📁 Project Structure

```
portfolio-builder/
├── index.html          # Main builder interface
├── css/
│   └── style.css       # Cyberpunk styling
├── js/
│   └── main.js         # Builder logic & DnD
└── README.md           # This file
```

## 🚀 Setup & Usage

### Installation
1. Open `index.html` in your browser
2. Start dragging components
3. Customize and export!

### Building Your Portfolio

#### Step 1: Add Components
1. Drag a component from the left sidebar
2. Drop it onto the canvas area
3. Component appears with default styling

#### Step 2: Customize
1. Click on any block to select it
2. Edit properties in the right panel:
   - Change colors
   - Adjust spacing
   - Modify border radius
   - Add animations

#### Step 3: Reorder
1. Drag blocks vertically to reorder
2. Or use ↑/↓ buttons on each block
3. Delete unwanted blocks with ✕

#### Step 4: Preview & Export
1. Click **👁️ Preview** for full-screen view
2. Review your portfolio
3. Click **📤 Export HTML** to download
4. Share your portfolio!

## 🎮 Interactive Features

### Drag and Drop
- **Components → Canvas** - Add new blocks
- **Block → Block** - Reorder blocks
- **Visual Feedback** - Highlighting on drag-over

### Block Controls
Every block has:
- **⋮⋮ Handle** - Drag to reorder
- **↑ Move Up** - Shift block upward
- **↓ Move Down** - Shift block downward
- **✕ Delete** - Remove block

### Properties Panel
Dynamic editing:
- **Color Pickers** - Visual color selection
- **Range Sliders** - Precise value control
- **Live Updates** - Changes apply instantly
- **Per-block Settings** - Independent styling

## 💡 Use Cases

### Personal Portfolio
Create your professional portfolio in minutes

### Client Projects
Rapid prototyping for client presentations

### Learning Tool
Understand web layout and design principles

### Quick Landing Pages
Build simple one-page sites

## 🎨 Customization

### Add New Components
Edit `componentTemplates` in `js/main.js`:

```javascript
const componentTemplates = {
    mycomponent: {
        icon: '🎨',
        name: 'My Component',
        html: '<div>Your HTML here</div>'
    }
};
```

### Modify Existing Components
Update the `html` property of any template:

```javascript
hero: {
    icon: '🎯',
    name: 'Hero Section',
    html: '<div class="block-content"><h1>Your Custom Content</h1></div>'
}
```

### Add More Properties
Extend the properties panel in `updatePropertiesPanel()`:

```javascript
<div class="property-group">
    <label class="property-label">Font Size</label>
    <input type="range" class="property-input property-range" id="prop-fontsize" min="12" max="48">
</div>
```

### Create New Templates
Add to the `templates` object in `loadTemplate()`:

```javascript
const templates = {
    mytemplate: ['hero', 'about', 'projects', 'contact']
};
```

## 📱 Responsive Design

- **Desktop** (1400px+): 3-column layout (components | canvas | properties)
- **Laptop** (1200px-1399px): Adjusted column widths
- **Tablet** (<1200px): Stacked single-column layout
- **Mobile** (<768px): Optimized for touch

## 🌟 Technical Highlights

### Drag & Drop System
```javascript
// Component drag
item.addEventListener('dragstart', handleComponentDragStart);

// Canvas drop
canvas.addEventListener('drop', handleCanvasDrop);

// Block reordering
block.addEventListener('dragover', handleBlockDragOver);
```

### State Management
```javascript
let blocks = []; // All canvas blocks
let selectedBlock = null; // Currently editing
let blockIdCounter = 0; // Unique IDs
```

### Persistence
```javascript
// Save to localStorage
localStorage.setItem('portfolio-builder', JSON.stringify(blocks));

// Load on startup
const saved = localStorage.getItem('portfolio-builder');
blocks = JSON.parse(saved);
```

### File Export
```javascript
const html = generateHTML(blocks);
const blob = new Blob([html], { type: 'text/html' });
const url = URL.createObjectURL(blob);
// Download via anchor element
```

## 🔮 Future Enhancements

- [ ] Image upload and management
- [ ] Rich text editor for content
- [ ] More component types (pricing, timeline, stats)
- [ ] Color theme presets
- [ ] Responsive breakpoint editing
- [ ] Undo/Redo functionality
- [ ] Component duplication
- [ ] Grid/Flexbox layout options
- [ ] CSS export (separate stylesheet)
- [ ] JSON import/export
- [ ] Collaboration features
- [ ] Cloud storage integration
- [ ] SEO metadata editing
- [ ] Analytics integration

## 📊 Export Format

Generated HTML structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <style>
        /* Inline styles from customization */
    </style>
</head>
<body>
    <div class="section" style="...">
        <!-- Component content -->
    </div>
    <!-- More sections -->
</body>
</html>
```

## 🎓 Learning Outcomes

This project teaches:
1. **Drag & Drop API** - HTML5 native DnD
2. **State Management** - Managing complex UI state
3. **localStorage** - Browser storage API
4. **Blob & File APIs** - File generation
5. **Dynamic DOM** - Creating/updating elements
6. **Event Delegation** - Efficient event handling
7. **CSS-in-JS** - Dynamic styling

## 💻 Browser Requirements

- Modern browser with ES6+ support
- Drag & Drop API support
- localStorage enabled
- Blob API for export

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

Open source and free for educational and personal use.

## 👨‍💻 Author

Created by Maya Smith - Showcasing interactive UI/UX and drag-and-drop expertise.

---

**Build Your Portfolio Visually** - No coding required! 🎨✨
