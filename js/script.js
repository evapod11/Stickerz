// Initialize the cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display items in the cart
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Clear the current cart display

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                <button onclick="removeFromCart('${item.name}')">Remove</button>`;
            cartItems.appendChild(cartItem);
        });
    }

    // Calculate and display total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart by name
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert('Cart has been cleared!');
}

// Initial display of cart contents when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Sticker data array
const stickers = [
    { name: 'Sticker 1', price: 10, img: 'images/gray_skull.JPG' },
    { name: 'Sticker 2', price: 15, img: 'images/beige_skull.JPG' },
    { name: 'Sticker 3', price: 20, img: 'images/mr_rain.JPG' },
    // Add more stickers as needed
];

// Populate the carousel with sticker items
const carousel = document.querySelector('.carousel');
stickers.forEach(sticker => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
        <img src="${sticker.img}" alt="${sticker.name}">
        <div class="item-details">
            <h3>${sticker.name}</h3>
            <p>$${sticker.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>`;
    carousel.appendChild(item);
});

// Add event listeners for the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const carouselItem = event.target.closest('.carousel-item');
        const name = carouselItem.querySelector('h3').innerText;
        const price = parseFloat(carouselItem.querySelector('p').innerText.replace('$', ''));
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if already in cart
        } else {
            cart.push({ name, price, quantity: 1 }); // Add new item to cart
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Update cart display
        alert(`${name} has been added to your cart!`); // Confirmation message
    });
});

// After 5 seconds, stop the carousel's animation
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    
    setTimeout(() => {
        carousel.style.animation = 'none';
    }, 5000); // Adjust the timing to match your animation duration
});

// Change header background based on scroll position
const header = document.querySelector('header');
document.addEventListener("scroll", function() {
    const scrollPosition = window.scrollY;
    header.style.backgroundColor = `rgba(255, 255, 255, ${0.9 - scrollPosition / 1000})`;
});
