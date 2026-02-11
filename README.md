# 🌟 Cyberpunk Portfolio Website

A flashy, modern portfolio website for full stack developers with a stunning cyberpunk theme featuring neon effects, glitch animations, futuristic design elements, and a comprehensive set of interactive features.

## ✨ Features

### Core Design
- **Cyberpunk Aesthetics**: Neon colors, glitch effects, and futuristic design
- **Animated Background**: Matrix-style falling characters and animated grid
- **Responsive Design**: Works perfectly on all devices
- **Mobile-Friendly**: Hamburger menu and responsive layout

### Interactive Features
- **Interactive Terminal** (Press `~`): Full-featured terminal with 13 commands including `help`, `ls`, `cd`, `cat`, `whoami`, `stats`, `social`, `coffee`, `matrix`, and more
- **Epic Loading Screen**: Boot sequence with ASCII art, progress bar, and particle effects
- **Enhanced Cursor Effects**: Particle trail system with section-based colors (Toggle with CTRL+P)
- **Theme Switcher**: 5 stunning themes (Cyberpunk, Dark Minimal, Neon Light, Matrix, Synthwave)
- **Visitor Analytics**: Live statistics widget with visitor count, time on site, and more

### Easter Eggs & Hidden Features
- **Konami Code**: Type ↑↑↓↓←→←→BA for "Ultra Mode"
- **Logo Secret**: Click the logo 10 times for a surprise
- **Matrix Rain**: Type `matrix` in terminal for full-screen Matrix animation
- **Developer Console**: Press CTRL+SHIFT+D for performance metrics

### Form & Engagement
- **Contact Form**: Real-time validation with animated indicators
- **Success/Error Modals**: Beautiful modals with confetti animations
- **Rate Limiting**: Prevents spam submissions

### Accessibility
- **ARIA Labels**: On all interactive elements
- **Keyboard Navigation**: Full keyboard support for all features
- **Reduced Motion**: Respects prefers-reduced-motion setting
- **Screen Reader**: Comprehensive announcements
- **Skip Links**: Jump to main content

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. That's it! No build process or dependencies required.

## 📁 Project Structure

```
portfolio-website/
│
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles with cyberpunk theme
│   ├── themes.css         # Theme variables (5 themes)
│   ├── terminal.css       # Terminal styling with CRT effects
│   └── loading.css        # Loading screen styles
├── js/
│   ├── main.js            # Core JavaScript
│   ├── terminal.js        # Interactive terminal system
│   ├── loading.js         # Loading screen with boot sequence
│   ├── cursor.js          # Enhanced cursor particle effects
│   ├── easter-eggs.js     # Hidden features and achievements
│   ├── theme-switcher.js  # Theme management
│   ├── contact-form.js    # Form validation and submission
│   ├── analytics.js       # Visitor analytics widget
│   └── accessibility.js   # Accessibility improvements
└── README.md              # This file
```

## 🎮 Interactive Features Guide

### Terminal Commands
Press `~` (tilde) to open the terminal, then try these commands:
- `help` - Show all available commands
- `ls` - List projects (try `ls frontend` or `ls fullstack`)
- `cd <project>` - Navigate to a project
- `cat about.txt` - Display about information
- `cat skills.txt` - Display skills list
- `cat contact.txt` - Display contact information
- `whoami` - Display developer info
- `stats` - Show portfolio statistics
- `social` - Display social media links
- `coffee` - Show coffee counter animation
- `matrix` - Trigger Matrix rain animation
- `theme <name>` - Switch themes
- `easteregg` - Secret surprise
- `clear` - Clear terminal
- `exit` - Close terminal

### Keyboard Shortcuts
- `~` (tilde) - Open/close terminal
- `ESC` - Close terminal or modals
- `CTRL + P` - Toggle cursor effects
- `CTRL + SHIFT + D` - Open developer console
- `↑↑↓↓←→←→BA` - Konami code for Ultra Mode

### Themes
Click the 🎨 icon in the navigation bar to switch between:
1. **Cyberpunk** (Default) - Neon cyan and magenta
2. **Dark Minimal** - Clean professional dark
3. **Neon Light** - Bright with neon accents
4. **Matrix** - Green terminal aesthetic
5. **Synthwave** - Retro 80s pink and blue

## 🎨 Customization

### Colors
Edit CSS variables in `css/themes.css`:
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
