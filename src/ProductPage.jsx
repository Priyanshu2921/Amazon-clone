import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "./product.json";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart } from './store/cartslice'; // Import addToCart action

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const dispatch = useDispatch(); // Initialize dispatch
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreImages, setShowMoreImages] = useState(false);

  // Discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  // EMI calculation (12 months)
  const emi = Math.round(product.price / 12);

  // Swipe handling for mobile view
  const handleSwipe = (direction) => {
    const currentIndex = product.images.indexOf(selectedImage);
    if (direction === "left" && currentIndex < product.images.length - 1) {
      setSelectedImage(product.images[currentIndex + 1]);
    } else if (direction === "right" && currentIndex > 0) {
      setSelectedImage(product.images[currentIndex - 1]);
    }
  };

  // Handler for bulletins (dots) click
  const handleDotClick = (index) => {
    setSelectedImage(product.images[index]);
  };

  // Star rating rendering based on rating value
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

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    // Dispatch the addToCart action with the product data
    dispatch(addToCart({ ...product, quantity: 1 })); // Add quantity property to the product
  };

  return (
    <div className="container mx-auto pl-4 pt-4 flex flex-col lg:flex-row">
      {/* Product Images (Left Section) - For desktop view only */}
      <div className="hidden lg:flex w-1/10 flex-col space-y-2 overflow-hidden h-100">
        {product.images
          .slice(0, showMoreImages ? product.images.length : 4)
          .map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              onMouseEnter={() => setHoveredImage(image)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(image)}
              className={`w-20 h-20 object-cover cursor-pointer border transition-all ${
                selectedImage === image || hoveredImage === image
                  ? "border-blue-500"
                  : "border-gray-200"
              } hover:border-blue-500`}
            />
          ))}

        {/* Show More / Show Less Button */}
        <div className="flex flex-col mt-2">
          {product.images.length > 4 && (
            <button
              className="text-blue-500 flex items-center"
              onClick={() => setShowMoreImages(!showMoreImages)} // Toggle between show more and show less
            >
              {showMoreImages ? "Show Less" : "Show More.."}{" "}
              {/* Display button text based on state */}
            </button>
          )}
        </div>
      </div>

      {/* Carousel for mobile view */}
      <div className="lg:hidden w-full relative">
        <img
          src={selectedImage} // Display only the selected image
          alt="Selected Product"
          className="w-full h-96 object-contain"
        />

        {/* Left and right swipe buttons for mobile view */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSwipe("right")} // Change the direction to right for the previous image
        >
          &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSwipe("left")} // Change the direction to left for the next image
        >
          &gt;
        </button>

        {/* Bulletins (Dots) for carousel */}
        <div className="flex justify-center space-x-2 mt-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)} // Handle dot click
              className={`w-3 h-3 rounded-full ${
                selectedImage === product.images[index]
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Image Section (Shared between both desktop and mobile) */}
      <div className=" hidden sm:flex w-full  items-center justify-center">
        <img
          src={hoveredImage || selectedImage}
          alt="Selected Product"
          className="w-auto h-auto max-h-96 cursor-pointer mb-2" // Adjusted margin-bottom
          onClick={() => setIsModalOpen(true)} // Open modal on click
        />
      </div>

      {/* Product Info (Right Section) - Shared between both desktop and mobile */}
      <div className="w-full lg:w-1/3">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <hr className="border-gray-600 mb-4" />

        <div className="bg-red-800 rounded-lg p-4 max-w-xs mx-auto">
          <h2 className="text-white text-center  text-2xl font-bold">
            Great Indian Sale
          </h2>
        </div>

        <div className="flex flex-col">
          <div className="text-xl text-black-500 font-semibold mt-2">
            <span className=" text-red-500">-{discountPercentage}% </span>
            <span>₹{product.price}</span>
          </div>

          <div className="text-gray-500 text-xs">
            <span>M.R.P </span>
            <span className="line-through">₹{product.originalPrice}</span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-yellow-500 flex align-middle justify-start">
            Rating: {product.rating}
          </p>
          {renderStars(product.rating)} {/* Render star rating */}
        </div>

        {/* Offers Section */}
        <div className="mt-4 bg-red-100 p-2 rounded">
          <p className="text-sm font-semibold text-red-600">In this sale</p>
          <p className="text-sm">
            Bank Offer: Flat INR 3000 Instant Discount on ALL Banks Card Txn
          </p>
          <p className="text-sm">No Cost EMI options available</p>
        </div>

        {/* Specifications Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Specifications:</h2>
          <ul className="list-disc list-inside">
            <li>Processor: {product.description.processor}</li>
            <li>RAM: {product.description.ram}</li>
            <li>Storage: {product.description.storage}</li>
            <li>Battery: {product.description.battery}</li>
            <li>Charging: {product.description.charging}</li>
          </ul>
        </div>

        {/* EMI & Delivery Info */}
        <div className="mt-4 flex items-center space-x-4">
          <p className="text-sm">Starting EMI: ₹{emi}/month</p>
          <p className="text-sm text-gray-500">
            Delivery by: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart} // Call add to cart handler
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* Modal for image zoom */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <button
              onClick={() => setIsModalOpen(false)} // Close modal
              className="absolute top-2 right-2 text-gray-600"
            >
              <CloseIcon />
            </button>
            <img
              src={selectedImage}
              alt="Product Zoomed"
              className="max-h-[90vh] object-contain" // Ensure image fits within viewport
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
