# 🌟 Cyberpunk Portfolio Website

A flashy, modern portfolio website for full stack developers with a stunning cyberpunk theme featuring neon effects, glitch animations, and futuristic design elements.

## ✨ Features

- **Cyberpunk Aesthetics**: Neon colors, glitch effects, and futuristic design
- **Animated Background**: Matrix-style falling characters and animated grid
- **Responsive Design**: Works perfectly on all devices
- **Interactive Sections**:
  - Hero section with typing animation
  - About section with terminal-style info
  - Skills section with animated progress bars
  - Projects showcase with filtering (Frontend/Full Stack)
  - Contact form with validation
- **Smooth Animations**: Scroll animations, hover effects, and transitions
- **Mobile-Friendly**: Hamburger menu and responsive layout

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. That's it! No build process or dependencies required.

## 📁 Project Structure

```
portfolio-website/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles with cyberpunk theme
├── js/
│   └── main.js        # JavaScript for interactions
└── README.md          # This file
```

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #00ffff;      /* Cyan/Neon Blue */
    --secondary: #ff00ff;    /* Magenta/Neon Pink */
    --accent: #ffff00;       /* Yellow */
    --neon-green: #00ff41;   /* Matrix Green */
}
```

### Content
1. **Personal Info**: Update the About section in `index.html`
2. **Skills**: Modify skill bars and percentages
3. **Projects**: Add/edit project cards with your own projects
4. **Contact**: Update contact information

### Projects
Each project card has:
- Title and description
- Technology tags
- Category (frontend/fullstack)
- Links to live demo and GitHub

### Images
Replace the placeholder project images:
- Create an `images/` folder
- Add your project screenshots
- Update the `<div class="project-placeholder">` sections

## 🌈 Color Scheme

- **Primary (Cyan)**: `#00ffff` - Main accent color
- **Secondary (Magenta)**: `#ff00ff` - Secondary accent
- **Neon Green**: `#00ff41` - Terminal/Matrix style
- **Dark Background**: `#0a0a0f` - Main background
- **Darker Background**: `#050508` - Contrast background

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🎯 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🔧 Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Orbitron, Rajdhani)

## 💡 Tips

1. **Performance**: The Matrix animation uses Canvas - adjust the `setInterval` value in `main.js` for performance
2. **Customization**: All animations can be modified in the CSS
3. **Adding Projects**: Copy a project card and update the content
4. **Form Handling**: Currently shows an alert - integrate with a backend or service like Formspree

## 📄 License

Free to use for personal and commercial projects. Attribution appreciated but not required.

## 🙌 Credits

- Fonts: Google Fonts (Orbitron, Rajdhani)
- Design: Custom cyberpunk-inspired design
- Icons: Unicode emojis

---

**Built with 💜 in the Cyberpunk Universe**

For questions or suggestions, feel free to reach out!
