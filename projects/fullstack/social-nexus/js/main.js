// Social Nexus - Main JavaScript

class SocialNexus {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.init();
    }

    init() {
        this.initAuth();
        this.initApp();
        this.loadDemoData();
        this.checkAuth();
    }

    initAuth() {
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
            });
        });

        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('signup-btn').addEventListener('click', () => this.signup());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        ['login-password', 'signup-password'].forEach(id => {
            document.getElementById(id).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById(id.includes('login') ? 'login-btn' : 'signup-btn').click();
                }
            });
        });
    }

    initApp() {
        document.querySelectorAll('.app-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.app-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.view}-view`).classList.add('active');
            });
        });

        document.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const textarea = document.getElementById('post-text');
                textarea.value += btn.textContent;
                textarea.focus();
            });
        });

        document.getElementById('create-post-btn').addEventListener('click', () => this.createPost());
        document.getElementById('send-message-btn').addEventListener('click', () => this.sendMessage());
        
        document.getElementById('message-text').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    loadDemoData() {
        if (!localStorage.getItem('social_posts')) {
            const demoPosts = [
                { id: 1, author: 'TechNinja', text: 'Just launched my new cyberpunk portfolio! 🚀 Check it out!', time: new Date(Date.now() - 3600000).toISOString(), likes: ['CyberDev', 'NeonCoder'] },
                { id: 2, author: 'CyberDev', text: 'Working on an awesome full-stack project. The future is now! 💻✨', time: new Date(Date.now() - 7200000).toISOString(), likes: ['TechNinja'] },
                { id: 3, author: 'NeonCoder', text: 'Anyone else excited about the new React features? 🎉', time: new Date(Date.now() - 10800000).toISOString(), likes: [] },
                { id: 4, author: 'DataWizard', text: 'Building amazing things with Node.js and MongoDB 🔥', time: new Date(Date.now() - 14400000).toISOString(), likes: ['TechNinja', 'CyberDev'] },
                { id: 5, author: 'CodeMaster', text: 'Just finished a 12-hour coding session. Time for coffee! ☕', time: new Date(Date.now() - 18000000).toISOString(), likes: ['NeonCoder'] }
            ];
            localStorage.setItem('social_posts', JSON.stringify(demoPosts));
        }

        if (!localStorage.getItem('social_conversations')) {
            const demoConversations = {
                'TechNinja': [
                    { author: 'TechNinja', text: 'Hey! How are you?', time: new Date(Date.now() - 3600000).toISOString() }
                ],
                'CyberDev': [
                    { author: 'CyberDev', text: 'Want to collaborate on a project?', time: new Date(Date.now() - 7200000).toISOString() }
                ],
                'NeonCoder': [
                    { author: 'NeonCoder', text: 'Check out my latest commit!', time: new Date(Date.now() - 10800000).toISOString() }
                ]
            };
            localStorage.setItem('social_conversations', JSON.stringify(demoConversations));
        }
    }

    checkAuth() {
        const user = localStorage.getItem('social_current_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showApp();
        }
    }

    login() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('social_users') || '{}');
        
        if (users[username] && users[username].password === password) {
            this.currentUser = { username, email: users[username].email };
            localStorage.setItem('social_current_user', JSON.stringify(this.currentUser));
            this.showApp();
        } else {
            alert('Invalid credentials');
        }
    }

    signup() {
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;

        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('social_users') || '{}');
        
        if (users[username]) {
            alert('Username already exists');
            return;
        }

        users[username] = { email, password };
        localStorage.setItem('social_users', JSON.stringify(users));
        
        this.currentUser = { username, email };
        localStorage.setItem('social_current_user', JSON.stringify(this.currentUser));
        this.showApp();
    }

    logout() {
        localStorage.removeItem('social_current_user');
        this.currentUser = null;
        document.getElementById('auth-section').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    }

    showApp() {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('current-user').textContent = this.currentUser.username;
        this.loadPosts();
        this.loadConversations();
        this.loadProfile();
    }

    createPost() {
        const text = document.getElementById('post-text').value.trim();
        
        if (!text) {
            alert('Please write something');
            return;
        }

        const posts = JSON.parse(localStorage.getItem('social_posts') || '[]');
        const newPost = {
            id: Date.now(),
            author: this.currentUser.username,
            text,
            time: new Date().toISOString(),
            likes: []
        };

        posts.unshift(newPost);
        localStorage.setItem('social_posts', JSON.stringify(posts));
        
        document.getElementById('post-text').value = '';
        this.loadPosts();
        this.loadProfile();
    }

    loadPosts() {
        const posts = JSON.parse(localStorage.getItem('social_posts') || '[]');
        const container = document.getElementById('posts-container');
        
        container.innerHTML = posts.map(post => `
            <div class="post-card">
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-time">${this.formatTime(post.time)}</span>
                </div>
                <div class="post-content">${post.text}</div>
                <div class="post-actions-bar">
                    <button class="like-btn ${post.likes.includes(this.currentUser.username) ? 'liked' : ''}" 
                            onclick="app.toggleLike(${post.id})">
                        ❤️ ${post.likes.length} ${post.likes.length === 1 ? 'Like' : 'Likes'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    toggleLike(postId) {
        const posts = JSON.parse(localStorage.getItem('social_posts') || '[]');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            const likeIndex = post.likes.indexOf(this.currentUser.username);
            if (likeIndex > -1) {
                post.likes.splice(likeIndex, 1);
            } else {
                post.likes.push(this.currentUser.username);
            }
            
            localStorage.setItem('social_posts', JSON.stringify(posts));
            this.loadPosts();
            this.loadProfile();
        }
    }

    loadConversations() {
        const conversations = JSON.parse(localStorage.getItem('social_conversations') || '{}');
        const container = document.getElementById('conversations-list');
        
        const users = Object.keys(conversations);
        container.innerHTML = users.map(user => `
            <div class="conversation-item" onclick="app.openChat('${user}')">
                ${user}
            </div>
        `).join('');
    }

    openChat(user) {
        this.currentChat = user;
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('active');
            if (item.textContent.trim() === user) {
                item.classList.add('active');
            }
        });
        this.loadMessages();
    }

    loadMessages() {
        if (!this.currentChat) return;
        
        const conversations = JSON.parse(localStorage.getItem('social_conversations') || '{}');
        const messages = conversations[this.currentChat] || [];
        const container = document.getElementById('messages-container');
        
        container.innerHTML = messages.map(msg => `
            <div class="message ${msg.author === this.currentUser.username ? 'sent' : 'received'}">
                <div class="message-author">${msg.author}</div>
                <div class="message-text">${msg.text}</div>
            </div>
        `).join('');
        
        container.scrollTop = container.scrollHeight;
    }

    sendMessage() {
        if (!this.currentChat) {
            alert('Please select a conversation');
            return;
        }
        
        const text = document.getElementById('message-text').value.trim();
        if (!text) return;
        
        const conversations = JSON.parse(localStorage.getItem('social_conversations') || '{}');
        if (!conversations[this.currentChat]) {
            conversations[this.currentChat] = [];
        }
        
        conversations[this.currentChat].push({
            author: this.currentUser.username,
            text,
            time: new Date().toISOString()
        });
        
        localStorage.setItem('social_conversations', JSON.stringify(conversations));
        document.getElementById('message-text').value = '';
        this.loadMessages();
    }

    loadProfile() {
        if (!this.currentUser) return;
        
        document.getElementById('profile-username').textContent = this.currentUser.username;
        document.getElementById('profile-email').textContent = this.currentUser.email;
        
        const posts = JSON.parse(localStorage.getItem('social_posts') || '[]');
        const userPosts = posts.filter(p => p.author === this.currentUser.username);
        const totalLikes = userPosts.reduce((sum, post) => sum + post.likes.length, 0);
        
        document.getElementById('post-count').textContent = userPosts.length;
        document.getElementById('like-count').textContent = totalLikes;
    }

    formatTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }
}

const app = new SocialNexus();
