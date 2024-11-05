const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your Stripe secret key
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Sticker Product',
                        images: ['URL_TO_YOUR_STICKER_IMAGE'], // Optional
                    },
                    unit_amount: 2000, // Amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success.html', // Your success page URL
            cancel_url: 'https://yourdomain.com/cancel.html', // Your cancel page URL
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
