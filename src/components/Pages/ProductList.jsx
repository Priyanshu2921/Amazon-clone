// ProductList.js

import React, { useEffect, useState } from 'react';
import { calculateDiscountPercentage } from '../../utils/discountutils'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the Node.js API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

    const filteredProducts = products.filter(product => product.id >= 0 && product.id <= 8);

  return (
    <div id="product-list" className="w-full px-0" style={{ backgroundColor: '#ffd77d' }}>
      <h1 className="text-3xl font-bold mb-6 pt-4 flex text-center justify-center">
        Sale is on!!! Shop now
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((product) => {
          const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);

          return (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl relative transition-all duration-300">
              <a href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer">
                {discountPercentage > 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg text-sm">
                    {discountPercentage}% off
                  </div>
                )}
                
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md sm:h-40 md:h-48 lg:h-64 xl:h-72"
                />

                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      M.R.P.: ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

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
