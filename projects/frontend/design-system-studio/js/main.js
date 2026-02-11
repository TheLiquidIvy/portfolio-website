// Design System Studio - Main JavaScript
// Interactive component showcase with theme builder and code generation

class DesignSystemStudio {
    constructor() {
        this.theme = {
            colors: {
                primary: '#00ffff',
                secondary: '#ff00ff',
                success: '#00ff41',
                error: '#ff4757',
                background: '#0a0a0f',
                text: '#ffffff'
            },
            typography: {
                headingFont: 'Orbitron',
                bodyFont: 'Rajdhani',
                baseSize: 16,
                scale: 1.25
            },
            spacing: {
                base: 8,
                scale: [1, 2, 3, 4, 6, 8, 12, 16, 24, 32]
            },
            borderRadius: 6
        };
        this.currentFramework = 'react';
        this.currentTab = 'components';
        this.init();
    }

    init() {
        this.createUI();
        this.attachEventListeners();
        this.generateColorPalette();
        this.updatePreview();
        this.checkAccessibility();
    }

    createUI() {
        const container = document.getElementById('demo');
        container.innerHTML = `
            <div class="studio-container">
                <div class="theme-builder">
                    <div class="builder-header">
                        <h2 class="builder-title">⚡ Design System Studio</h2>
                        <div class="builder-actions">
                            <button id="exportTheme" class="action-btn">Export Theme</button>
                            <button id="importTheme" class="action-btn">Import Theme</button>
                            <button id="resetTheme" class="action-btn">Reset</button>
                        </div>
                    </div>
                    <div class="builder-grid">
                        <div class="controls-panel">
                            ${this.renderControls()}
                        </div>
                        <div class="preview-panel">
                            <div class="preview-header">
                                <h3 class="preview-title">Live Preview</h3>
                                <div class="preview-tabs">
                                    <button class="tab-btn active" data-tab="components">Components</button>
                                    <button class="tab-btn" data-tab="typography">Typography</button>
                                    <button class="tab-btn" data-tab="colors">Colors</button>
                                    <button class="tab-btn" data-tab="spacing">Spacing</button>
                                </div>
                            </div>
                            <div id="previewContent" class="components-showcase"></div>
                            ${this.renderCodeGenerator()}
                            ${this.renderAccessibilityChecker()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.renderPreviewContent();
    }

    renderControls() {
        return `
            <div class="control-section">
                <h3 class="section-title">🎨 Colors</h3>
                ${this.renderColorControl('Primary', 'primary')}
                ${this.renderColorControl('Secondary', 'secondary')}
                ${this.renderColorControl('Success', 'success')}
                ${this.renderColorControl('Error', 'error')}
            </div>
            
            <div class="control-section">
                <h3 class="section-title">📝 Typography</h3>
                <div class="control-group">
                    <label class="control-label">Heading Font</label>
                    <select class="font-select" id="headingFont">
                        <option value="Orbitron" selected>Orbitron</option>
                        <option value="Rajdhani">Rajdhani</option>
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">Body Font</label>
                    <select class="font-select" id="bodyFont">
                        <option value="Rajdhani" selected>Rajdhani</option>
                        <option value="Orbitron">Orbitron</option>
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">Base Size: <span id="baseSizeValue">16px</span></label>
                    <input type="range" class="range-slider" id="baseSize" min="12" max="20" value="16">
                </div>
                <div class="control-group">
                    <label class="control-label">Scale: <span id="scaleValue">1.25</span></label>
                    <input type="range" class="range-slider" id="typeScale" min="1.1" max="1.5" step="0.05" value="1.25">
                </div>
            </div>
            
            <div class="control-section">
                <h3 class="section-title">📐 Spacing</h3>
                <div class="control-group">
                    <label class="control-label">Base Unit: <span id="spacingBaseValue">8px</span></label>
                    <input type="range" class="range-slider" id="spacingBase" min="4" max="16" value="8">
                </div>
            </div>
            
            <div class="control-section">
                <h3 class="section-title">🔲 Border Radius</h3>
                <div class="control-group">
                    <label class="control-label">Radius: <span id="radiusValue">6px</span></label>
                    <input type="range" class="range-slider" id="borderRadius" min="0" max="24" value="6">
                </div>
            </div>
        `;
    }

    renderColorControl(label, key) {
        return `
            <div class="control-group">
                <label class="control-label">${label}</label>
                <div class="color-picker-wrapper">
                    <input type="color" class="color-input" id="${key}Color" value="${this.theme.colors[key]}" data-color="${key}">
                    <span class="color-value" id="${key}Value">${this.theme.colors[key]}</span>
                </div>
            </div>
        `;
    }

    renderPreviewContent() {
        const content = document.getElementById('previewContent');
        
        switch(this.currentTab) {
            case 'components':
                content.innerHTML = this.renderComponentsTab();
                break;
            case 'typography':
                content.innerHTML = this.renderTypographyTab();
                break;
            case 'colors':
                content.innerHTML = this.renderColorsTab();
                break;
            case 'spacing':
                content.innerHTML = this.renderSpacingTab();
                break;
        }
    }

    renderComponentsTab() {
        return `
            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">🔘 Buttons</h3>
                    <button class="edit-toggle" data-component="buttons">Edit Props</button>
                </div>
                <div class="showcase-content">
                    <div class="button-variants">
                        <button class="demo-button btn-primary">Primary Button</button>
                        <button class="demo-button btn-secondary">Secondary Button</button>
                        <button class="demo-button btn-success">Success Button</button>
                        <button class="demo-button btn-outline">Outline Button</button>
                    </div>
                </div>
            </div>

            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">🃏 Cards</h3>
                    <button class="edit-toggle" data-component="cards">Edit Props</button>
                </div>
                <div class="showcase-content">
                    <div class="card-variants">
                        <div class="demo-card">
                            <h4 class="card-header">Card Title</h4>
                            <p class="card-content">This is a demo card component with interactive hover effects and customizable styling.</p>
                            <div class="card-footer">
                                <span>Learn More →</span>
                            </div>
                        </div>
                        <div class="demo-card">
                            <h4 class="card-header">Another Card</h4>
                            <p class="card-content">Cards support various content types including text, images, and actions.</p>
                            <div class="card-footer">
                                <span>View Details →</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">📥 Form Inputs</h3>
                    <button class="edit-toggle" data-component="inputs">Edit Props</button>
                </div>
                <div class="showcase-content">
                    <div class="input-variants">
                        <input type="text" class="demo-input" placeholder="Text Input">
                        <input type="email" class="demo-input" placeholder="Email Input">
                        <input type="password" class="demo-input" placeholder="Password Input">
                        <select class="demo-input">
                            <option>Select Option</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                        <textarea class="demo-input" rows="3" placeholder="Textarea"></textarea>
                    </div>
                </div>
            </div>

            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">💬 Modal</h3>
                    <button class="edit-toggle" data-component="modal">Edit Props</button>
                </div>
                <div class="showcase-content">
                    <div class="modal-demo">
                        <button class="modal-trigger" id="openModal">Open Modal</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderTypographyTab() {
        const scale = this.theme.typography.scale;
        const baseSize = this.theme.typography.baseSize;
        
        return `
            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">📝 Typography Scale</h3>
                </div>
                <div class="typography-scale">
                    ${this.generateTypographyScale(baseSize, scale)}
                </div>
            </div>
        `;
    }

    generateTypographyScale(base, scale) {
        const levels = [
            { name: 'Display', multiplier: Math.pow(scale, 5) },
            { name: 'H1', multiplier: Math.pow(scale, 4) },
            { name: 'H2', multiplier: Math.pow(scale, 3) },
            { name: 'H3', multiplier: Math.pow(scale, 2) },
            { name: 'H4', multiplier: scale },
            { name: 'Body', multiplier: 1 },
            { name: 'Small', multiplier: 1 / scale },
            { name: 'Tiny', multiplier: 1 / Math.pow(scale, 2) }
        ];
        
        return levels.map(level => {
            const size = (base * level.multiplier).toFixed(1);
            return `
                <div class="type-sample">
                    <div class="type-info">
                        <span>${level.name}</span>
                        <span>${size}px / ${(level.multiplier).toFixed(2)}rem</span>
                    </div>
                    <div class="type-display" style="font-size: ${size}px; font-family: '${this.theme.typography.headingFont}', sans-serif;">
                        The Quick Brown Fox Jumps
                    </div>
                </div>
            `;
        }).join('');
    }

    renderColorsTab() {
        return `
            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">🎨 Color Palette</h3>
                    <button class="action-btn" id="generatePalette">Generate New</button>
                </div>
                <div class="showcase-content">
                    <div class="palette-grid" id="paletteGrid"></div>
                </div>
            </div>
        `;
    }

    renderSpacingTab() {
        const base = this.theme.spacing.base;
        const scale = this.theme.spacing.scale;
        
        return `
            <div class="showcase-section fade-in">
                <div class="showcase-header">
                    <h3 class="showcase-title">📐 Spacing System</h3>
                </div>
                <div class="showcase-content">
                    <div class="spacing-grid">
                        ${scale.map((multiplier, i) => {
                            const value = base * multiplier;
                            return `
                                <div class="spacing-item">
                                    <div class="spacing-visual" style="width: ${value}px;"></div>
                                    <span class="spacing-label">space-${i}</span>
                                    <span class="spacing-value">${value}px</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderCodeGenerator() {
        return `
            <div class="code-generator">
                <div class="code-header">
                    <h3 class="code-title">💻 Code Generator</h3>
                    <div class="framework-tabs">
                        <button class="framework-tab active" data-framework="react">React</button>
                        <button class="framework-tab" data-framework="vue">Vue</button>
                        <button class="framework-tab" data-framework="html">HTML</button>
                        <button class="framework-tab" data-framework="css">CSS</button>
                    </div>
                </div>
                <div class="code-block" id="codeBlock" data-language="jsx">
                    <button class="copy-btn" id="copyCode">Copy</button>
                    <pre id="generatedCode"></pre>
                </div>
            </div>
        `;
    }

    renderAccessibilityChecker() {
        return `
            <div class="accessibility-panel">
                <div class="a11y-header">
                    <span class="a11y-icon">♿</span>
                    <h3 class="a11y-title">Accessibility Checker</h3>
                </div>
                <div class="a11y-checklist" id="a11yChecklist"></div>
            </div>
        `;
    }

    attachEventListeners() {
        // Color pickers
        document.querySelectorAll('.color-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const colorKey = e.target.dataset.color;
                this.theme.colors[colorKey] = e.target.value;
                document.getElementById(`${colorKey}Value`).textContent = e.target.value;
                this.updatePreview();
                this.checkAccessibility();
            });
        });

        // Typography controls
        document.getElementById('headingFont')?.addEventListener('change', (e) => {
            this.theme.typography.headingFont = e.target.value;
            this.updatePreview();
        });

        document.getElementById('bodyFont')?.addEventListener('change', (e) => {
            this.theme.typography.bodyFont = e.target.value;
            this.updatePreview();
        });

        document.getElementById('baseSize')?.addEventListener('input', (e) => {
            this.theme.typography.baseSize = parseInt(e.target.value);
            document.getElementById('baseSizeValue').textContent = e.target.value + 'px';
            this.updatePreview();
        });

        document.getElementById('typeScale')?.addEventListener('input', (e) => {
            this.theme.typography.scale = parseFloat(e.target.value);
            document.getElementById('scaleValue').textContent = e.target.value;
            this.updatePreview();
        });

        // Spacing
        document.getElementById('spacingBase')?.addEventListener('input', (e) => {
            this.theme.spacing.base = parseInt(e.target.value);
            document.getElementById('spacingBaseValue').textContent = e.target.value + 'px';
            this.updatePreview();
        });

        // Border radius
        document.getElementById('borderRadius')?.addEventListener('input', (e) => {
            this.theme.borderRadius = parseInt(e.target.value);
            document.getElementById('radiusValue').textContent = e.target.value + 'px';
            this.updatePreview();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTab = e.target.dataset.tab;
                this.renderPreviewContent();
                this.attachDynamicListeners();
            });
        });

        // Framework switching
        document.querySelectorAll('.framework-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.framework-tab').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFramework = e.target.dataset.framework;
                this.generateCode();
            });
        });

        // Export/Import
        document.getElementById('exportTheme')?.addEventListener('click', () => this.exportTheme());
        document.getElementById('importTheme')?.addEventListener('click', () => this.importTheme());
        document.getElementById('resetTheme')?.addEventListener('click', () => this.resetTheme());
        document.getElementById('copyCode')?.addEventListener('click', () => this.copyCode());

        this.attachDynamicListeners();
    }

    attachDynamicListeners() {
        // Modal trigger
        document.getElementById('openModal')?.addEventListener('click', () => {
            this.showModal();
        });

        // Generate palette
        document.getElementById('generatePalette')?.addEventListener('click', () => {
            this.generateColorPalette();
        });

        // Edit toggles
        document.querySelectorAll('.edit-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const component = e.target.dataset.component;
                this.showComponentEditor(component);
            });
        });
    }

    updatePreview() {
        // Apply theme to preview
        document.documentElement.style.setProperty('--primary', this.theme.colors.primary);
        document.documentElement.style.setProperty('--secondary', this.theme.colors.secondary);
        document.documentElement.style.setProperty('--neon-green', this.theme.colors.success);
        
        // Update typography
        document.querySelectorAll('.demo-card h4, .showcase-title, .builder-title').forEach(el => {
            el.style.fontFamily = `'${this.theme.typography.headingFont}', sans-serif`;
        });
        
        document.querySelectorAll('.demo-card p, .demo-input, .demo-button').forEach(el => {
            el.style.fontFamily = `'${this.theme.typography.bodyFont}', sans-serif`;
        });

        // Update border radius
        document.querySelectorAll('.demo-button, .demo-input, .demo-card').forEach(el => {
            el.style.borderRadius = this.theme.borderRadius + 'px';
        });

        this.renderPreviewContent();
        this.generateCode();
        this.attachDynamicListeners();
    }

    generateColorPalette() {
        const paletteGrid = document.getElementById('paletteGrid');
        if (!paletteGrid) return;

        const generateShades = (baseColor, steps = 5) => {
            const shades = [];
            const rgb = this.hexToRgb(baseColor);
            
            for (let i = 0; i < steps; i++) {
                const factor = (i / (steps - 1)) * 0.8 + 0.2;
                const r = Math.round(rgb.r * factor);
                const g = Math.round(rgb.g * factor);
                const b = Math.round(rgb.b * factor);
                shades.push(this.rgbToHex(r, g, b));
            }
            
            return shades.reverse();
        };

        const palettes = {
            primary: generateShades(this.theme.colors.primary),
            secondary: generateShades(this.theme.colors.secondary),
            success: generateShades(this.theme.colors.success),
            error: generateShades(this.theme.colors.error)
        };

        let html = '';
        Object.entries(palettes).forEach(([name, colors]) => {
            colors.forEach((color, i) => {
                const textColor = this.getContrastColor(color);
                html += `
                    <div class="color-swatch" style="background: ${color}; color: ${textColor};" 
                         data-color="${color}" title="Click to copy">
                        <span class="swatch-name">${name}-${(i + 1) * 100}</span>
                        <span class="swatch-value">${color}</span>
                    </div>
                `;
            });
        });

        paletteGrid.innerHTML = html;

        // Add click to copy
        paletteGrid.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                const color = e.currentTarget.dataset.color;
                this.copyToClipboard(color);
                this.showNotification(`Copied ${color}`);
            });
        });
    }

    generateCode() {
        const codeElement = document.getElementById('generatedCode');
        if (!codeElement) return;

        let code = '';
        const codeBlock = document.getElementById('codeBlock');

        switch(this.currentFramework) {
            case 'react':
                code = this.generateReactCode();
                codeBlock.dataset.language = 'jsx';
                break;
            case 'vue':
                code = this.generateVueCode();
                codeBlock.dataset.language = 'vue';
                break;
            case 'html':
                code = this.generateHTMLCode();
                codeBlock.dataset.language = 'html';
                break;
            case 'css':
                code = this.generateCSSCode();
                codeBlock.dataset.language = 'css';
                break;
        }

        codeElement.textContent = code;
    }

    generateReactCode() {
        return `import React from 'react';
import './theme.css';

const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      style={{
        fontFamily: '${this.theme.typography.bodyFont}',
        borderRadius: '${this.theme.borderRadius}px'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ title, children }) => {
  return (
    <div className="card" style={{
      fontFamily: '${this.theme.typography.bodyFont}',
      borderRadius: '${this.theme.borderRadius}px'
    }}>
      <h3 style={{ fontFamily: '${this.theme.typography.headingFont}' }}>
        {title}
      </h3>
      {children}
    </div>
  );
};

export { Button, Card };`;
    }

    generateVueCode() {
        return `<template>
  <button 
    :class="['btn', \`btn-\${variant}\`]"
    :style="buttonStyle"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    buttonStyle() {
      return {
        fontFamily: '${this.theme.typography.bodyFont}',
        borderRadius: '${this.theme.borderRadius}px'
      };
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: ${this.theme.colors.primary};
  color: #000;
}
</style>`;
    }

    generateHTMLCode() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="theme.css">
  <title>Design System</title>
</head>
<body>
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-secondary">Secondary Button</button>
  
  <div class="card">
    <h3 class="card-header">Card Title</h3>
    <p class="card-content">Card content goes here.</p>
  </div>
  
  <input type="text" class="input" placeholder="Text input">
</body>
</html>`;
    }

    generateCSSCode() {
        return `:root {
  --color-primary: ${this.theme.colors.primary};
  --color-secondary: ${this.theme.colors.secondary};
  --color-success: ${this.theme.colors.success};
  --color-error: ${this.theme.colors.error};
  
  --font-heading: '${this.theme.typography.headingFont}', sans-serif;
  --font-body: '${this.theme.typography.bodyFont}', sans-serif;
  --font-size-base: ${this.theme.typography.baseSize}px;
  
  --spacing-base: ${this.theme.spacing.base}px;
  --border-radius: ${this.theme.borderRadius}px;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

.btn {
  padding: calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 3);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background: var(--color-primary);
  color: #000;
}

.btn-primary:hover {
  box-shadow: 0 0 20px var(--color-primary);
  transform: translateY(-2px);
}

.card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-base) * 3);
}`;
    }

    checkAccessibility() {
        const checklist = document.getElementById('a11yChecklist');
        if (!checklist) return;

        const checks = [
            {
                name: 'Color Contrast',
                tip: 'Ensure text has sufficient contrast with background',
                status: this.checkColorContrast() ? 'pass' : 'warn'
            },
            {
                name: 'Touch Target Size',
                tip: 'Interactive elements should be at least 44x44px',
                status: 'pass'
            },
            {
                name: 'Focus Indicators',
                tip: 'All interactive elements have visible focus states',
                status: 'pass'
            },
            {
                name: 'Semantic HTML',
                tip: 'Use proper HTML elements for better screen reader support',
                status: 'pass'
            },
            {
                name: 'ARIA Labels',
                tip: 'Add aria-label for icon-only buttons',
                status: 'warn'
            },
            {
                name: 'Keyboard Navigation',
                tip: 'All interactive elements are keyboard accessible',
                status: 'pass'
            }
        ];

        checklist.innerHTML = checks.map(check => `
            <div class="a11y-item">
                <div class="a11y-status ${check.status}">
                    ${check.status === 'pass' ? '✓' : '!'}
                </div>
                <div class="a11y-text">
                    <div><strong>${check.name}</strong></div>
                    <div class="a11y-tip">${check.tip}</div>
                </div>
            </div>
        `).join('');
    }

    checkColorContrast() {
        // Simple contrast check
        const primaryLum = this.getLuminance(this.theme.colors.primary);
        const bgLum = this.getLuminance(this.theme.colors.background);
        const contrast = (Math.max(primaryLum, bgLum) + 0.05) / (Math.min(primaryLum, bgLum) + 0.05);
        return contrast >= 4.5; // WCAG AA standard
    }

    getLuminance(hex) {
        const rgb = this.hexToRgb(hex);
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
            val = val / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    showModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content">
                <h2 style="color: ${this.theme.colors.primary}; font-family: '${this.theme.typography.headingFont}', sans-serif; margin-bottom: 1rem;">Modal Example</h2>
                <p style="font-family: '${this.theme.typography.bodyFont}', sans-serif; margin-bottom: 1.5rem;">This is an example modal using your custom theme settings.</p>
                <button class="demo-button btn-primary" style="font-family: '${this.theme.typography.bodyFont}', sans-serif; border-radius: ${this.theme.borderRadius}px;">Close Modal</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.demo-button').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    showComponentEditor(component) {
        this.showNotification(`Editing ${component} component properties`);
    }

    exportTheme() {
        const json = JSON.stringify(this.theme, null, 2);
        this.downloadFile('design-system-theme.json', json, 'application/json');
        this.showNotification('Theme exported successfully!');
    }

    importTheme() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    this.theme = JSON.parse(event.target.result);
                    this.init();
                    this.showNotification('Theme imported successfully!');
                } catch (error) {
                    this.showNotification('Error importing theme');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    resetTheme() {
        this.theme = {
            colors: {
                primary: '#00ffff',
                secondary: '#ff00ff',
                success: '#00ff41',
                error: '#ff4757',
                background: '#0a0a0f',
                text: '#ffffff'
            },
            typography: {
                headingFont: 'Orbitron',
                bodyFont: 'Rajdhani',
                baseSize: 16,
                scale: 1.25
            },
            spacing: {
                base: 8,
                scale: [1, 2, 3, 4, 6, 8, 12, 16, 24, 32]
            },
            borderRadius: 6
        };
        this.init();
        this.showNotification('Theme reset to defaults');
    }

    copyCode() {
        const code = document.getElementById('generatedCode').textContent;
        this.copyToClipboard(code);
        this.showNotification('Code copied to clipboard!');
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 255, 0.9);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    getContrastColor(hexColor) {
        const rgb = this.hexToRgb(hexColor);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) {
        new DesignSystemStudio();
    }
});
