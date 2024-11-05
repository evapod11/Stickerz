// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path'); // Import path for serving static files

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve your main HTML file
});

// Define route to create a Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sticker Product',
                            images: ['https://yourdomain.com/path-to-image.jpg'],
                        },
                        unit_amount: 2000, // $20.00 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success.html',
            cancel_url: 'https://yourdomain.com/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
