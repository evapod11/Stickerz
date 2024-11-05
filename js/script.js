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
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    
    // After 5 seconds, stop the carousel's animation
    setTimeout(() => {
        carousel.style.animation = 'none';
    }, 5000); // Adjust the timing to match your animation duration
});

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    
    // After 5 seconds, stop the carousel's animation
    setTimeout(() => {
        const carousel = document.querySelector('.carousel');
        carousel.style.animation = 'none';
    }, 5000); // Adjust the timing to match your animation duration

    document.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        // Change header background based on scroll position
        header.style.backgroundColor = `rgba(255, 255, 255, ${0.9 - scrollPosition / 1000})`;
    });
});