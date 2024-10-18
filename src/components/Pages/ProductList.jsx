import React from 'react';
import products from '../../JSON files/product.json';
import { calculateDiscountPercentage } from '../../utils/discountutils'; 

const ProductList = () => {
  return (
    <div className="w-full px-0" style={{ backgroundColor: '#ffd77d' }}>
      <h1 className="text-3xl font-bold mb-6 pt-4 flex text-center justify-center">
        Sale is on!!! Shop now
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {products.map((product) => {
          const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);

          return (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl relative transition-all duration-300">
              {/* Change Link to an anchor tag */}
              <a href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer">
                
                {/* Discount Label */}
                {discountPercentage > 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg text-sm">
                    {discountPercentage}% off
                  </div>
                )}
                
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md sm:h-40 md:h-48 lg:h-64 xl:h-72"
                />

                {/* Product Information */}
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

                {/* Pricing Information */}
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      M.R.P.: ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <p className="text-yellow-500 mt-1">{product.rating} ★</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
