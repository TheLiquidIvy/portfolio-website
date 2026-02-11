// E-Commerce Engine - Main JavaScript

class ECommerceEngine {
    constructor() {
        this.cart = [];
        this.orders = [];
        this.products = [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.loadData();
        this.initEventListeners();
        this.renderProducts();
        this.updateCartCount();
    }

    loadData() {
        // Load demo products
        if (!localStorage.getItem('ecommerce_products')) {
            this.products = [
                { id: 1, name: 'Cyber Headphones', price: 199.99, category: 'electronics', desc: 'Wireless noise-canceling headphones with RGB lighting', icon: '🎧' },
                { id: 2, name: 'Neon Keyboard', price: 149.99, category: 'electronics', desc: 'Mechanical keyboard with customizable lighting', icon: '⌨️' },
                { id: 3, name: 'Quantum Mouse', price: 79.99, category: 'electronics', desc: 'High-precision gaming mouse', icon: '🖱️' },
                { id: 4, name: 'VR Headset', price: 399.99, category: 'electronics', desc: 'Immersive virtual reality experience', icon: '🥽' },
                { id: 5, name: 'Smart Watch', price: 299.99, category: 'electronics', desc: 'Fitness tracking with style', icon: '⌚' },
                { id: 6, name: 'Cyber Jacket', price: 249.99, category: 'fashion', desc: 'LED-embedded futuristic jacket', icon: '🧥' },
                { id: 7, name: 'Neon Sneakers', price: 129.99, category: 'fashion', desc: 'Light-up performance sneakers', icon: '👟' },
                { id: 8, name: 'Tech Hoodie', price: 89.99, category: 'fashion', desc: 'Smart fabric with built-in headphones', icon: '👔' },
                { id: 9, name: 'Digital Glasses', price: 179.99, category: 'accessories', desc: 'AR-enabled eyewear', icon: '🕶️' },
                { id: 10, name: 'Power Backpack', price: 119.99, category: 'accessories', desc: 'USB charging ports and LED strips', icon: '🎒' },
                { id: 11, name: 'Holo Phone Case', price: 29.99, category: 'accessories', desc: 'Holographic protective case', icon: '📱' },
                { id: 12, name: 'Gaming Chair', price: 449.99, category: 'electronics', desc: 'Ergonomic with RGB lighting', icon: '🪑' },
                { id: 13, name: 'LED Monitor', price: 599.99, category: 'electronics', desc: '4K curved gaming display', icon: '🖥️' },
                { id: 14, name: 'Cyber Gloves', price: 69.99, category: 'accessories', desc: 'Touch-screen compatible', icon: '🧤' },
                { id: 15, name: 'Neon Cap', price: 39.99, category: 'fashion', desc: 'LED trim baseball cap', icon: '🧢' },
                { id: 16, name: 'Tech Belt', price: 59.99, category: 'accessories', desc: 'Built-in storage compartments', icon: '👔' },
                { id: 17, name: 'Smart Ring', price: 199.99, category: 'accessories', desc: 'Fitness and payment capabilities', icon: '💍' },
                { id: 18, name: 'Holo Speakers', price: 279.99, category: 'electronics', desc: 'Wireless 360° sound', icon: '🔊' },
                { id: 19, name: 'Cyber Boots', price: 189.99, category: 'fashion', desc: 'LED sole platform boots', icon: '🥾' },
                { id: 20, name: 'Gaming Desk', price: 499.99, category: 'electronics', desc: 'Height-adjustable with cable management', icon: '🪑' },
                { id: 21, name: 'Neon T-Shirt', price: 49.99, category: 'fashion', desc: 'EL wire graphic tee', icon: '👕' },
                { id: 22, name: 'Tech Wallet', price: 89.99, category: 'accessories', desc: 'RFID blocking smart wallet', icon: '👛' }
            ];
            localStorage.setItem('ecommerce_products', JSON.stringify(this.products));
        } else {
            this.products = JSON.parse(localStorage.getItem('ecommerce_products'));
        }

        // Load cart
        this.cart = JSON.parse(localStorage.getItem('ecommerce_cart') || '[]');
        
        // Load orders
        this.orders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
    }

    initEventListeners() {
        // View tabs
        document.querySelectorAll('.view-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.store-view').forEach(v => v.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.view}-view`).classList.add('active');
                
                if (tab.dataset.view === 'cart') this.renderCart();
                if (tab.dataset.view === 'orders') this.renderOrders();
                if (tab.dataset.view === 'admin') this.renderAdmin();
            });
        });

        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderProducts();
            });
        });

        // Checkout
        document.getElementById('checkout-btn').addEventListener('click', () => this.openCheckout());
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.placeOrder();
        });

        // Add product
        document.getElementById('add-product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProduct();
        });
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        const filtered = this.currentCategory === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === this.currentCategory);

        container.innerHTML = filtered.map(product => `
            <div class="product-card">
                <div class="product-icon">${product.icon}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `).join('');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const cartItem = this.cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Added to cart!');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.renderCart();
            }
        }
    }

    renderCart() {
        const container = document.getElementById('cart-items');
        
        if (this.cart.length === 0) {
            container.innerHTML = '<div class="empty-message">Your cart is empty</div>';
            document.getElementById('subtotal').textContent = '$0.00';
            document.getElementById('tax').textContent = '$0.00';
            document.getElementById('total').textContent = '$0.00';
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.icon} ${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="app.removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    openCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        document.getElementById('checkout-modal').classList.remove('hidden');
    }

    closeCheckout() {
        document.getElementById('checkout-modal').classList.add('hidden');
        document.getElementById('checkout-form').reset();
    }

    placeOrder() {
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1
        };

        this.orders.push(order);
        localStorage.setItem('ecommerce_orders', JSON.stringify(this.orders));

        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.closeCheckout();
        
        this.showNotification('Order placed successfully!');
        
        // Switch to orders view
        document.querySelector('[data-view="orders"]').click();
    }

    renderOrders() {
        const container = document.getElementById('orders-list');
        
        if (this.orders.length === 0) {
            container.innerHTML = '<div class="empty-message">No orders yet</div>';
            return;
        }

        container.innerHTML = this.orders.slice().reverse().map(order => `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">${item.icon} ${item.name} x${item.quantity}</div>
                    `).join('')}
                </div>
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
            </div>
        `).join('');
    }

    renderAdmin() {
        const container = document.getElementById('admin-products');
        
        container.innerHTML = this.products.map(product => `
            <div class="admin-product-card">
                <div class="admin-product-info">
                    <h4>${product.icon} ${product.name}</h4>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                </div>
                <div class="admin-product-actions">
                    <button class="delete-btn" onclick="app.deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    showAddProduct() {
        document.getElementById('add-product-modal').classList.remove('hidden');
    }

    closeAddProduct() {
        document.getElementById('add-product-modal').classList.add('hidden');
        document.getElementById('add-product-form').reset();
    }

    addProduct() {
        const name = document.getElementById('new-product-name').value;
        const price = parseFloat(document.getElementById('new-product-price').value);
        const category = document.getElementById('new-product-category').value;
        const desc = document.getElementById('new-product-desc').value;

        const icons = {
            electronics: '💻',
            fashion: '👕',
            accessories: '🎒'
        };

        const newProduct = {
            id: Date.now(),
            name,
            price,
            category,
            desc,
            icon: icons[category] || '📦'
        };

        this.products.push(newProduct);
        localStorage.setItem('ecommerce_products', JSON.stringify(this.products));
        
        this.closeAddProduct();
        this.renderAdmin();
        this.renderProducts();
        this.showNotification('Product added successfully!');
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== productId);
            localStorage.setItem('ecommerce_products', JSON.stringify(this.products));
            this.renderAdmin();
            this.renderProducts();
            this.showNotification('Product deleted');
        }
    }

    saveCart() {
        localStorage.setItem('ecommerce_cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 255, 0.9);
            color: #0a0a0f;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-family: 'Orbitron', sans-serif;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

const app = new ECommerceEngine();
