// Streaming Platform JavaScript
class StreamingPlatform {
    constructor() {
        this.songs = this.generateSongs();
        this.currentSong = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 180;
        this.volume = 0.7;
        this.queue = [];
        this.favorites = this.loadFavorites();
        this.currentView = 'home';
        this.init();
    }

    generateSongs() {
        const genres = ['Synthwave', 'Cyberpunk', 'Electronic', 'Chillwave', 'Vaporwave'];
        const artists = ['Neon Rider', 'Cyber Dreams', 'Digital Echo', 'Chrome Pulse', 'Vector Grid', 
                        'Pixel Storm', 'Data Stream', 'Binary Soul', 'Circuit Wave', 'Quantum Beat'];
        const titles = ['Neon Skyline', 'Midnight Pulse', 'Digital Rain', 'Chrome Hearts', 'Electric Dreams',
                       'Cyber Circuit', 'Data Highway', 'Pixel Paradise', 'Matrix Flow', 'Binary Sunset',
                       'Virtual Reality', 'Quantum Drift', 'Laser Grid', 'Future Vibes', 'Tech Noir'];
        
        const songs = [];
        for (let i = 0; i < 15; i++) {
            songs.push({
                id: i + 1,
                title: titles[i] || `Track ${i + 1}`,
                artist: artists[i % artists.length],
                genre: genres[Math.floor(Math.random() * genres.length)],
                duration: Math.floor(Math.random() * 120) + 120,
                plays: Math.floor(Math.random() * 10000) + 1000,
                icon: ['🎵', '🎶', '🎧', '🎹', '🎸', '🎤'][Math.floor(Math.random() * 6)]
            });
        }
        return songs;
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.startProgressUpdate();
        this.loadQueueFromStorage();
    }

    render() {
        const app = document.getElementById('streaming-app');
        app.innerHTML = `
            <div class="streaming-container">
                <aside class="sidebar">
                    <h3>Navigation</h3>
                    <ul class="nav-list">
                        <li class="active" data-view="home">🏠 Home</li>
                        <li data-view="search">🔍 Search</li>
                        <li data-view="library">📚 Your Library</li>
                        <li data-view="favorites">❤️ Favorites</li>
                        <li data-view="playlists">📝 Playlists</li>
                    </ul>
                </aside>

                <main class="main-content">
                    <div id="content-area">
                        ${this.renderContent()}
                    </div>
                </main>

                <aside class="right-sidebar">
                    <h3>Now Playing</h3>
                    <div class="visualizer">
                        ${Array(9).fill().map(() => '<div class="visualizer-bar"></div>').join('')}
                    </div>
                    
                    <h3 style="margin-top: 2rem;">Queue (${this.queue.length})</h3>
                    <ul class="queue-list" id="queue-list">
                        ${this.renderQueue()}
                    </ul>

                    <h3 style="margin-top: 2rem;">Recommendations</h3>
                    <ul class="favorites-list">
                        ${this.getRecommendations().map(song => `
                            <li class="favorite-item" onclick="streamingApp.playSong(${song.id})">
                                ${song.icon} ${song.title}
                                <div style="font-size: 0.85rem; color: #888;">${song.artist}</div>
                            </li>
                        `).join('')}
                    </ul>
                </aside>
            </div>

            <div class="player-controls">
                <div class="player-info">
                    <div class="player-cover" id="player-cover">
                        ${this.currentSong ? this.currentSong.icon : '🎵'}
                    </div>
                    <div class="player-details">
                        <div class="player-title" id="player-title">
                            ${this.currentSong ? this.currentSong.title : 'No track playing'}
                        </div>
                        <div class="player-artist" id="player-artist">
                            ${this.currentSong ? this.currentSong.artist : 'Select a song to play'}
                        </div>
                    </div>
                </div>

                <div class="player-buttons">
                    <button class="player-btn" onclick="streamingApp.previous()">⏮</button>
                    <button class="player-btn play-pause" onclick="streamingApp.togglePlay()">
                        ${this.isPlaying ? '⏸' : '▶'}
                    </button>
                    <button class="player-btn" onclick="streamingApp.next()">⏭</button>
                    <button class="player-btn" onclick="streamingApp.shuffle()">🔀</button>
                </div>

                <div class="progress-container">
                    <span class="progress-time" id="current-time">${this.formatTime(this.currentTime)}</span>
                    <div class="progress-bar" id="progress-bar" onclick="streamingApp.seek(event)">
                        <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                    </div>
                    <span class="progress-time" id="duration-time">${this.formatTime(this.duration)}</span>
                </div>

                <div class="volume-container">
                    <span class="volume-icon">🔊</span>
                    <div class="volume-bar" id="volume-bar" onclick="streamingApp.setVolume(event)">
                        <div class="volume-fill" id="volume-fill" style="width: ${this.volume * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderContent() {
        switch(this.currentView) {
            case 'home':
                return this.renderHome();
            case 'search':
                return this.renderSearch();
            case 'library':
                return this.renderLibrary();
            case 'favorites':
                return this.renderFavorites();
            case 'playlists':
                return this.renderPlaylists();
            default:
                return this.renderHome();
        }
    }

    renderHome() {
        return `
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 2rem;">
                🎵 Discover Music
            </h2>
            <div class="song-grid">
                ${this.songs.map(song => this.renderSongCard(song)).join('')}
            </div>
        `;
    }

    renderSearch() {
        return `
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 1rem;">
                🔍 Search Songs
            </h2>
            <input type="text" class="search-bar" id="search-input" 
                   placeholder="Search for songs, artists, or genres..." 
                   oninput="streamingApp.handleSearch(this.value)">
            <div id="search-results" class="song-grid">
                ${this.songs.map(song => this.renderSongCard(song)).join('')}
            </div>
        `;
    }

    renderLibrary() {
        return `
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 2rem;">
                📚 Your Library
            </h2>
            <div class="song-grid">
                ${this.songs.slice(0, 8).map(song => this.renderSongCard(song)).join('')}
            </div>
        `;
    }

    renderFavorites() {
        const favSongs = this.songs.filter(song => this.favorites.includes(song.id));
        if (favSongs.length === 0) {
            return `
                <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 2rem;">
                    ❤️ Your Favorites
                </h2>
                <p style="text-align: center; color: #888; padding: 3rem;">
                    No favorites yet. Click the heart icon on songs to add them!
                </p>
            `;
        }
        return `
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 2rem;">
                ❤️ Your Favorites (${favSongs.length})
            </h2>
            <div class="song-grid">
                ${favSongs.map(song => this.renderSongCard(song)).join('')}
            </div>
        `;
    }

    renderPlaylists() {
        return `
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00ffff; margin-bottom: 2rem;">
                📝 Your Playlists
            </h2>
            <div style="display: grid; gap: 1rem;">
                <div style="padding: 2rem; background: rgba(0,255,255,0.1); border: 1px solid #00ffff; border-radius: 8px;">
                    <h3 style="color: #00ffff;">🌙 Night Drive</h3>
                    <p style="color: #888;">12 tracks • 47 min</p>
                </div>
                <div style="padding: 2rem; background: rgba(255,0,255,0.1); border: 1px solid #ff00ff; border-radius: 8px;">
                    <h3 style="color: #ff00ff;">⚡ Energy Boost</h3>
                    <p style="color: #888;">24 tracks • 1 hr 32 min</p>
                </div>
                <div style="padding: 2rem; background: rgba(0,255,65,0.1); border: 1px solid #00ff41; border-radius: 8px;">
                    <h3 style="color: #00ff41;">🎧 Focus Mode</h3>
                    <p style="color: #888;">18 tracks • 1 hr 5 min</p>
                </div>
            </div>
        `;
    }

    renderSongCard(song) {
        const isFavorite = this.favorites.includes(song.id);
        const isPlaying = this.currentSong && this.currentSong.id === song.id && this.isPlaying;
        return `
            <div class="song-card ${isPlaying ? 'playing' : ''}" onclick="streamingApp.playSong(${song.id})">
                <div class="song-cover">${song.icon}</div>
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-duration">${this.formatTime(song.duration)}</div>
                <div class="song-actions">
                    <button onclick="event.stopPropagation(); streamingApp.toggleFavorite(${song.id})">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                    <button onclick="event.stopPropagation(); streamingApp.addToQueue(${song.id})">
                        ➕
                    </button>
                </div>
            </div>
        `;
    }

    renderQueue() {
        if (this.queue.length === 0) {
            return '<li style="text-align: center; color: #888; padding: 1rem;">Queue is empty</li>';
        }
        return this.queue.map((songId, index) => {
            const song = this.songs.find(s => s.id === songId);
            if (!song) return '';
            const isCurrent = this.currentSong && this.currentSong.id === songId;
            return `
                <li class="queue-item ${isCurrent ? 'current' : ''}" onclick="streamingApp.playFromQueue(${index})">
                    <div class="queue-item-info">
                        <div class="queue-item-title">${song.icon} ${song.title}</div>
                        <div class="queue-item-artist">${song.artist}</div>
                    </div>
                    <button class="queue-item-remove" onclick="event.stopPropagation(); streamingApp.removeFromQueue(${index})">✕</button>
                </li>
            `;
        }).join('');
    }

    handleSearch(query) {
        const results = document.getElementById('search-results');
        if (!query.trim()) {
            results.innerHTML = this.songs.map(song => this.renderSongCard(song)).join('');
            return;
        }

        const filtered = this.songs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.genre.toLowerCase().includes(query.toLowerCase())
        );

        results.innerHTML = filtered.length > 0 
            ? filtered.map(song => this.renderSongCard(song)).join('')
            : '<p style="text-align: center; color: #888; padding: 2rem;">No results found</p>';
    }

    playSong(id) {
        const song = this.songs.find(s => s.id === id);
        if (!song) return;

        this.currentSong = song;
        this.duration = song.duration;
        this.currentTime = 0;
        this.isPlaying = true;

        this.updatePlayer();
        this.render();
    }

    togglePlay() {
        if (!this.currentSong) {
            this.playSong(this.songs[0].id);
            return;
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayer();
    }

    previous() {
        if (!this.currentSong) return;
        const currentIndex = this.songs.findIndex(s => s.id === this.currentSong.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.songs.length - 1;
        this.playSong(this.songs[prevIndex].id);
    }

    next() {
        if (this.queue.length > 0) {
            const nextSongId = this.queue.shift();
            this.saveQueueToStorage();
            this.playSong(nextSongId);
        } else if (this.currentSong) {
            const currentIndex = this.songs.findIndex(s => s.id === this.currentSong.id);
            const nextIndex = (currentIndex + 1) % this.songs.length;
            this.playSong(this.songs[nextIndex].id);
        }
    }

    shuffle() {
        const shuffled = [...this.songs].sort(() => Math.random() - 0.5);
        if (shuffled.length > 0) {
            this.playSong(shuffled[0].id);
        }
    }

    addToQueue(id) {
        if (!this.queue.includes(id)) {
            this.queue.push(id);
            this.saveQueueToStorage();
            this.updateQueue();
        }
    }

    removeFromQueue(index) {
        this.queue.splice(index, 1);
        this.saveQueueToStorage();
        this.updateQueue();
    }

    playFromQueue(index) {
        const songId = this.queue[index];
        this.queue.splice(index, 1);
        this.saveQueueToStorage();
        this.playSong(songId);
    }

    toggleFavorite(id) {
        if (this.favorites.includes(id)) {
            this.favorites = this.favorites.filter(fid => fid !== id);
        } else {
            this.favorites.push(id);
        }
        this.saveFavorites();
        this.render();
    }

    seek(event) {
        const bar = event.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.currentTime = Math.floor(percent * this.duration);
        this.updateProgress();
    }

    setVolume(event) {
        const bar = event.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.volume = Math.max(0, Math.min(1, percent));
        document.getElementById('volume-fill').style.width = (this.volume * 100) + '%';
    }

    updatePlayer() {
        const playButton = document.querySelector('.play-pause');
        if (playButton) {
            playButton.innerHTML = this.isPlaying ? '⏸' : '▶';
        }

        const playerCover = document.getElementById('player-cover');
        const playerTitle = document.getElementById('player-title');
        const playerArtist = document.getElementById('player-artist');
        const durationTime = document.getElementById('duration-time');

        if (this.currentSong) {
            if (playerCover) playerCover.innerHTML = this.currentSong.icon;
            if (playerTitle) playerTitle.textContent = this.currentSong.title;
            if (playerArtist) playerArtist.textContent = this.currentSong.artist;
            if (durationTime) durationTime.textContent = this.formatTime(this.duration);
        }
    }

    updateQueue() {
        const queueList = document.getElementById('queue-list');
        if (queueList) {
            queueList.innerHTML = this.renderQueue();
        }
    }

    startProgressUpdate() {
        setInterval(() => {
            if (this.isPlaying && this.currentSong) {
                this.currentTime += 1;
                if (this.currentTime >= this.duration) {
                    this.next();
                }
                this.updateProgress();
            }
        }, 1000);
    }

    updateProgress() {
        const currentTimeEl = document.getElementById('current-time');
        const progressFill = document.getElementById('progress-fill');

        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(this.currentTime);
        }

        if (progressFill) {
            const percent = (this.currentTime / this.duration) * 100;
            progressFill.style.width = percent + '%';
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    getRecommendations() {
        if (!this.currentSong) {
            return this.songs.slice(0, 3);
        }
        const recommendations = this.songs.filter(song => 
            song.genre === this.currentSong.genre && song.id !== this.currentSong.id
        );
        return recommendations.slice(0, 3);
    }

    attachEventListeners() {
        document.querySelectorAll('.nav-list li').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-list li').forEach(li => li.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                document.getElementById('content-area').innerHTML = this.renderContent();
            });
        });
    }

    saveFavorites() {
        localStorage.setItem('streaming_favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = localStorage.getItem('streaming_favorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveQueueToStorage() {
        localStorage.setItem('streaming_queue', JSON.stringify(this.queue));
    }

    loadQueueFromStorage() {
        const saved = localStorage.getItem('streaming_queue');
        if (saved) {
            this.queue = JSON.parse(saved);
            this.updateQueue();
        }
    }
}

// Initialize app when page loads
let streamingApp;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        streamingApp = new StreamingPlatform();
    });
} else {
    streamingApp = new StreamingPlatform();
}
