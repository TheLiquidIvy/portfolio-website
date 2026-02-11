// Portfolio Builder - Main JavaScript

// State
let selectedBlock = null;
let blocks = [];
let blockIdCounter = 0;

// Component templates
const componentTemplates = {
    hero: {
        icon: '🎯',
        name: 'Hero Section',
        html: '<div class="block-content"><h1 class="block-title">Welcome to My Portfolio</h1><p class="block-text">I\'m a creative developer building amazing digital experiences.</p></div>'
    },
    about: {
        icon: '👤',
        name: 'About Section',
        html: '<div class="block-content"><h2 class="block-title">About Me</h2><p class="block-text">Passionate developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real problems.</p></div>'
    },
    projects: {
        icon: '💼',
        name: 'Project Grid',
        html: '<div class="block-content"><h2 class="block-title">My Projects</h2><div class="block-grid"><div class="block-grid-item">📱</div><div class="block-grid-item">💻</div><div class="block-grid-item">🎮</div></div></div>'
    },
    skills: {
        icon: '⚡',
        name: 'Skills List',
        html: '<div class="block-content"><h2 class="block-title">Technical Skills</h2><p class="block-text">JavaScript • React • Node.js • Python • CSS • HTML • Git • MongoDB</p></div>'
    },
    contact: {
        icon: '📧',
        name: 'Contact Form',
        html: '<div class="block-content"><h2 class="block-title">Get In Touch</h2><p class="block-text">Name, Email, Message fields would go here.</p></div>'
    },
    testimonial: {
        icon: '💬',
        name: 'Testimonial',
        html: '<div class="block-content"><p class="block-text">"An exceptional developer who delivers high-quality work on time."</p><p class="block-text" style="margin-top: 0.5rem; color: var(--primary);">- Client Name</p></div>'
    },
    gallery: {
        icon: '🖼️',
        name: 'Image Gallery',
        html: '<div class="block-content"><h2 class="block-title">Gallery</h2><div class="block-grid"><div class="block-grid-item">🌆</div><div class="block-grid-item">🎨</div><div class="block-grid-item">📸</div></div></div>'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeComponentList();
    initializeCanvasDragDrop();
    initializeToolbarButtons();
    initializeTemplates();
    updatePropertiesPanel();
});

// Initialize component list
function initializeComponentList() {
    Object.entries(componentTemplates).forEach(([key, component]) => {
        const item = document.querySelector(`.component-item[data-component="${key}"]`);
        if (item) {
            item.draggable = true;
            item.addEventListener('dragstart', handleComponentDragStart);
            item.addEventListener('dragend', handleComponentDragEnd);
        }
    });
}

// Canvas drag and drop
function initializeCanvasDragDrop() {
    const canvas = document.getElementById('canvas-area');
    if (!canvas) return;
    
    canvas.addEventListener('dragover', handleCanvasDragOver);
    canvas.addEventListener('dragleave', handleCanvasDragLeave);
    canvas.addEventListener('drop', handleCanvasDrop);
}

// Component drag handlers
function handleComponentDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('component', e.target.dataset.component);
    e.target.style.opacity = '0.5';
}

function handleComponentDragEnd(e) {
    e.target.style.opacity = '1';
}

// Canvas drag handlers
function handleCanvasDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    document.getElementById('canvas-area').classList.add('drag-over');
}

function handleCanvasDragLeave(e) {
    if (e.target.id === 'canvas-area') {
        e.target.classList.remove('drag-over');
    }
}

function handleCanvasDrop(e) {
    e.preventDefault();
    const canvas = document.getElementById('canvas-area');
    canvas.classList.remove('drag-over');
    
    const componentType = e.dataTransfer.getData('component');
    if (componentType && componentTemplates[componentType]) {
        addBlock(componentType);
        showToast(`${componentTemplates[componentType].name} added!`);
    }
}

// Add block to canvas
function addBlock(componentType) {
    const template = componentTemplates[componentType];
    const block = {
        id: ++blockIdCounter,
        type: componentType,
        html: template.html,
        styles: {
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.05))',
            padding: '1.5rem',
            borderRadius: '12px'
        }
    };
    
    blocks.push(block);
    renderBlocks();
    selectBlock(block.id);
}

// Render all blocks
function renderBlocks() {
    const canvas = document.getElementById('canvas-area');
    const placeholder = document.querySelector('.canvas-placeholder');
    
    if (blocks.length === 0) {
        if (placeholder) placeholder.style.display = 'block';
        return;
    }
    
    if (placeholder) placeholder.style.display = 'none';
    
    // Clear existing blocks
    document.querySelectorAll('.canvas-block').forEach(block => block.remove());
    
    // Render each block
    blocks.forEach((block, index) => {
        const blockEl = document.createElement('div');
        blockEl.className = 'canvas-block';
        if (selectedBlock && selectedBlock.id === block.id) {
            blockEl.classList.add('selected');
        }
        blockEl.dataset.blockId = block.id;
        blockEl.draggable = true;
        
        blockEl.innerHTML = `
            <div class="block-handle">⋮⋮</div>
            <div class="block-controls">
                <button class="block-control-btn move-up" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="block-control-btn move-down" ${index === blocks.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="block-control-btn delete">✕</button>
            </div>
            ${block.html}
        `;
        
        // Apply styles
        Object.entries(block.styles).forEach(([prop, value]) => {
            blockEl.style[prop] = value;
        });
        
        // Event listeners
        blockEl.addEventListener('click', (e) => {
            if (!e.target.classList.contains('block-control-btn')) {
                selectBlock(block.id);
            }
        });
        
        blockEl.addEventListener('dragstart', handleBlockDragStart);
        blockEl.addEventListener('dragover', handleBlockDragOver);
        blockEl.addEventListener('drop', handleBlockDrop);
        blockEl.addEventListener('dragend', handleBlockDragEnd);
        
        // Control buttons
        blockEl.querySelector('.move-up')?.addEventListener('click', () => moveBlock(block.id, -1));
        blockEl.querySelector('.move-down')?.addEventListener('click', () => moveBlock(block.id, 1));
        blockEl.querySelector('.delete').addEventListener('click', () => deleteBlock(block.id));
        
        canvas.appendChild(blockEl);
    });
}

// Block reordering
let draggedBlockId = null;

function handleBlockDragStart(e) {
    draggedBlockId = parseInt(e.target.dataset.blockId);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleBlockDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleBlockDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetBlockId = parseInt(e.target.closest('.canvas-block')?.dataset.blockId);
    
    if (draggedBlockId && targetBlockId && draggedBlockId !== targetBlockId) {
        const draggedIndex = blocks.findIndex(b => b.id === draggedBlockId);
        const targetIndex = blocks.findIndex(b => b.id === targetBlockId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
            const [removed] = blocks.splice(draggedIndex, 1);
            blocks.splice(targetIndex, 0, removed);
            renderBlocks();
            showToast('Block reordered!');
        }
    }
}

function handleBlockDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedBlockId = null;
}

// Move block up/down
function moveBlock(blockId, direction) {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return;
    
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
    renderBlocks();
    showToast('Block moved!');
}

// Delete block
function deleteBlock(blockId) {
    if (confirm('Delete this block?')) {
        blocks = blocks.filter(b => b.id !== blockId);
        if (selectedBlock && selectedBlock.id === blockId) {
            selectedBlock = null;
        }
        renderBlocks();
        updatePropertiesPanel();
        showToast('Block deleted!');
    }
}

// Select block
function selectBlock(blockId) {
    selectedBlock = blocks.find(b => b.id === blockId);
    renderBlocks();
    updatePropertiesPanel();
}

// Update properties panel
function updatePropertiesPanel() {
    const panel = document.getElementById('properties-panel');
    if (!panel) return;
    
    if (!selectedBlock) {
        panel.innerHTML = `
            <div class="properties-title">Properties</div>
            <p style="color: var(--text-dim); text-align: center; padding: 2rem;">
                Select a block to edit its properties
            </p>
        `;
        return;
    }
    
    panel.innerHTML = `
        <div class="properties-title">Block Properties</div>
        
        <div class="property-group">
            <label class="property-label">Background Color</label>
            <input type="color" class="property-input property-color" id="prop-bg" value="#00ffff">
        </div>
        
        <div class="property-group">
            <label class="property-label">Text Color</label>
            <input type="color" class="property-input property-color" id="prop-text" value="#ffffff">
        </div>
        
        <div class="property-group">
            <label class="property-label">Padding</label>
            <input type="range" class="property-input property-range" id="prop-padding" min="8" max="48" value="24">
            <span style="color: var(--text-dim); font-size: 0.9rem;">24px</span>
        </div>
        
        <div class="property-group">
            <label class="property-label">Border Radius</label>
            <input type="range" class="property-input property-range" id="prop-radius" min="0" max="32" value="12">
            <span style="color: var(--text-dim); font-size: 0.9rem;">12px</span>
        </div>
        
        <div class="property-group">
            <label class="property-label">Animation</label>
            <select class="property-input property-select" id="prop-animation">
                <option value="none">None</option>
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="scale">Scale</option>
            </select>
        </div>
    `;
    
    // Add event listeners for property changes
    document.getElementById('prop-bg')?.addEventListener('input', (e) => {
        const hex = e.target.value;
        selectedBlock.styles.background = `linear-gradient(135deg, ${hex}33, ${hex}11)`;
        renderBlocks();
    });
    
    document.getElementById('prop-text')?.addEventListener('input', (e) => {
        selectedBlock.styles.color = e.target.value;
        renderBlocks();
    });
    
    document.getElementById('prop-padding')?.addEventListener('input', (e) => {
        selectedBlock.styles.padding = `${e.target.value}px`;
        e.target.nextElementSibling.textContent = `${e.target.value}px`;
        renderBlocks();
    });
    
    document.getElementById('prop-radius')?.addEventListener('input', (e) => {
        selectedBlock.styles.borderRadius = `${e.target.value}px`;
        e.target.nextElementSibling.textContent = `${e.target.value}px`;
        renderBlocks();
    });
}

// Toolbar buttons
function initializeToolbarButtons() {
    document.getElementById('btn-save')?.addEventListener('click', savePortfolio);
    document.getElementById('btn-preview')?.addEventListener('click', previewPortfolio);
    document.getElementById('btn-export')?.addEventListener('click', exportPortfolio);
    document.getElementById('btn-clear')?.addEventListener('click', clearCanvas);
}

function savePortfolio() {
    localStorage.setItem('portfolio-builder', JSON.stringify(blocks));
    showToast('Portfolio saved!');
}

function previewPortfolio() {
    const overlay = document.getElementById('preview-overlay');
    if (!overlay) return;
    
    const content = document.getElementById('preview-content');
    content.innerHTML = blocks.map(block => {
        const div = document.createElement('div');
        div.innerHTML = block.html;
        Object.entries(block.styles).forEach(([prop, value]) => {
            div.style[prop] = value;
        });
        div.style.marginBottom = '2rem';
        return div.outerHTML;
    }).join('');
    
    overlay.classList.add('active');
}

function exportPortfolio() {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 2rem; background: #0a0a0f; color: white; }
        .section { margin-bottom: 2rem; }
    </style>
</head>
<body>
${blocks.map(block => {
    let styles = Object.entries(block.styles).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ');
    return `    <div class="section" style="${styles}">${block.html}</div>`;
}).join('\n')}
</body>
</html>
    `.trim();
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Portfolio exported!');
}

function clearCanvas() {
    if (confirm('Clear all blocks? This cannot be undone.')) {
        blocks = [];
        selectedBlock = null;
        renderBlocks();
        updatePropertiesPanel();
        showToast('Canvas cleared!');
    }
}

// Templates
function initializeTemplates() {
    document.querySelectorAll('.template-item').forEach(item => {
        item.addEventListener('click', () => {
            const template = item.dataset.template;
            loadTemplate(template);
        });
    });
}

function loadTemplate(templateName) {
    const templates = {
        minimal: ['hero', 'about', 'contact'],
        standard: ['hero', 'about', 'projects', 'skills', 'contact'],
        creative: ['hero', 'projects', 'gallery', 'testimonial', 'contact']
    };
    
    if (templates[templateName]) {
        blocks = [];
        templates[templateName].forEach(component => addBlock(component));
        showToast(`${templateName.charAt(0).toUpperCase() + templateName.slice(1)} template loaded!`);
    }
}

// Close preview
document.getElementById('close-preview')?.addEventListener('click', () => {
    document.getElementById('preview-overlay')?.classList.remove('active');
});

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Load saved portfolio on startup
const saved = localStorage.getItem('portfolio-builder');
if (saved) {
    try {
        blocks = JSON.parse(saved);
        blockIdCounter = Math.max(...blocks.map(b => b.id), 0);
        renderBlocks();
    } catch (e) {
        console.error('Failed to load saved portfolio');
    }
}
