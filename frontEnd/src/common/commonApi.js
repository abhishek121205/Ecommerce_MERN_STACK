const backendDomain = import.meta.env.VITE_APP_BACKEND_URL //"http://localhost:8010"

const SummaryApi = {
    // user routers
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "POST"
    },
    logIn : {
        url : `${backendDomain}/api/login`,
        method : "POST"
    },
    currentUser : {
        url : `${backendDomain}/api/userDetails`,
        method : "GET"
    },
    logoutUser : {
        url : `${backendDomain}/api/logout`,
        method : "GET"
    },
    allUsers : {
        url : `${backendDomain}/api/allUsers`,
        method : "GET"
    },
    updateUser : {
        url : `${backendDomain}/api/updateUser`,
        method : "POST"
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addToCart`,
        method : "POST"
    },
    addToCartProductCount: {
        url : `${backendDomain}/api/addToCartCounter`,
        method : "GET"
    },
    viewCartProducts: {
        url : `${backendDomain}/api/viewCart`,
        method : "GET"
    },
    updateCartProduct: {
        url : `${backendDomain}/api/updateCart`,
        method : "PATCH"
    },
    deleteCartProduct: {
        url : `${backendDomain}/api/deleteCart`,
        method : "DELETE"
    },
    deleteUser: {
        url : `${backendDomain}/api/deleteUser`,
        method : "DELETE"
    },
    // product routers
    uploadProduct : {
        url : `${backendDomain}/product/upload-product`,
        method : "POST"
    },
    allProduct : {
        url : `${backendDomain}/product/getProduct`,
        method : "GET"
    },
    updateProduct : {
        url : `${backendDomain}/product/updateProduct`,
        method : "POST"
    },
    getCategoryOne : {
        url : `${backendDomain}/product/getProductCategory`,
        method : "GET"
    },
    getCategoryWise : {
        url : `${backendDomain}/product/getProductWiseCategory`,
        method : "POST"
    },
    productDetails : {
        url : `${backendDomain}/product/getProductDetails`,
        method : "POST"
    },
    filterProduct : {
        url : `${backendDomain}/product/filterProducts`,
        method : "POST"
    },
    searchProduct : {
        url : `${backendDomain}/product/search`,
        method : 'GET'
    },
    deleteProduct : {
        url : `${backendDomain}/product/deleteProduct`,
        method : 'DELETE'
    },
    paymentCheckout : {
        url : `${backendDomain}/product/checkout`,
        method : 'POST'
    },
    order : {
        url : `${backendDomain}/product/orderList`,
        method : 'GET'
    },
    allOrders : {
        url : `${backendDomain}/product/allOrder`,
        method : 'GET'
    },
}

export default SummaryApi