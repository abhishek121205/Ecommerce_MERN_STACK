const uploadProductPermission = require("../helpers/permission");
const productModel = require("../model/product_model");

const uploadProduct = async (req, res) => {
    try {
        const sessionUserId = req.userId;
        const { productName, brandName, category, price, sellingPrice,stock } = req.body;

        let check = await uploadProductPermission(sessionUserId);
        if (check) throw new Error("Permission denied");

        if (!productName) throw new Error("Product name required");
        if (!brandName) throw new Error("Brand name required");
        if (!category) throw new Error("Category required");
        if (!price) throw new Error("Price required");
        if (!sellingPrice) throw new Error("Selling price required");
        if (!stock) throw new Error("Stock required");

        const uploadProduct = await productModel.create(req.body);

        res.status(201).json({
            message: "Product upload successfully",
            error: false,
            success: true,
            data: uploadProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// get product

const getProduct = async (req, res) => {
    try {
        const allProduct = await productModel.find().sort({ createdAt: -1 })
        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: allProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

// update product
const updateProduct = async (req, res) => {
    try {
        let check = await uploadProductPermission(req.userId);
        if (check) throw new Error("Permission denied");
        const { _id, ...resBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(200).json({
            message: "Product update successfully",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const getCategoryProduct = async (rea, res) => {
    try {
        const productCategory = await productModel.distinct("category")

        //array to store one product from each category
        const productByCategory = []

        for (let category of productCategory) {
            const product = await productModel.findOne({ category })
            if (product) {
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message: "category product",
            data: productByCategory,
            success: true,
            error: false
        })


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// category wise products

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body || req.query
        const product = await productModel.find({ category })

        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.status(200).json({
            data: product,
            message: "Ok",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

const filterProduct = async (req, res) => {
    try {
        const categoryList = req?.body?.category || []

        const product = await productModel.find({
            category: {
                "$in": categoryList
            }
        })

        res.status(200).json({
            data: product,
            message: "product",
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q
        const regex = new RegExp(query, 'i', 'g')

        const product = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data: product,
            message: "Search Product list",
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const deleteProduct = async (req, res) => {
    try {        
        let { id } = req.body;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product Deleted Successfully",
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: "Product Not Deleted",
            success: false,
            error: true
        })
    }
}
module.exports = { uploadProduct, getProduct, updateProduct, getCategoryProduct, getCategoryWiseProduct, getProductDetails, filterProduct, searchProduct, deleteProduct }