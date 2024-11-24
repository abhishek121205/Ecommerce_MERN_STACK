const express = require("express")
const { userSignUp, userLogin, userDetails, userLogout, allUsers, updateUser, addToCart, addToCartCounter, viewCartProducts, updateCart , deleteProduct } = require("../controllers/user_controller")
const { authToken } = require("../middleware/authToken")

const router = express.Router()

router.post("/signup", userSignUp)
router.post("/login", userLogin)
router.get("/userDetails",authToken, userDetails)
router.get("/logout",userLogout)

router.get("/allUsers",authToken, allUsers)
router.post("/updateUser",authToken, updateUser)

router.post("/addToCart",authToken, addToCart)
router.get("/addToCartCounter",authToken, addToCartCounter)
router.get("/viewCart",authToken, viewCartProducts)
router.patch("/updateCart",authToken, updateCart)
router.delete("/deleteCart/:id", deleteProduct)

module.exports = router