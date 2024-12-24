const bcrypt = require("bcrypt");
const userModel = require("../model/user_model");
const jwt = require('jsonwebtoken');
const addToCartModel = require("../model/cart_model");
const nodemailer = require("nodemailer");
const productModel = require("../model/product_model");

// creating user
const userSignUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user) throw new Error("Already exists");
        if (!email) throw new Error("Provide Email");
        if (!userName) throw new Error("Provide User Name");
        if (!password) throw new Error("Provide password");

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }
        const userCeate = await userModel.create(payload);

        res.status(201).json({
            data: userCeate,
            message: "User created successfully",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

// logining user
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) throw new Error("Provide Email");
        if (!password) throw new Error("Provide password");

        const user = await userModel.findOne({ email });

        if (!user) throw new Error("User Not found");

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }

            res.cookie("token", token, tokenOption).status(200).json({
                data: token,
                message: "Login Successfull",
                success: true,
                error: false
            })
        } else {
            throw new Error("Incorrect Password")
        }

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

// sending user details when login
const userDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        res.status(200).json({
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// user logout
const userLogout = async (req, res) => {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.clearCookie("token",tokenOption);

        res.json({
            message: "Logout successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// user update
const updateUser = async (req, res) => {
    try {

        // const sessionUser = req.userId;

        const { userId, email, userName, role } = req.body;

        const payload = {
            // ...(email && { email:email }),
            // ...(userName && { userName:userName }),
            ...(role && { role: role }),
        }

        // const user = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload);

        res.status(200).json({
            data: updateUser,
            message: "user updated",
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// getting all users
const allUsers = async (req, res) => {
    try {
        const getUsers = await userModel.find({});
        res.status(200).json({
            message: 'All Users Data',
            data: getUsers,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId
        const checkStock = await productModel.findOne({ _id: productId })
        if (checkStock?.stock <= 0) throw new Error("Product is out of stock")
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })
        if (isProductAvailable) {
            return res.json({
                message: "Already exits in Add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const addedProduct = await addToCartModel.create(payload);

        return res.status(201).json({
            data: addedProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        })


    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

const addToCartCounter = async (req, res) => {
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: { count: count },
            message: "ok",
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: false,
            success: false,
        })
    }
}

const viewCartProducts = async (req, res) => {
    try {
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")

        res.json({
            data: allProduct,
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const addToCartProductId = req?.body?._id
        const qty = req.body.quantity
        const productid = req?.body?.productid
        const checkStock = await productModel.findOne({ _id: productid._id });
        if (qty > checkStock.stock) throw new Error("No More Quantity Available")

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        })
        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const addToCartProductId = req?.params?.id
        // console.log(addToCartProductId);
        await addToCartModel.findByIdAndDelete(addToCartProductId)
        res.status(200).json({
            message: "Product Deleted",
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const userData = await userModel.findByIdAndDelete(id);
        const cartData = await addToCartModel.deleteMany({ userId: id });
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        res.json({
            data: error.message || error,
            error: true,
            message: "Error in deleting product"
        })
    }
}
let otp = 1;
const newOtp = () => {
    otp = Math.floor(100000 + Math.random() * 900000);
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) throw new Error("User Not Exist");
        // console.log(user);
        newOtp();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "trigonx1212@gmail.com",
                pass: process.env.APP_PASS
            }
        })

        const mailerOptions = {
            from: "trigonx1212@gmail.com",
            to: user.email,
            subject: "Reset Password",
            html: `${otp}`
        }

        transporter.sendMail(mailerOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("otp sent successfullt");
            }
        })
        res.status(200).json({ success: true, message: "OTP Send Successfully" });
    } catch (error) {
        res.status(401).json({ message: error.message || error, error: true })
    }

}

const verifyOtp = (req, res) => {
    try {
        const { otp } = req.body;
        if (req.body.otp == otp) {
            return res.status(200).json({ message: "Otp verified", success: true });
        } else {
            throw new Error("OTP Invalid");
        }
    } catch (error) {
        res.status(401).json({ message: error.message || error, error: true })
    }

};

const changePassword = async (req, res) => {
    try {
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.findOne({ email: email });
        await userModel.findByIdAndUpdate(user.id, { password: hashedPassword })
        res.status(200).json({ message: "Password Changes Successfully", success: true })

    } catch (error) {
        res.status(401).json({ message: "Error In Password Change", error: true })
    }
}

module.exports = { userSignUp, resetPassword, userLogin, verifyOtp, deleteUser, updateUser, userDetails, userLogout, allUsers, addToCart, addToCartCounter, viewCartProducts, updateCart, deleteProduct, changePassword }