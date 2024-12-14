const stripe = require("../config/stripe");
const orderModel = require("../model/orderProduct_model");
const productModel = require("../model/product_model");
const userModel = require("../model/user_model");

const checkoutController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const user = await userModel.findOne({ _id: req.userId })

        for (const item of cartItems) {
            const product = await productModel.findById(item.productId._id);
            if (!product) throw new Error(`Product with ID ${item.productId._id} not found.`)
            if (product.stock < item.quantity) throw new Error(`Insufficient stock for product ${product.productName}. Available: ${product.stock}, Requested: ${item.quantity}.`)
        }

        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    shipping_rate: "shr_1QJzEyAheckr7ICFcnik8wZA"  // Changed from shipping_rates to shipping_rate
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: req.userId
            },
            line_items: cartItems.map((val) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: val.productId.productName,
                            images: val.productId.productImage,
                            metadata: {
                                productId: val.productId._id
                            }
                        },
                        unit_amount: val.productId.sellingPrice * 100  // Assuming sellingPrice is in rupees
                    },
                    adjustable_quantity: {
                        enabled: false,
                        // minimum: 1,
                        // maximum:val.productId.stock
                    },
                    quantity: val.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        res.status(303).json(session);
    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

const orderController = async (req, res) => {
    try {
        const currentUser = req.userId;
        const orderList = await orderModel.find({ userId: currentUser }).sort({ createdAt: -1 })
        res.json({
            data: orderList,
            suucess: true,
            message: "Order List"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const allOrderController = async (req, res) => {
    try {
        const userId = req.userId

        const user = await userModel.findById(userId)

        if (user.role !== 'ADMIN') {
            res.status(500).json({
                message: "not access"
            })
        }

        const AllOrder = await orderModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            data: AllOrder,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

const updateStockAfterPayment = async (cartItems) => {
    for (const item of cartItems) {
        await productModel.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -item.quantity } },
            { new: true }
        );
    }
};

module.exports = { checkoutController, orderController, allOrderController, updateStockAfterPayment }