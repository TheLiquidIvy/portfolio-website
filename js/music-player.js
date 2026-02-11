// ==================== MUSIC PLAYER ====================

class MusicPlayer {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.audioSource = null;
        this.oscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        this.volume = 0.5;
        this.isMuted = false;
        this.isExpanded = false;
        this.animationId = null;
        
        // Track information
        this.tracks = [
            { name: 'Neon Dreams', freq: 440, type: 'sine', duration: 180 },
            { name: 'Code Runner', freq: 523, type: 'square', duration: 210 },
            { name: 'Digital Rain', freq: 330, type: 'triangle', duration: 240 },
            { name: 'Terminal Beats', freq: 392, type: 'sawtooth', duration: 195 }
        ];
        
        this.currentTime = 0;
        this.startTime = 0;
        
        this.init();
    }
    
    init() {
        this.createPlayerHTML();
        this.loadState();
        this.attachEventListeners();
        this.setupKeyboardControls();
        this.setupPageVisibility();
        this.updateUI();
    }
    
    createPlayerHTML() {
        const playerHTML = `
            <div class="music-player minimized" id="musicPlayer" role="region" aria-label="Music Player">
                <div class="player-icon" role="button" aria-label="Expand music player" tabindex="0">
                    🎵
                </div>
                <div class="player-controls">
                    <div class="player-header">
                        <h3>Music Player</h3>
                        <button class="minimize-btn" aria-label="Minimize player" title="Minimize">
                            ▼
                        </button>
                    </div>
                    
                    <div class="track-display">
                        <p class="track-name" id="trackName">Select a track</p>
                        <p class="track-time" id="trackTime">0:00 / 0:00</p>
                    </div>
                    
                    <div class="audio-visualizer" id="visualizer" aria-hidden="true">
                        ${Array(10).fill(0).map(() => '<div class="visualizer-bar"></div>').join('')}
                    </div>
                    
                    <div class="track-selector">
                        <select class="track-select" id="trackSelect" aria-label="Select track">
                            <option value="0">Neon Dreams</option>
                            <option value="1">Code Runner</option>
                            <option value="2">Digital Rain</option>
                            <option value="3">Terminal Beats</option>
                        </select>
                    </div>
                    
                    <div class="player-buttons">
                        <button class="control-btn prev-btn" aria-label="Previous track" title="Previous (←)">
                            ⏮
                        </button>
                        <button class="control-btn play-btn" id="playBtn" aria-label="Play" title="Play/Pause (Space)">
                            ▶
                        </button>
                        <button class="control-btn next-btn" aria-label="Next track" title="Next (→)">
                            ⏭
                        </button>
                    </div>
                    
                    <div class="volume-control">
                        <button class="mute-btn" id="muteBtn" aria-label="Mute" title="Mute (M)">
                            🔊
                        </button>
                        <input type="range" class="volume-slider" id="volumeSlider" 
                               min="0" max="100" value="50" 
                               aria-label="Volume" title="Volume (↑↓)">
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', playerHTML);
        
        // Get references to elements
        this.player = document.getElementById('musicPlayer');
        this.playerIcon = this.player.querySelector('.player-icon');
        this.minimizeBtn = this.player.querySelector('.minimize-btn');
        this.playBtn = document.getElementById('playBtn');
        this.trackSelect = document.getElementById('trackSelect');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.muteBtn = document.getElementById('muteBtn');
        this.trackName = document.getElementById('trackName');
        this.trackTime = document.getElementById('trackTime');
        this.visualizerBars = this.player.querySelectorAll('.visualizer-bar');
        this.prevBtn = this.player.querySelector('.prev-btn');
        this.nextBtn = this.player.querySelector('.next-btn');
    }
    
    attachEventListeners() {
        // Expand/Minimize
        this.playerIcon.addEventListener('click', () => this.expand());
        this.playerIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.expand();
            }
        });
        
        this.minimizeBtn.addEventListener('click', () => this.minimize());
        
        // Play/Pause
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // Track selection
        this.trackSelect.addEventListener('change', (e) => {
            this.selectTrack(parseInt(e.target.value));
        });
        
        // Volume
        this.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        // Mute
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        
        // Previous/Next
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // Only work when player is expanded and not typing in an input
            if (!this.isExpanded || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'm':
                case 'M':
                    e.preventDefault();
                    this.toggleMute();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.setVolume(Math.min(1, this.volume + 0.1));
                    this.volumeSlider.value = this.volume * 100;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setVolume(Math.max(0, this.volume - 0.1));
                    this.volumeSlider.value = this.volume * 100;
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousTrack();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextTrack();
                    break;
            }
        });
    }
    
    setupPageVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                this.pause();
                this.wasPlayingBeforeHidden = true;
            } else if (!document.hidden && this.wasPlayingBeforeHidden) {
                this.play();
                this.wasPlayingBeforeHidden = false;
            }
        });
    }
    
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 64;
            this.gainNode = this.audioContext.createGain();
            
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.gainNode.gain.value = this.isMuted ? 0 : this.volume;
        }
    }
    
    createOscillator() {
        const track = this.tracks[this.currentTrackIndex];
        
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = track.type;
        this.oscillator.frequency.value = track.freq;
        
        // Add some variation to make it more interesting
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.frequency.value = 5;
        lfoGain.gain.value = 10;
        lfo.connect(lfoGain);
        lfoGain.connect(this.oscillator.frequency);
        lfo.start();
        
        this.oscillator.connect(this.gainNode);
        this.oscillator.start();
        
        this.startTime = Date.now();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.initAudioContext();
        
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        if (!this.oscillator) {
            this.createOscillator();
        }
        
        this.isPlaying = true;
        this.playBtn.innerHTML = '⏸';
        this.playBtn.classList.add('playing');
        this.playBtn.setAttribute('aria-label', 'Pause');
        
        this.visualize();
        this.updateTime();
        this.saveState();
        
        // Announce to screen readers
        this.announce(`Now playing ${this.tracks[this.currentTrackIndex].name}`);
    }
    
    pause() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
        
        this.isPlaying = false;
        this.playBtn.innerHTML = '▶';
        this.playBtn.classList.remove('playing');
        this.playBtn.setAttribute('aria-label', 'Play');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.saveState();
        this.announce('Paused');
    }
    
    selectTrack(index) {
        const wasPlaying = this.isPlaying;
        
        if (this.isPlaying) {
            this.pause();
        }
        
        this.currentTrackIndex = index;
        this.currentTime = 0;
        this.updateUI();
        this.saveState();
        
        if (wasPlaying) {
            this.play();
        }
    }
    
    previousTrack() {
        const newIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.trackSelect.value = newIndex;
        this.selectTrack(newIndex);
    }
    
    nextTrack() {
        const newIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.trackSelect.value = newIndex;
        this.selectTrack(newIndex);
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        
        if (this.gainNode) {
            this.gainNode.gain.value = this.isMuted ? 0 : this.volume;
        }
        
        this.saveState();
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.gainNode) {
            this.gainNode.gain.value = this.isMuted ? 0 : this.volume;
        }
        
        this.muteBtn.innerHTML = this.isMuted ? '🔇' : '🔊';
        this.muteBtn.classList.toggle('muted', this.isMuted);
        this.muteBtn.setAttribute('aria-label', this.isMuted ? 'Unmute' : 'Mute');
        
        this.saveState();
        this.announce(this.isMuted ? 'Muted' : 'Unmuted');
    }
    
    expand() {
        this.isExpanded = true;
        this.player.classList.remove('minimized');
        this.player.classList.add('expanded');
        this.saveState();
    }
    
    minimize() {
        this.isExpanded = false;
        this.player.classList.remove('expanded');
        this.player.classList.add('minimized');
        this.saveState();
    }
    
    visualize() {
        if (!this.isPlaying || !this.analyser) return;
        
        this.animationId = requestAnimationFrame(() => this.visualize());
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        this.visualizerBars.forEach((bar, index) => {
            const value = this.dataArray[index * 2] || 0;
            const height = (value / 255) * 50 + 5;
            bar.style.height = `${height}px`;
        });
    }
    
    updateTime() {
        if (!this.isPlaying) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const track = this.tracks[this.currentTrackIndex];
        const duration = track.duration;
        
        this.currentTime = elapsed;
        
        const currentMin = Math.floor(elapsed / 60);
        const currentSec = elapsed % 60;
        const totalMin = Math.floor(duration / 60);
        const totalSec = duration % 60;
        
        this.trackTime.textContent = 
            `${currentMin}:${currentSec.toString().padStart(2, '0')} / ` +
            `${totalMin}:${totalSec.toString().padStart(2, '0')}`;
        
        // Auto-next when track ends
        if (elapsed >= duration) {
            this.nextTrack();
        } else {
            setTimeout(() => this.updateTime(), 1000);
        }
    }
    
    updateUI() {
        const track = this.tracks[this.currentTrackIndex];
        this.trackName.textContent = track.name;
        this.trackTime.textContent = `0:00 / ${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`;
        this.trackSelect.value = this.currentTrackIndex;
        
        // Update border color based on track
        const colors = ['#00f3ff', '#ff00ff', '#7b00ff', '#00ff00'];
        this.player.querySelector('.player-controls').style.borderColor = colors[this.currentTrackIndex];
    }
    
    saveState() {
        const state = {
            currentTrackIndex: this.currentTrackIndex,
            volume: this.volume,
            isMuted: this.isMuted,
            isExpanded: this.isExpanded
        };
        
        localStorage.setItem('musicPlayerState', JSON.stringify(state));
    }
    
    loadState() {
        try {
            const savedState = localStorage.getItem('musicPlayerState');
            if (savedState) {
                const state = JSON.parse(savedState);
                
                this.currentTrackIndex = state.currentTrackIndex || 0;
                this.volume = state.volume !== undefined ? state.volume : 0.5;
                this.isMuted = state.isMuted || false;
                this.isExpanded = state.isExpanded || false;
                
                this.volumeSlider.value = this.volume * 100;
                this.trackSelect.value = this.currentTrackIndex;
                
                if (this.isMuted) {
                    this.muteBtn.innerHTML = '🔇';
                    this.muteBtn.classList.add('muted');
                }
                
                if (this.isExpanded) {
                    this.player.classList.remove('minimized');
                    this.player.classList.add('expanded');
                } else {
                    this.player.classList.add('minimized');
                }
            } else {
                this.player.classList.add('minimized');
            }
        } catch (e) {
            console.error('Error loading music player state:', e);
            this.player.classList.add('minimized');
        }
    }
    
    announce(message) {
        // Create live region for screen reader announcements
        let liveRegion = document.getElementById('musicPlayerAnnounce');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'musicPlayerAnnounce';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = message;
    }
}

// Initialize music player when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.musicPlayer = new MusicPlayer();
    });
} else {
    window.musicPlayer = new MusicPlayer();
}
