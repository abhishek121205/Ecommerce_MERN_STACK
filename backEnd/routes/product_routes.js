const express = require("express")
const { uploadProduct, getProduct, updateProduct, getCategoryProduct, getCategoryWiseProduct, getProductDetails, filterProduct, searchProduct, deleteProduct } = require("../controllers/product_controller")
const { authToken } = require("../middleware/authToken")
const { checkoutController, orderController, allOrderController } = require("../controllers/payment_controller")
const { webhooks } = require("../controllers/webhook")

const productRouter = express.Router()

productRouter.post("/upload-product",authToken,uploadProduct)
productRouter.get("/getProduct",getProduct)
productRouter.post("/updateProduct",authToken, updateProduct)
productRouter.delete("/deleteProduct",authToken,deleteProduct)
productRouter.get("/getProductCategory",getCategoryProduct)
productRouter.post("/getProductWiseCategory",getCategoryWiseProduct)
productRouter.post("/getProductDetails",getProductDetails)
productRouter.post("/filterProducts",filterProduct)
productRouter.get("/search",searchProduct)

//checkout

productRouter.post("/checkout",authToken,checkoutController);
productRouter.post("/webhook", webhooks);
productRouter.get("/orderList",authToken, orderController);
productRouter.get("/allOrder",authToken,allOrderController)

module.exports = productRouter