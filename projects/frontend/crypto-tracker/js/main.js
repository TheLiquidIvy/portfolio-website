// Crypto Tracker - Main JavaScript

// Mock crypto data
const cryptoData = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '₿', rank: 1, price: 45234.67, change: 5.23, volume: 28500000000, marketCap: 885000000000 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', rank: 2, price: 2834.92, change: -2.14, volume: 15600000000, marketCap: 340000000000 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: '₳', rank: 3, price: 1.24, change: 8.76, volume: 2400000000, marketCap: 42000000000 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '◎', rank: 4, price: 98.45, change: 12.34, volume: 3200000000, marketCap: 38000000000 },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', icon: '●', rank: 5, price: 18.92, change: -4.67, volume: 1800000000, marketCap: 21000000000 },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð', rank: 6, price: 0.089, change: 15.23, volume: 980000000, marketCap: 12000000000 }
];

// Initialize particles background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Generate sparkline chart
function generateSparkline(canvas, data) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const step = width / (data.length - 1);
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const isPositive = data[data.length - 1] > data[0];
    
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(0, 255, 65, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
        ctx.strokeStyle = '#00ff41';
    } else {
        gradient.addColorStop(0, 'rgba(255, 71, 87, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');
        ctx.strokeStyle = '#ff4757';
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range) * height;
        
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.lineWidth = 2;
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
}

// Generate random price history for sparkline
function generatePriceHistory(basePrice, change) {
    const history = [];
    let price = basePrice * 0.95;
    
    for (let i = 0; i < 30; i++) {
        const volatility = (Math.random() - 0.5) * basePrice * 0.02;
        price += volatility + (change > 0 ? basePrice * 0.001 : -basePrice * 0.001);
        history.push(price);
    }
    
    return history;
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

// Format price
function formatPrice(price) {
    if (price >= 1) return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + price.toFixed(6);
}

// Render crypto cards
function renderCryptoCards() {
    const grid = document.getElementById('crypto-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    cryptoData.forEach(crypto => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        
        const changeClass = crypto.change >= 0 ? 'positive' : 'negative';
        const changeIcon = crypto.change >= 0 ? '▲' : '▼';
        
        card.innerHTML = `
            <div class="crypto-header">
                <div style="display: flex; align-items: center;">
                    <div class="crypto-icon">${crypto.icon}</div>
                    <div class="crypto-info">
                        <div class="crypto-name">${crypto.name}</div>
                        <div class="crypto-symbol">${crypto.symbol}</div>
                    </div>
                </div>
                <div class="crypto-rank">#${crypto.rank}</div>
            </div>
            <div class="crypto-price">${formatPrice(crypto.price)}</div>
            <div class="crypto-change ${changeClass}">
                ${changeIcon} ${Math.abs(crypto.change).toFixed(2)}%
                <span style="font-size: 0.8rem; opacity: 0.7;">24h</span>
            </div>
            <div class="sparkline-container">
                <canvas class="sparkline-canvas" width="280" height="60" data-crypto="${crypto.id}"></canvas>
            </div>
            <div class="crypto-stats">
                <div class="stat-item">
                    <span class="stat-label">Volume</span>
                    <span class="stat-value">$${formatNumber(crypto.volume)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Market Cap</span>
                    <span class="stat-value">$${formatNumber(crypto.marketCap)}</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Generate sparkline
        const canvas = card.querySelector('.sparkline-canvas');
        const priceHistory = generatePriceHistory(crypto.price, crypto.change);
        generateSparkline(canvas, priceHistory);
    });
}

// Render ticker
function renderTicker() {
    const scroll = document.getElementById('ticker-scroll');
    if (!scroll) return;
    
    // Duplicate data for seamless loop
    const tickerData = [...cryptoData, ...cryptoData];
    
    scroll.innerHTML = tickerData.map(crypto => {
        const changeClass = crypto.change >= 0 ? 'up' : 'down';
        const changeIcon = crypto.change >= 0 ? '▲' : '▼';
        
        return `
            <div class="ticker-item">
                <span class="ticker-symbol">${crypto.symbol}</span>
                <span class="ticker-price">${formatPrice(crypto.price)}</span>
                <span class="ticker-change ${changeClass}">${changeIcon} ${Math.abs(crypto.change).toFixed(2)}%</span>
            </div>
        `;
    }).join('');
}

// Update market stats
function updateMarketStats() {
    const totalMarketCap = cryptoData.reduce((sum, crypto) => sum + crypto.marketCap, 0);
    const totalVolume = cryptoData.reduce((sum, crypto) => sum + crypto.volume, 0);
    
    const marketCapEl = document.getElementById('market-cap');
    const volumeEl = document.getElementById('volume-24h');
    
    if (marketCapEl) marketCapEl.textContent = '$' + formatNumber(totalMarketCap);
    if (volumeEl) volumeEl.textContent = '$' + formatNumber(totalVolume);
}

// Portfolio calculator
function initCalculator() {
    const cryptoSelect = document.getElementById('crypto-select');
    const amountInput = document.getElementById('amount-input');
    const calcBtn = document.getElementById('calc-btn');
    const resultValue = document.getElementById('result-value');
    const resultBreakdown = document.getElementById('result-breakdown');
    
    if (!cryptoSelect || !amountInput || !calcBtn) return;
    
    // Populate crypto select
    cryptoSelect.innerHTML = cryptoData.map(crypto => 
        `<option value="${crypto.id}">${crypto.name} (${crypto.symbol})</option>`
    ).join('');
    
    function calculate() {
        const selectedCrypto = cryptoData.find(c => c.id === cryptoSelect.value);
        const amount = parseFloat(amountInput.value) || 0;
        
        if (selectedCrypto && amount > 0) {
            const totalValue = amount * selectedCrypto.price;
            const change24h = totalValue * (selectedCrypto.change / 100);
            
            resultValue.textContent = formatPrice(totalValue);
            resultBreakdown.innerHTML = `
                <div>Amount: ${amount.toFixed(8)} ${selectedCrypto.symbol}</div>
                <div>24h Change: <span style="color: ${selectedCrypto.change >= 0 ? '#00ff41' : '#ff4757'}">${formatPrice(Math.abs(change24h))} (${selectedCrypto.change >= 0 ? '+' : '-'}${Math.abs(selectedCrypto.change).toFixed(2)}%)</span></div>
            `;
            
            // Animate the result
            resultValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                resultValue.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    calcBtn.addEventListener('click', calculate);
    amountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
    
    // Initial calculation
    calculate();
}

// Refresh button functionality
function initRefreshButton() {
    const refreshBtn = document.getElementById('refresh-btn');
    if (!refreshBtn) return;
    
    refreshBtn.addEventListener('click', () => {
        // Simulate price updates
        cryptoData.forEach(crypto => {
            const volatility = (Math.random() - 0.5) * 5;
            crypto.change = parseFloat((crypto.change + volatility).toFixed(2));
            crypto.price = crypto.price * (1 + (volatility / 100));
        });
        
        renderCryptoCards();
        renderTicker();
        updateMarketStats();
        
        // Visual feedback
        refreshBtn.innerHTML = '<div class="loading"></div>';
        setTimeout(() => {
            refreshBtn.innerHTML = '🔄 Refresh Data';
        }, 800);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderCryptoCards();
    renderTicker();
    updateMarketStats();
    initCalculator();
    initRefreshButton();
    
    // Auto-update every 10 seconds
    setInterval(() => {
        cryptoData.forEach(crypto => {
            const volatility = (Math.random() - 0.5) * 0.5;
            crypto.change = parseFloat((crypto.change + volatility).toFixed(2));
            crypto.price = crypto.price * (1 + (volatility / 100));
        });
        
        renderCryptoCards();
        renderTicker();
        updateMarketStats();
    }, 10000);
});
