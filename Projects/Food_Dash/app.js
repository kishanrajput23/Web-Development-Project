document.addEventListener('DOMContentLoaded', () => {
    // --- MOCK DATA ---
    const data = {
        restaurants: [
            {
                id: 1,
                name: 'Pizza Palace',
                cuisine: 'Italian',
                image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 1, name: 'Margherita Pizza', price: 12.99 },
                    { id: 2, name: 'Pepperoni Pizza', price: 14.99 },
                    { id: 3, name: 'Garlic Bread', price: 5.99 },
                    { id: 4, name: 'Caesar Salad', price: 8.99 },
                    { id: 17, name: 'Spaghetti Bolognese', price: 15.50 },
                    { id: 18, name: 'Lasagna', price: 16.00 }
                ]
            },
            {
                id: 2,
                name: 'Burger Barn',
                cuisine: 'American',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 5, name: 'Classic Burger', price: 9.99 },
                    { id: 6, name: 'Cheese Burger', price: 10.99 },
                    { id: 7, name: 'Fries', price: 3.99 },
                    { id: 8, name: 'Milkshake', price: 4.99 },
                    { id: 19, name: 'Onion Rings', price: 5.50 },
                    { id: 20, name: 'Chicken Sandwich', price: 11.99 }
                ]
            },
            {
                id: 3,
                name: 'Sushi Station',
                cuisine: 'Japanese',
                image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 9, name: 'California Roll', price: 8.99 },
                    { id: 10, name: 'Spicy Tuna Roll', price: 10.99 },
                    { id: 11, name: 'Edamame', price: 4.99 },
                    { id: 12, name: 'Miso Soup', price: 2.99 },
                    { id: 21, name: 'Sashimi Platter', price: 18.00 },
                    { id: 22, name: 'Gyoza', price: 7.50 }
                ]
            },
            {
                id: 4,
                name: 'Taco Town',
                cuisine: 'Mexican',
                image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 13, name: 'Chicken Tacos', price: 9.50 },
                    { id: 14, name: 'Beef Tacos', price: 10.50 },
                    { id: 15, name: 'Guacamole & Chips', price: 6.00 },
                    { id: 16, name: 'Horchata', price: 3.50 },
                    { id: 23, name: 'Quesadilla', price: 8.50 },
                    { id: 24, name: 'Burrito Bowl', price: 12.00 }
                ]
            },
            {
                id: 5,
                name: 'Curry House',
                cuisine: 'Indian',
                image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 25, name: 'Chicken Tikka Masala', price: 14.99 },
                    { id: 26, name: 'Samosa', price: 4.99 },
                    { id: 27, name: 'Naan Bread', price: 2.99 }
                ]
            },
            {
                id: 6,
                name: 'Siam Spice',
                cuisine: 'Thai',
                image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
                menu: [
                    { id: 28, name: 'Palak Paneer', price: 13.99 },
                    { id: 29, name: 'Pad Thai', price: 12.99 },
                    { id: 30, name: 'Green Curry', price: 13.99 },
                    { id: 31, name: 'Tom Yum Soup', price: 5.99 },
                    { id: 32, name: 'Mango Sticky Rice', price: 7.99 }
                ]
            }
        ]
    };

    let cart = [];

    // --- DOM ELEMENTS ---
    const logoLink = document.getElementById('logo-link');
    const searchInput = document.getElementById('search-input');
    const restaurantList = document.getElementById('restaurant-list');
    const menuList = document.getElementById('menu-list');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const menuRestaurantName = document.getElementById('menu-restaurant-name');
    const featuredItemsContainer = document.getElementById('featured-items-container');
    const featuredItems = document.getElementById('featured-items');

    const restaurantsView = document.getElementById('restaurants-view');
    const menuView = document.getElementById('menu-view');
    const cartView = document.getElementById('cart-view');
    const checkoutView = document.getElementById('checkout-view');

    const backToRestaurantsButton = document.getElementById('back-to-restaurants');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const checkoutButton = document.getElementById('checkout-button');
    const backToCartButton = document.getElementById('back-to-cart');
    const checkoutForm = document.getElementById('checkout-form');

    // --- RENDER FUNCTIONS ---
    function renderRestaurants(searchTerm = '') {
        restaurantList.innerHTML = '';
        const term = searchTerm.toLowerCase();

        if (term) {
            featuredItemsContainer.classList.add('hidden');
        } else {
            featuredItemsContainer.classList.remove('hidden');
        }

        const filteredRestaurants = data.restaurants.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(term) ||
                   restaurant.cuisine.toLowerCase().includes(term);
        });

        filteredRestaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.className = 'card';
            restaurantCard.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <div class="card-content">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.cuisine}</p>
                </div>
            `;
            
            restaurantCard.addEventListener('click', () => showMenu(restaurant.id));
            restaurantList.appendChild(restaurantCard);
        });
    }

    function renderFeaturedItems() {
        featuredItems.innerHTML = '';
        const featured = [
            { ...data.restaurants[0].menu[0], restaurant: data.restaurants[0] },
            { ...data.restaurants[1].menu[0], restaurant: data.restaurants[1] },
            { ...data.restaurants[2].menu[0], restaurant: data.restaurants[2] },
            { ...data.restaurants[3].menu[0], restaurant: data.restaurants[3] },
            { ...data.restaurants[4].menu[0], restaurant: data.restaurants[4] }
        ];

        featured.forEach(item => {
            const featuredItemCard = document.createElement('div');
            featuredItemCard.className = 'card';
            featuredItemCard.innerHTML = `
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p><em>${item.restaurant.name}</em></p>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="button-primary add-to-cart" data-item-id="${item.id}">Add to Cart</button>
                </div>
            `;
            featuredItems.appendChild(featuredItemCard);
        });
    }

    function renderMenu(restaurantId) {
        const restaurant = data.restaurants.find(r => r.id === restaurantId);
        menuRestaurantName.textContent = restaurant.name;
        menuList.innerHTML = '';

        restaurant.menu.forEach(item => {
            const menuItemCard = document.createElement('div');
            menuItemCard.className = 'card';
            menuItemCard.innerHTML = `
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="button-primary add-to-cart" data-item-id="${item.id}">Add to Cart</button>
                </div>
            `;
            menuList.appendChild(menuItemCard);
        });
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        const cartGrouped = cart.reduce((acc, item) => {
            acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
            acc[item.id].quantity++;
            return acc;
        }, {});

        Object.values(cartGrouped).forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-change" data-item-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-change" data-item-id="${item.id}" data-change="1">+</button>
                </div>
            `;

            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
        checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
    }

    // --- VIEW NAVIGATION ---
    function showRestaurants() {
        restaurantsView.classList.remove('hidden');
        checkoutView.classList.add('hidden');
        menuView.classList.add('hidden');
        searchInput.value = '';
        renderRestaurants();
        renderFeaturedItems();
    }

    function showMenu(restaurantId) {
        renderMenu(restaurantId);
        restaurantsView.classList.add('hidden');
        menuView.classList.remove('hidden');
    }

    function showCheckout() {
        cartView.classList.remove('visible');
        checkoutView.classList.remove('hidden');
        restaurantsView.classList.add('hidden');
        menuView.classList.add('hidden');
    }

    function openCart() {
        renderCart();
        cartView.classList.add('visible');
    }

    function closeCart() {
        cartView.classList.remove('visible');
    }

    function toggleCart() {
        if (cartView.classList.contains('visible')) {
            closeCart();
        } else {
            openCart();
        }
    }

    function showCartNotification() {
        cartButton.classList.add('item-added');
        cartCount.textContent = cart.length;
        setTimeout(() => {
            cartButton.classList.remove('item-added');
        }, 300);
    }

    // --- EVENT HANDLERS ---
    function handleAddToCart(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.dataset.itemId);
            let item;
            data.restaurants.forEach(restaurant => {
                const foundItem = restaurant.menu.find(m => m.id === itemId);
                if (foundItem) item = foundItem;
            });
            if (item) {
                cart.push(item);
                renderCart();
                showCartNotification();
            }
        }
    }

    function handleCartQuantityChange(e) {
        if (e.target.classList.contains('quantity-change')) {
            const itemId = parseInt(e.target.dataset.itemId);
            const change = parseInt(e.target.dataset.change);

            if (change === 1) {
                const item = cart.find(i => i.id === itemId);
                if (item) cart.push(item);
            } else if (change === -1) {
                const itemIndex = cart.findIndex(i => i.id === itemId);
                if (itemIndex > -1) {
                    cart.splice(itemIndex, 1);
                }
            }
            renderCart();
        }
    }

    function handleCheckoutSubmit(e) {
        e.preventDefault();
        alert('Order placed successfully! (this is a demo)');
        cart = [];
        renderCart();
        closeCart();
        showRestaurants();
        checkoutForm.reset();
    }

    // --- EVENT LISTENERS ---
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeCart();
        showRestaurants();
    });

    searchInput.addEventListener('input', (e) => {
        renderRestaurants(e.target.value);
    });

    backToRestaurantsButton.addEventListener('click', showRestaurants);
    cartButton.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', closeCart);
    menuList.addEventListener('click', handleAddToCart);
    featuredItems.addEventListener('click', handleAddToCart);
    cartItems.addEventListener('click', handleCartQuantityChange);
    checkoutButton.addEventListener('click', showCheckout);
    backToCartButton.addEventListener('click', () => {
        checkoutView.classList.add('hidden');
        openCart();
    });
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // --- INITIAL RENDER ---
    showRestaurants();
});