const stripe = require("../config/stripe");
const addToCartModel = require("../model/cart_model");
const orderModel = require("../model/orderProduct_model");
const { updateStockAfterPayment } = require("./payment_controller");
require("dotenv").config();

async function getLineItems(lineItems) {
    let productItems = [];
    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId;
            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images
            }
            productItems.push(productData)
        }   
    }
    updateStockAfterPayment(productItems)
    return productItems;
}
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;
const webhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const payloadString = JSON.stringify(req.body);
    // console.log("endpoint:" ,endpointSecret);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    });
    let event;

    try {        
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret)
    } catch (error) {
        res.send(`webhook error: ${error.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        // console.log("entered completed session");
        const session = event.data.object;
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        const productDetails = await getLineItems(lineItems)
        const orderDetails = {
            productDetails: productDetails,
            email: session.customer_email,
            userId: session.metadata.userId,
            paymentDetails: {
                paymentId: session.payment_intent,
                payment_method_type: session.payment_method_types,
                payment_status: session.payment_status
            },
            shipping_options: session.shipping_options.map((val) => {
                return {
                    ...val, shipping_amount: val.shipping_amount / 100
                }
            }),
            totalAmount: session.amount_total / 100
        }
        const order = await orderModel.create(orderDetails)
        if (order?._id) {
            await addToCartModel.deleteMany({ userId: session.metadata.userId })
        }
    }
    res.status(200).send();
}

module.exports = { webhooks }