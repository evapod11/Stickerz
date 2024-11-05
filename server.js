// Import required modules
const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your Stripe secret key
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Route to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sticker Product', // Name of the product
                            images: ['https://example.com/path-to-your-image.jpg'], // URL of your product image
                        },
                        unit_amount: 2000, // Amount in cents ($20.00)
                    },
                    quantity: 1, // Quantity of the item
                },
            ],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success.html', // URL to redirect upon success
            cancel_url: 'https://yourdomain.com/cancel.html', // URL to redirect upon cancellation
        });

        // Send the session ID to the client
        res.json({ id: session.id });
    } catch (error) {
        // Handle errors
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
