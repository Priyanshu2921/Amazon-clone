import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodaysProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/todays-deal/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Today's Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isBestSeller =
            product.rating?.count > 300 && product.rating?.rate > 3;

          return (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 relative bg-white flex flex-col justify-between h-full"
            >
              {/* Conditionally Render Best Seller Badge */}
              {isBestSeller && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Best Seller
                </div>
              )}

              {/* Product Image */}
              <div
                className="cursor-pointer mb-4"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow justify-between">
                {/* Title */}
                <h2
                  className="text-sm font-semibold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.title}
                </h2>

                {/* Rating and Reviews */}
                <div className="flex items-center text-sm my-2">
                  <span className="text-yellow-500">
                    {product.rating?.rate} ★
                  </span>
                  <span className="ml-2 text-gray-500">
                    {product.rating?.count} reviews
                  </span>
                </div>

                {/* Price and Offer Details */}
                <div className="my-2">
                  <span className="text-xl font-semibold text-red-600">
                    ₹{product.price}
                  </span>
                  <div className="text-xs text-gray-500 line-through">
                    ₹{(product.price * 1.1).toFixed(2)}{" "}
                    {/* Example discount calculation */}
                  </div>
                  <div className="text-xs text-green-600">Save 10%</div>
                  <div className="text-xs text-blue-600">
                    FREE Delivery Tomorrow 6 am - 11 am
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-1 px-2 rounded-full text-xs">
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaysProduct;
