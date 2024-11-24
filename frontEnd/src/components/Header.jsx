import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/commonApi";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch(null);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { cartProductCount } = useContext(Context);
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    console.log(data);

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white sticky top-0" style={{ zIndex: 990 }}>
      <div className="h-full container flex items-center justify-between mx-auto px-4">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full border rounded-full justify-between max-w-sm focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="Search Product"
            className="w-full outline-none"
            name=""
            id=""
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 rounded-r-full text-white flex items-center justify-center">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-7">
          <div className="relative flex justify-center">
            {
              user ? (
                <div
                  onClick={() => setMenu(!menu)}
                  className="text-3xl cursor-pointer relative flex justify-center"
                >
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user?.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
              ) : null
            }

            {
              menu && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {
                      user?.role == "ADMIN" && (
                        <Link
                          to={"/adminPanel/allProducts"}
                          className="hidden md:block whitespace-nowrap hover:bg-slate-100 p-2"
                          onClick={() => setMenu(!menu)}
                        >
                          Admin Panel
                        </Link>
                      )
                    }
                    <Link to={"/order"} className="hidden md:block whitespace-nowrap hover:bg-slate-100 p-2" onClick={() => setMenu(!menu)}>Your Order</Link>
                  </nav>
                </div>
              )
            }
            {/* {
              menu && (
                user?.role == "ADMIN" && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                    <nav>
                      <Link
                        to={"/adminPanel/allProducts"}
                        className="hidden md:block whitespace-nowrap hover:bg-slate-100 p-2"
                        onClick={() => setMenu(!menu)}
                      >
                        Admin Panel
                      </Link>
                    </nav>
                  </div>
                )
              )
            } */}
          </div>
          {
            user?._id && (
              <Link to={'/cart'} className="text-2xl cursor-pointer relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-red-600 text-white rounded-full w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{cartProductCount}</p>
                </div>
              </Link>
            )
          }
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-3 py-1 text-white bg-red-600 rounded-full hover:bg-red-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="flex items-center justify-center px-3 py-1 text-white bg-red-600 rounded-full hover:bg-red-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
