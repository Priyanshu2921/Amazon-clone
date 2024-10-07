import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="hidden md:flex bg-[#232f3e] p-2  justify-start">
      <ul className="flex space-x-8 pl-5 text-white whitespace-nowrap overflow-x-auto">
        <li className="relative cursor-pointer group">
          <Link to="/todays-deal">Today's Deal</Link>
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group">
          AmazonminiTV
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group">
          Sell
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group">
          Mobile
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group">
          Best Sellers
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group">
          Customer Service
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group hidden md:flex">
          Electronic
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
        <li className="relative cursor-pointer group hidden lg:flex">
          Fashion
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-transparent group-hover:border-white transition-all duration-300"></div>
        </li>
      </ul>
    </nav>
  );
};
