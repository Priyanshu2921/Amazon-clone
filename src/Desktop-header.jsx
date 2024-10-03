import React from "react";
import { useNavigate } from "react-router-dom"; 
import { LocationOn, Search, ShoppingCart } from "@mui/icons-material";
import { useSelector } from 'react-redux'; // Import useSelector

export function DesktopHeader() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const cartItems = useSelector((state) => state.cart); // Assuming your cart slice structure

  // Calculate total quantity in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignInClick = () => {
    navigate("/Sign-Up-Form"); // Navigate to the sign-up form when clicked
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart page when clicked
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the main page when logo is clicked
  };

  return (
    <header className="w-full h-[60px] bg-[#0f1111] p-2 items-center justify-between md:flex hidden">
      <div className="flex items-center space-x-2 lg:space-x-4 w-full">
        {/* Logo */}
        <div
          className="flex items-center w-[100px] lg:w-[128px] h-[60px] cursor-pointer"
          onClick={handleLogoClick} // Add the onClick event to handle routing
        >
          <img
            className="w-full h-full object-contain"
            src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
            alt="Amazon Logo"
          />
          <span className="text-white hidden sm:inline-block">.in</span>
        </div>

        {/* Location Info */}
        <div className="hidden lg:flex flex-col text-white">
          <span className="text-xs pl-2 font-bold">Deliver to</span>
          <div className="flex items-center">
            <LocationOn fontSize="small" />
            <span className="ml-1 text-sm font-bold">New Delhi 110043</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-grow h-[40px] bg-white rounded-md overflow-hidden shadow-sm mx-2">
          {/* Category Dropdown */}
          <div className="h-full">
            <select className="w-auto sm:w-[55px] h-full bg-gray-100 text-sm text-gray-700 p-2 rounded-l-md border-r">
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="w-full h-full px-2 sm:px-4 text-sm text-gray-800 outline-none"
          />

          {/* Search Button */}
          <button className="h-full w-[45px] bg-yellow-400 flex items-center justify-center text-black">
            <Search fontSize="small" />
          </button>
        </div>

        {/* Account Info and Cart */}
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-5 text-white text-xs w-auto">
          {/* Language Selector */}
          <button className="hidden sm:flex w-[50px] md:w-[72px] h-[50px] items-center justify-center p-1 font-bold text-base sm:text-lg">
            EN
          </button>

          {/* Account & Lists */}
          <div
            className="flex flex-col justify-center text-left w-[80px] sm:w-[110px] md:w-[130px] cursor-pointer"
            onClick={handleSignInClick} // Add the onClick event to handle routing
          >
            <span className="font-bold leading-none text-[9px] sm:text-[10px] md:text-sm truncate">
              Hello, Sign in
            </span>
            <strong className="font-bold text-[10px] sm:text-[12px] md:text-[15px] leading-none truncate">
              Account & Lists
            </strong>
          </div>

          {/* Returns & Orders */}
          <div className="flex flex-col justify-center text-left w-[60px] sm:w-[76px]">
            <span className="font-bold leading-none text-[9px] sm:text-[10px] md:text-sm truncate">
              Returns
            </span>
            <strong className="font-bold text-[10px] sm:text-[12px] md:text-[15px] leading-none truncate">
              & Orders
            </strong>
          </div>

          {/* Shopping Cart */}
          <div className="relative flex items-center cursor-pointer" onClick={handleCartClick}>
            <div className="flex justify-center items-center relative">
              <ShoppingCart />
              <span className="absolute top-0 right-0 bg-yellow-400 rounded-md w-[16px] h-[16px] flex items-center justify-center text-black text-xs">
                {totalQuantity} {/* Show total quantity, will show 0 if cart is empty */}
              </span>
            </div>
            <div className="ml-1 text-[12px] sm:text-[14px] md:text-[17px] font-bold">Cart</div>
          </div>
        </div>
      </div>
    </header>
  );
}
