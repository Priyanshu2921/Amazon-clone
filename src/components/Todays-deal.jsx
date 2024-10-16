import React, { useEffect, useState } from "react";
import productsData from '../Todays-product.json';

const TodaysProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch the product list from the JSON file
  useEffect(() => {
    // Simulate fetching the product data
    setProducts(productsData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Today's Deals</h1>
      <div className="space-y-6"> {/* Change to a vertical list */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex border-b pb-4 border-gray-200"
          >
            {/* Product Image */}
            <div className="w-1/6 mr-4">
              <img
                src={product.images[0]} // Use the first image from the array
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="w-3/4 flex flex-col justify-between">
              {/* Title and Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {product.description.description}
                </p>

                {/* Rating and Reviews */}
                <div className="flex items-center text-sm my-1">
                  <span className="text-yellow-500">{product.rating} ★</span>
                  <span className="ml-2 text-gray-500">
                    {product.reviews} reviews {/* Adjusted to match JSON */}
                  </span>
                </div>
              </div>

              {/* Price, Discount, and Delivery Info */}
              <div>
                <div className="flex items-center">
                  <span className="text-red-600 text-xl font-semibold">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-500 text-sm line-through ml-2">
                    M.R.P.: ₹{product.originalPrice} {/* Adjusted to match JSON */}
                  </span>
                  <span className="text-green-600 text-sm ml-2">
                    ({product.discount}% off)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  FREE delivery: {product.description.deliveryDate} {/* Adjusted to match JSON */}
                </p>
              </div>

              {/* See Options Button */}
              <div className="mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysProduct;
