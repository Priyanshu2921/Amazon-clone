import React, { useState } from "react";
import { Menu, Close, ShoppingCart, Search,Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function AmazonHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInClick = () => {
    
    navigate("/Sign-up-Form"); 
  };

  return (
    <>
      <header className="w-full h-[60px] bg-[#0f1111] flex items-center justify-between px-4 py-2 md:hidden">
        {/* Left Section: Hamburger Menu + Logo */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu */}
          <button onClick={handleMenuToggle} className="relative">
            <Menu fontSize="large" style={{ color: "white" }} />
          </button>

          {/* Amazon Logo */}
          <div className="flex items-center">
            <img
              className="w-[90px] h-[30px] object-contain cursor-pointer"
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon Logo"
            />
            <span className="text-white text-xs">.in</span>
          </div>
        </div>

        {/* Right Section: Sign In and Cart */}
        <div className="flex items-center space-x-4">
          {/* Sign In Link */}
          <button className="text-white text-sm" onClick={handleSignInClick}>
            Sign in
          </button>

          {/* Shopping Cart */}
          <div className="relative flex items-center">
            <ShoppingCart style={{ color: "white" }} />
            <span className="absolute -top-1 -right-2 bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center text-black text-xs">
              0
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50">
          <div className="relative w-4/5 max-w-[300px] bg-white h-full">
            <button
              onClick={handleMenuToggle}
              className="absolute top-4 right-4"
            >
              <Close fontSize="large" style={{ color: "black" }} />
            </button>
            <div className="p-4">
              {/* Menu Content */}
              <ul className="space-y-4 text-black">
                <li><a href="#" className="text-lg">Home</a></li>
                <li><a href="#" className="text-lg">Products</a></li>
                <li><a href="#" className="text-lg">Orders</a></li>
                <li><a href="#" className="text-lg">Cart</a></li>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export function MobileSearchBar() {
  return (
    <div className="w-full bg-[#232f3e] p-3 md:hidden">
      <div className="flex items-center w-full bg-white rounded-lg overflow-hidden">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Amazon.in"
          className="flex-grow h-[30px] px-4 text-sm outline-none"
        />

        {/* Search Button */}
        <button className="h-[40px] w-[45px] bg-yellow-400 flex items-center justify-center">
          <Search fontSize="small" />
        </button>
      </div>

      {/* Additional Links: Shop By, Deals, etc. */}
      <div className="flex justify-between text-white text-xs mt-2">
        <a href="#" className="hover:underline">Shop By Category</a>
        <a href="#" className="hover:underline">Your Lists</a>
        <a href="#" className="hover:underline">Deals</a>
        <a href="#" className="hover:underline">Sell</a>
      </div>

      {/* Location Information */}
      <div className="flex items-center text-white text-xs mt-2">
        <Person fontSize="small" />
        <span className="ml-2">Delivering to New Delhi 110003 - Update location</span>
      </div>
    </div>
  );
}