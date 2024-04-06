import { useState } from "react";

//icons
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

//router imports
import { Link, useNavigate } from "react-router-dom";

import "./Navigation.css";

const Navigation = () => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setshowSidebar(!dropdownOpen);
  };
  const closeSidebar = () => {
    setshowSidebar(false);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={
        showSidebar
          ? "hidden"
          : " xl:flex lg:flex md:hidden sm:hidden flex-col justify-around p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed"
      }
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-10"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>


        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-10"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-10"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Shopping Cart</span>{" "}
        </Link>


        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-10"
        >
          <AiOutlineHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{" "}
        </Link>
      </div>

        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-10"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Log-in</span>{" "}
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-10"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
            </Link>
          </li>
        </ul>
    </div>
  );
};

export default Navigation;
