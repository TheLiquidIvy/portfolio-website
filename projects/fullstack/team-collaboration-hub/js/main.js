// Team Collaboration Hub JavaScript
class CollaborationHub {
    constructor() {
        this.currentChannel = 'general';
        this.currentTab = 'chat';
        this.messages = this.generateMessages();
        this.teamMembers = this.generateTeamMembers();
        this.tasks = this.generateTasks();
        this.files = this.generateFiles();
        
        // Whiteboard state
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.currentTool = 'pen';
        this.currentColor = '#00ffff';
        this.lineWidth = 3;
        
        this.init();
    }

    generateMessages() {
        return {
            general: [
                { author: 'Alex Chen', avatar: '👨‍💻', text: 'Hey team! Just pushed the new feature to staging.', time: '10:23 AM' },
                { author: 'Sarah Parker', avatar: '👩‍💼', text: 'Great work! I\'ll review it this afternoon.', time: '10:25 AM' },
                { author: 'Mike Johnson', avatar: '👨‍🎨', text: 'The UI looks amazing! Love the animations.', time: '10:30 AM' }
            ],
            development: [
                { author: 'Alex Chen', avatar: '👨‍💻', text: 'Working on the API integration now.', time: '9:15 AM' },
                { author: 'Emma Davis', avatar: '👩‍💻', text: 'I can help with the database queries if needed.', time: '9:20 AM' }
            ],
            design: [
                { author: 'Mike Johnson', avatar: '👨‍🎨', text: 'New mockups are ready for review!', time: '8:45 AM' },
                { author: 'Sarah Parker', avatar: '👩‍💼', text: 'Looking forward to seeing them.', time: '8:50 AM' }
            ]
        };
    }

    generateTeamMembers() {
        return [
            { name: 'Alex Chen', avatar: '👨‍💻', status: 'online', role: 'Developer' },
            { name: 'Sarah Parker', avatar: '👩‍💼', status: 'online', role: 'Product Manager' },
            { name: 'Mike Johnson', avatar: '👨‍🎨', status: 'away', role: 'Designer' },
            { name: 'Emma Davis', avatar: '👩‍💻', status: 'online', role: 'Backend Dev' },
            { name: 'Chris Lee', avatar: '👨‍🔧', status: 'offline', role: 'DevOps' },
            { name: 'Lisa Wang', avatar: '👩‍🎨', status: 'online', role: 'UX Designer' }
        ];
    }

    generateTasks() {
        return {
            todo: [
                {
                    id: 1,
                    title: 'Design System Update',
                    description: 'Update component library with new design tokens',
                    assignee: 'Mike',
                    priority: 'high'
                },
                {
                    id: 2,
                    title: 'API Documentation',
                    description: 'Complete REST API documentation',
                    assignee: 'Alex',
                    priority: 'medium'
                }
            ],
            'in-progress': [
                {
                    id: 3,
                    title: 'User Dashboard',
                    description: 'Implement new analytics dashboard',
                    assignee: 'Emma',
                    priority: 'high'
                },
                {
                    id: 4,
                    title: 'Mobile Responsive',
                    description: 'Fix responsive issues on tablet',
                    assignee: 'Sarah',
                    priority: 'medium'
                }
            ],
            done: [
                {
                    id: 5,
                    title: 'Login System',
                    description: 'Implement OAuth authentication',
                    assignee: 'Alex',
                    priority: 'high'
                },
                {
                    id: 6,
                    title: 'Performance Audit',
                    description: 'Optimize bundle size',
                    assignee: 'Chris',
                    priority: 'low'
                }
            ]
        };
    }

    generateFiles() {
        return [
            { name: 'Project_Proposal.pdf', icon: '📄', size: '2.4 MB', uploader: 'Sarah', time: '2 hours ago' },
            { name: 'Design_Mockups.fig', icon: '🎨', size: '15.8 MB', uploader: 'Mike', time: '5 hours ago' },
            { name: 'API_Specs.json', icon: '📋', size: '124 KB', uploader: 'Alex', time: '1 day ago' },
            { name: 'User_Research.xlsx', icon: '📊', size: '3.2 MB', uploader: 'Lisa', time: '2 days ago' }
        ];
    }

    init() {
        this.render();
        this.startRealtimeUpdates();
    }

    render() {
        const app = document.getElementById('collab-app');
        app.innerHTML = `
            <div class="collab-container">
                ${this.renderChannelsSidebar()}
                ${this.renderMainContent()}
                ${this.renderTeamSidebar()}
            </div>
        `;

        // Initialize canvas if whiteboard tab is active
        if (this.currentTab === 'whiteboard') {
            this.initCanvas();
        }
    }

    renderChannelsSidebar() {
        const channels = [
            { id: 'general', icon: '💬', name: 'General' },
            { id: 'development', icon: '💻', name: 'Development' },
            { id: 'design', icon: '🎨', name: 'Design' },
            { id: 'marketing', icon: '📢', name: 'Marketing' },
            { id: 'random', icon: '🎲', name: 'Random' }
        ];

        return `
            <aside class="channels-sidebar">
                <h3>📱 Channels</h3>
                <ul class="channel-list">
                    ${channels.map(channel => `
                        <li class="channel-item ${this.currentChannel === channel.id ? 'active' : ''}"
                            onclick="collabHub.switchChannel('${channel.id}')">
                            <span class="channel-icon">${channel.icon}</span>
                            <span>${channel.name}</span>
                        </li>
                    `).join('')}
                </ul>
            </aside>
        `;
    }

    renderMainContent() {
        return `
            <main class="main-content">
                <div class="content-tabs">
                    <button class="tab-btn ${this.currentTab === 'chat' ? 'active' : ''}" 
                            onclick="collabHub.switchTab('chat')">💬 Chat</button>
                    <button class="tab-btn ${this.currentTab === 'whiteboard' ? 'active' : ''}" 
                            onclick="collabHub.switchTab('whiteboard')">✏️ Whiteboard</button>
                    <button class="tab-btn ${this.currentTab === 'tasks' ? 'active' : ''}" 
                            onclick="collabHub.switchTab('tasks')">✅ Tasks</button>
                    <button class="tab-btn ${this.currentTab === 'files' ? 'active' : ''}" 
                            onclick="collabHub.switchTab('files')">📁 Files</button>
                </div>
                <div class="tab-content">
                    ${this.renderTabContent()}
                </div>
            </main>
        `;
    }

    renderTabContent() {
        switch(this.currentTab) {
            case 'chat':
                return this.renderChat();
            case 'whiteboard':
                return this.renderWhiteboard();
            case 'tasks':
                return this.renderKanban();
            case 'files':
                return this.renderFiles();
            default:
                return this.renderChat();
        }
    }

    renderChat() {
        const channelMessages = this.messages[this.currentChannel] || [];
        return `
            <div class="chat-messages" id="chat-messages">
                ${channelMessages.map(msg => `
                    <div class="message">
                        <div class="message-avatar">${msg.avatar}</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-author">${msg.author}</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" id="chat-input" 
                       placeholder="Type your message..." 
                       onkeypress="if(event.key==='Enter') collabHub.sendMessage()">
                <button class="send-btn" onclick="collabHub.sendMessage()">Send</button>
            </div>
        `;
    }

    renderWhiteboard() {
        return `
            <div class="whiteboard-container">
                <div class="whiteboard-tools">
                    <button class="tool-btn ${this.currentTool === 'pen' ? 'active' : ''}" 
                            onclick="collabHub.setTool('pen')">✏️ Pen</button>
                    <button class="tool-btn ${this.currentTool === 'eraser' ? 'active' : ''}" 
                            onclick="collabHub.setTool('eraser')">🧹 Eraser</button>
                    <button class="tool-btn ${this.currentTool === 'line' ? 'active' : ''}" 
                            onclick="collabHub.setTool('line')">📏 Line</button>
                    <button class="tool-btn ${this.currentTool === 'circle' ? 'active' : ''}" 
                            onclick="collabHub.setTool('circle')">⭕ Circle</button>
                    <button class="tool-btn ${this.currentTool === 'rectangle' ? 'active' : ''}" 
                            onclick="collabHub.setTool('rectangle')">▭ Rectangle</button>
                    <div class="color-picker">
                        ${this.renderColorPicker()}
                    </div>
                    <button class="tool-btn" onclick="collabHub.clearCanvas()">🗑️ Clear</button>
                </div>
                <canvas id="whiteboard" width="800" height="500"></canvas>
            </div>
        `;
    }

    renderColorPicker() {
        const colors = ['#00ffff', '#ff00ff', '#00ff41', '#ffff00', '#ff0055', '#ffffff'];
        return colors.map(color => `
            <div class="color-btn ${this.currentColor === color ? 'active' : ''}" 
                 style="background: ${color}" 
                 onclick="collabHub.setColor('${color}')"></div>
        `).join('');
    }

    renderKanban() {
        return `
            <div class="kanban-container">
                <div class="kanban-board">
                    ${this.renderKanbanColumn('todo', 'To Do')}
                    ${this.renderKanbanColumn('in-progress', 'In Progress')}
                    ${this.renderKanbanColumn('done', 'Done')}
                </div>
            </div>
        `;
    }

    renderKanbanColumn(status, title) {
        const tasks = this.tasks[status] || [];
        return `
            <div class="kanban-column ${status}">
                <div class="kanban-header">
                    <span class="kanban-title">${title}</span>
                    <span class="task-count">${tasks.length}</span>
                </div>
                <div class="task-list">
                    ${tasks.map(task => this.renderTaskCard(task)).join('')}
                </div>
            </div>
        `;
    }

    renderTaskCard(task) {
        return `
            <div class="task-card" draggable="true">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
                <div class="task-meta">
                    <span class="task-assignee">👤 ${task.assignee}</span>
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                </div>
            </div>
        `;
    }

    renderFiles() {
        return `
            <div class="files-container">
                <div class="file-upload-area" onclick="collabHub.handleFileUpload()">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📤</div>
                    <div style="color: var(--cyber-cyan); font-size: 1.2rem; margin-bottom: 0.5rem;">
                        Upload Files
                    </div>
                    <div style="color: #888; font-size: 0.9rem;">
                        Click to browse or drag and drop files here
                    </div>
                </div>
                <div class="file-list">
                    ${this.files.map(file => `
                        <div class="file-item">
                            <div class="file-icon">${file.icon}</div>
                            <div class="file-info">
                                <div class="file-name">${file.name}</div>
                                <div class="file-meta">
                                    ${file.size} • Uploaded by ${file.uploader} • ${file.time}
                                </div>
                            </div>
                            <div class="file-actions">
                                <button class="file-action-btn">📥 Download</button>
                                <button class="file-action-btn">🔗 Share</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderTeamSidebar() {
        return `
            <aside class="team-sidebar">
                <h3>👥 Team (${this.teamMembers.length})</h3>
                <ul class="team-list">
                    ${this.teamMembers.map(member => `
                        <li class="team-member">
                            <div class="member-avatar">
                                ${member.avatar}
                                <div class="status-indicator ${member.status}"></div>
                            </div>
                            <div class="member-info">
                                <div class="member-name">${member.name}</div>
                                <div class="member-status">${member.role}</div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </aside>
        `;
    }

    switchChannel(channelId) {
        this.currentChannel = channelId;
        this.render();
        this.scrollToBottom();
    }

    switchTab(tab) {
        this.currentTab = tab;
        this.render();
        if (tab === 'whiteboard') {
            setTimeout(() => this.initCanvas(), 100);
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input || !input.value.trim()) return;

        const newMessage = {
            author: 'You',
            avatar: '👤',
            text: input.value,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (!this.messages[this.currentChannel]) {
            this.messages[this.currentChannel] = [];
        }

        this.messages[this.currentChannel].push(newMessage);
        input.value = '';

        // Re-render just the chat section
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML += `
                <div class="message">
                    <div class="message-avatar">${newMessage.avatar}</div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-author">${newMessage.author}</span>
                            <span class="message-time">${newMessage.time}</span>
                        </div>
                        <div class="message-text">${newMessage.text}</div>
                    </div>
                </div>
            `;
            this.scrollToBottom();
        }
    }

    initCanvas() {
        this.canvas = document.getElementById('whiteboard');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        let startX, startY;

        this.canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            
            if (this.currentTool === 'pen') {
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;

            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (this.currentTool === 'pen') {
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
            } else if (this.currentTool === 'eraser') {
                this.ctx.clearRect(x - 10, y - 10, 20, 20);
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (!this.isDrawing) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const endX = e.clientX - rect.left;
            const endY = e.clientY - rect.top;

            if (this.currentTool === 'line') {
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
                this.ctx.stroke();
            } else if (this.currentTool === 'circle') {
                const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            } else if (this.currentTool === 'rectangle') {
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.strokeRect(startX, startY, endX - startX, endY - startY);
            }

            this.isDrawing = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });
    }

    setTool(tool) {
        this.currentTool = tool;
        this.render();
        if (this.currentTab === 'whiteboard') {
            setTimeout(() => this.initCanvas(), 100);
        }
    }

    setColor(color) {
        this.currentColor = color;
        this.render();
        if (this.currentTab === 'whiteboard') {
            setTimeout(() => this.initCanvas(), 100);
        }
    }

    clearCanvas() {
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    handleFileUpload() {
        const fileName = prompt('Enter file name (demo):');
        if (fileName) {
            const newFile = {
                name: fileName,
                icon: '📄',
                size: Math.floor(Math.random() * 10) + 1 + ' MB',
                uploader: 'You',
                time: 'Just now'
            };
            this.files.unshift(newFile);
            this.render();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }, 100);
    }

    startRealtimeUpdates() {
        // Simulate team member status changes
        setInterval(() => {
            const randomMember = this.teamMembers[Math.floor(Math.random() * this.teamMembers.length)];
            const statuses = ['online', 'away', 'offline'];
            randomMember.status = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Update team sidebar if visible
            const teamSidebar = document.querySelector('.team-sidebar');
            if (teamSidebar) {
                teamSidebar.innerHTML = this.renderTeamSidebar().match(/<aside[^>]*>([\s\S]*)<\/aside>/)[1];
            }
        }, 10000);
    }
}

// Initialize collaboration hub when page loads
let collabHub;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        collabHub = new CollaborationHub();
    });
} else {
    collabHub = new CollaborationHub();
}
