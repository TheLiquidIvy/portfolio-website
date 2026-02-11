// Task Matrix - Kanban Board JavaScript

// Mock task data
let tasks = [
    { id: 1, title: 'Design system audit', description: 'Review and update design tokens for consistency', status: 'todo', priority: 'high', progress: 0, tags: ['Design', 'UX'], assignee: 'AM' },
    { id: 2, title: 'API documentation', description: 'Write comprehensive endpoint docs', status: 'todo', priority: 'medium', progress: 0, tags: ['Docs'], assignee: 'JD' },
    { id: 3, title: 'Update dependencies', description: 'Bump packages to latest versions', status: 'todo', priority: 'low', progress: 0, tags: ['Maintenance'], assignee: 'SK' },
    { id: 4, title: 'User authentication flow', description: 'Implement OAuth 2.0 authentication', status: 'todo', priority: 'high', progress: 0, tags: ['Backend', 'Security'], assignee: 'TK' },
    { id: 5, title: 'Drag-and-drop polish', description: 'Improve visual feedback during drag operations', status: 'progress', priority: 'high', progress: 65, tags: ['Frontend', 'UX'], assignee: 'MS' },
    { id: 6, title: 'Sprint retrospective', description: 'Prepare slides and metrics', status: 'progress', priority: 'medium', progress: 40, tags: ['Team'], assignee: 'RL' },
    { id: 7, title: 'Database optimization', description: 'Add indexes to improve query performance', status: 'progress', priority: 'medium', progress: 80, tags: ['Backend', 'Performance'], assignee: 'DW' },
    { id: 8, title: 'Accessibility audit', description: 'WCAG 2.1 compliance check completed', status: 'done', priority: 'high', progress: 100, tags: ['A11y', 'QA'], assignee: 'TK' },
    { id: 9, title: 'Performance optimization', description: 'Reduced bundle size by 30%', status: 'done', priority: 'medium', progress: 100, tags: ['Performance'], assignee: 'DW' },
    { id: 10, title: 'Dark mode implementation', description: 'Added theme toggle with persistence', status: 'done', priority: 'low', progress: 100, tags: ['Frontend', 'UX'], assignee: 'MS' }
];

let currentView = 'kanban';
let draggedTask = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderKanban();
    renderListView();
    updateStats();
    initializeEventListeners();
});

// Render Kanban View
function renderKanban() {
    const columns = ['todo', 'progress', 'done'];
    
    columns.forEach(columnId => {
        const column = document.querySelector(`[data-column="${columnId}"] .task-list`);
        if (!column) return;
        
        column.innerHTML = '';
        const columnTasks = tasks.filter(task => task.status === columnId);
        
        columnTasks.forEach(task => {
            const card = createTaskCard(task);
            column.appendChild(card);
        });
        
        // Update count
        const countEl = document.querySelector(`[data-column="${columnId}"] .column-count`);
        if (countEl) countEl.textContent = columnTasks.length;
    });
}

// Create Task Card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority}`;
    card.draggable = true;
    card.dataset.taskId = task.id;
    
    card.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
        </div>
        <div class="task-description">${task.description}</div>
        ${task.progress > 0 ? `
        <div class="task-progress">
            <div class="progress-header">
                <span class="progress-label">Progress</span>
                <span class="progress-percentage">${task.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${task.progress}%"></div>
            </div>
        </div>
        ` : ''}
        <div class="task-meta">
            <div class="task-tags">
                ${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}
            </div>
            <div class="task-assignee">${task.assignee}</div>
        </div>
    `;
    
    // Drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Render List View
function renderListView() {
    const tbody = document.querySelector('.list-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = tasks.map(task => `
        <tr>
            <td><strong>${task.title}</strong></td>
            <td><span class="task-priority priority-${task.priority}">${task.priority}</span></td>
            <td>${task.status.replace('progress', 'In Progress').replace('todo', 'To Do').replace('done', 'Done')}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div class="progress-bar" style="width: 100px; height: 6px;">
                        <div class="progress-fill" style="width: ${task.progress}%"></div>
                    </div>
                    <span style="font-size: 0.85rem; color: var(--primary); font-family: 'Orbitron', monospace;">${task.progress}%</span>
                </div>
            </td>
            <td>${task.tags.join(', ')}</td>
            <td><div class="task-assignee" style="margin: 0;">${task.assignee}</div></td>
        </tr>
    `).join('');
}

// Update Statistics
function updateStats() {
    const totalTasks = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'progress').length;
    const completed = tasks.filter(t => t.status === 'done').length;
    
    const stats = {
        'stat-total': totalTasks,
        'stat-progress': inProgress,
        'stat-done': completed
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

// Drag and Drop Handlers
function handleDragStart(e) {
    draggedTask = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedTask = null;
    
    // Remove all drag-over classes
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (e.target.classList.contains('kanban-column') || e.target.closest('.kanban-column')) {
        const column = e.target.classList.contains('kanban-column') 
            ? e.target 
            : e.target.closest('.kanban-column');
        column.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('kanban-column')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    
    const column = e.target.classList.contains('kanban-column') 
        ? e.target 
        : e.target.closest('.kanban-column');
        
    if (column && draggedTask) {
        const newStatus = column.dataset.column;
        const taskId = parseInt(draggedTask.dataset.taskId);
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            const oldStatus = task.status;
            task.status = newStatus;
            
            // Update progress based on status
            if (newStatus === 'done' && task.progress < 100) {
                task.progress = 100;
                triggerConfetti();
            } else if (newStatus === 'progress' && task.progress === 0) {
                task.progress = 25;
            } else if (newStatus === 'todo') {
                task.progress = 0;
            }
            
            renderKanban();
            renderListView();
            updateStats();
            
            // Show notification
            if (oldStatus !== newStatus) {
                showNotification(`Task moved to ${newStatus.replace('progress', 'In Progress').replace('todo', 'To Do').replace('done', 'Done')}!`);
            }
        }
    }
    
    column?.classList.remove('drag-over');
    return false;
}

// Initialize Event Listeners
function initializeEventListeners() {
    // View Toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
    
    // Add Task Button
    const addBtn = document.getElementById('add-task-btn');
    if (addBtn) {
        addBtn.addEventListener('click', addNewTask);
    }
    
    // Column Drag and Drop
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });
    
    // Task List Drag and Drop
    document.querySelectorAll('.task-list').forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
    });
}

// Switch View
function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    const kanbanView = document.getElementById('kanban-view');
    const listView = document.getElementById('list-view');
    
    if (view === 'kanban') {
        kanbanView?.classList.add('active');
        listView?.classList.remove('active');
        kanbanView.style.display = 'grid';
        listView.style.display = 'none';
    } else {
        kanbanView?.classList.remove('active');
        listView?.classList.add('active');
        kanbanView.style.display = 'none';
        listView.style.display = 'block';
    }
}

// Add New Task
function addNewTask() {
    const newTask = {
        id: tasks.length + 1,
        title: `New Task ${tasks.length + 1}`,
        description: 'Click to edit task description',
        status: 'todo',
        priority: 'medium',
        progress: 0,
        tags: ['New'],
        assignee: 'YOU'
    };
    
    tasks.unshift(newTask);
    renderKanban();
    renderListView();
    updateStats();
    showNotification('New task created!');
}

// Confetti Animation
function triggerConfetti() {
    const colors = ['#00ffff', '#ff00ff', '#00ff41', '#ff00aa'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
        border: 1px solid var(--primary);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: var(--text);
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
        box-shadow: 0 8px 30px rgba(0, 255, 255, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-save simulation
setInterval(() => {
    // Simulate auto-save
    console.log('Auto-saved tasks:', tasks.length);
}, 30000);
