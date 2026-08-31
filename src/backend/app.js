// Fetch API data
const API_URL = 'http://127.0.0.1:5500/src/json/api.json';

// DOM Elements
const container = document.getElementById('container');
const categoryButtons = document.querySelectorAll('.category-btn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileAboutBtn = document.getElementById('mobileAboutBtn');
const mobileDropdown = document.getElementById('mobileDropdown');
const mobileChevron = document.getElementById('mobileChevron');
const aboutBtn = document.getElementById('aboutBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// State
let products = [];
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    updateCartBadge();
});

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<p class="text-red-500">Error loading products. Please try again.</p>';
    }
}

// Display products
function displayProducts(productsToDisplay) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p class="text-gray-500 col-span-full">Tidak ada produk yang ditemukan.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden';
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    card.innerHTML = `
        <div class="relative overflow-hidden h-48 bg-gray-200">
            <img src="${product.gambar}" alt="${product.nama}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
            <div class="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-semibold">
                ${product.kategori}
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">${product.nama}</h3>
            <p class="text-xs text-gray-500 mb-2">${product.satuan}</p>
            <p class="text-emerald-600 font-bold text-lg mb-3">${formatPrice(product.harga)}</p>
            <button onclick="addToCart(${product.id})" class="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm">
                + Tambah
            </button>
        </div>
    `;
    
    return card;
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    categoryButtons.forEach(btn => {
        btn.classList.remove('border-emerald-600', 'bg-emerald-50', 'text-emerald-600');
        btn.classList.add('border-gray-200');
    });
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('border-emerald-600', 'bg-emerald-50', 'text-emerald-600');
        activeBtn.classList.remove('border-gray-200');
    }
    
    // Filter and display products
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.kategori === category);
    
    displayProducts(filtered);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show feedback
    showNotification(`${product.nama} ditambahkan ke keranjang`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterByCategory(category);
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Mobile about dropdown
    if (mobileAboutBtn) {
        mobileAboutBtn.addEventListener('click', () => {
            mobileDropdown.classList.toggle('hidden');
            mobileChevron.classList.toggle('rotate-180');
        });
    }

    // Desktop about dropdown
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#aboutDropdown')) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }
}

// Display first category by default
document.addEventListener('DOMContentLoaded', () => {
    if (categoryButtons.length > 0) {
        const firstCategory = categoryButtons[0].dataset.category;
        filterByCategory(firstCategory);
        categoryButtons[0].classList.add('border-emerald-600', 'bg-emerald-50', 'text-emerald-600');
        categoryButtons[0].classList.remove('border-gray-200');
    }
});