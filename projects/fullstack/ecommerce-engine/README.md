# E-Commerce Engine

A fully functional e-commerce platform with product management, shopping cart, checkout, and order tracking.

## Features

- **Product Catalog**: Browse 20+ products across 3 categories (Electronics, Fashion, Accessories)
- **Category Filtering**: Filter products by category
- **Shopping Cart**: Add/remove items with quantity controls
- **Checkout Process**: Mock Stripe payment interface with form validation
- **Order History**: View all past orders with details
- **Admin Dashboard**: Add and delete products dynamically
- **Price Calculations**: Automatic subtotal, tax (10%), and total calculations

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Cyberpunk theme with neon colors (#00ffff, #ff00ff, #00ff41)
- **Fonts**: Orbitron, Rajdhani
- **Storage**: localStorage for cart, orders, and products persistence

## How to Use

### Shopping
1. Browse products in the **Shop** view
2. Use category filters to narrow down products
3. Click "Add to Cart" on any product

### Cart & Checkout
1. Click **Cart** tab to view items
2. Adjust quantities with +/- buttons
3. Remove items if needed
4. Click "Proceed to Checkout"
5. Fill in shipping and payment details
6. Place your order

### Order History
1. Click **Orders** tab
2. View all completed orders with items and totals

### Admin
1. Click **Admin** tab
2. View all products
3. Add new products with the "Add Product" button
4. Delete existing products

## Demo Products

The store includes 22 products ranging from:
- Electronics: Headphones, keyboards, monitors, VR headsets
- Fashion: Jackets, sneakers, hoodies, boots
- Accessories: Backpacks, glasses, wallets, rings

All data persists in localStorage, maintaining your cart and order history across sessions.
