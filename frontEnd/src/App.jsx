import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ErrorNotFound from "./components/ErrorNotFound";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common/commonApi";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/AdminPanel";
import AllUsers from "./pages/AllUsers";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SearchProduct from "./pages/SearchProduct";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Order from "./pages/Order";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUser = async () => {
    const dataResponse = await fetch(SummaryApi.currentUser.url, {
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    fetchUser();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUser, // fetching user details
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productCategory/" element={<CategoryProduct />} />
            <Route  path = "/product/:id" element = {<ProductDetails/>} />
            <Route  path = "/cart" element = {<Cart/>} />
            <Route  path = "/search" element = {<SearchProduct/>} />
            <Route  path = "/success" element = {<Success/>} />
            <Route  path = "/cancel" element = {<Cancel/>} />
            <Route  path = "/order" element = {<Order/>} />
            <Route path="/adminPanel/*" element={<AdminPanel />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
