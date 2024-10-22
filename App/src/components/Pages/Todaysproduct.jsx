import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";


const TodaysPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null); // State to store product data
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product data from the API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); // Set the default selected image
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (product) {
           setPopupVisible(true); // Show popup
      setTimeout(() => setPopupVisible(false), 2000); // Hide popup after 2 seconds
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (value) => {
    if (quantity + value >= 1) {
      setQuantity(quantity + value);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <div className="flex items-center">
        {Array.from({ length: totalStars }, (_, index) => {
          if (index < filledStars) {
            return <StarIcon key={index} className="text-yellow-500" />;
          } else if (index === filledStars && halfStar) {
            return (
              <StarBorderPurple500Icon
                key={index}
                className="text-yellow-500"
              />
            );
          }
          return (
            <StarBorderPurple500Icon key={index} className="text-gray-300" />
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if fetching fails
  }

  if (!product) {
    return null; // If product is not available, return nothing
  }

  const discountPercentage = Math.round(
    ((product.price * 1.25 - product.price) / (product.price * 1.25)) * 100
  );
  const emi = Math.round(product.price / 12);

  return (
    <div className="container mx-auto pl-4 pt-4 flex flex-col lg:flex-row">
      {/* Left Section: Product Images */}
      <div className="hidden lg:flex w-1/10 flex-col space-y-2 overflow-hidden h-100">
        <img
          src={selectedImage}
          alt="Product"
          onMouseEnter={() => setHoveredImage(selectedImage)}
          onMouseLeave={() => setHoveredImage(null)}
          className={`w-20 h-20 object-cover cursor-pointer border transition-all ${
            selectedImage === hoveredImage ? "border-blue-500" : "border-gray-200"
          } hover:border-blue-500`}
        />
      </div>

      {/* Main Image Section */}
      <div className="hidden sm:flex w-full items-center justify-center">
        <img
          src={hoveredImage || selectedImage}
          alt="Selected Product"
          className="w-auto h-auto max-h-96 cursor-pointer mb-2"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Right Section: Product Info */}
      <div className="w-full lg:w-1/3">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <hr className="border-gray-600 mb-4" />
        <div className="bg-red-600 text-white px-2 py-1 inline-block rounded-md text-sm font-semibold mb-2">
          Great Indian Festival
        </div>
        <div className="flex flex-col">
          <div className="text-xl text-black-500 font-semibold mt-2">
            <span className="text-red-500">-{discountPercentage}% </span>
            <span>₹{product.price}</span>
          </div>
          <div className="text-gray-500 text-xs">
            <span>M.R.P </span>
            <span className="line-through">₹{(product.price * 1.25).toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-yellow-500 flex align-middle justify-start">
            Rating: {product.rating.rate}
          </p>
          {renderStars(product.rating.rate)}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="bg-gray-200 text-black py-1 px-3 rounded"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="bg-gray-200 text-black py-1 px-3 rounded"
          >
            +
          </button>

          <button
            onClick={handleAddToCart}
            className="mt-0 bg-blue-500 text-white py-2 px-4 rounded hover:bg-black"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal for image zoom */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              <CloseIcon className="bg-white" />
            </button>
            <img
              src={selectedImage}
              alt="Product Modal"
              className="w-auto h-auto max-h-screen"
            />
          </div>
        </div>
      )}

      {/* Popup for items added to cart */}
      {popupVisible && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
          {quantity} item(s) added to cart!
        </div>
      )}
    </div>
  );
};

export default TodaysPage;
