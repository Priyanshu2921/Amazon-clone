import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../JSON files/product.json";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { addToCart } from '../../store/cartslice';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [quantity, setQuantity] = useState(1); 
  const [popupVisible, setPopupVisible] = useState(false); 

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const emi = Math.round(product.price / 12);

  const handleSwipe = (direction) => {
    const currentIndex = product.images.indexOf(selectedImage);
    if (direction === "left" && currentIndex < product.images.length - 1) {
      setSelectedImage(product.images[currentIndex + 1]);
    } else if (direction === "right" && currentIndex > 0) {
      setSelectedImage(product.images[currentIndex - 1]);
    }
  };

  const handleDotClick = (index) => {
    setSelectedImage(product.images[index]);
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

 // Function to handle adding the product to the cart
const handleAddToCart = () => {
  dispatch(addToCart({ ...product, quantity })); // Pass selected quantity
  setPopupVisible(true); // Show popup
  setTimeout(() => setPopupVisible(false), 2000); // Hide popup after 2 seconds
};


  // Function to handle quantity change
  const handleQuantityChange = (value) => {
    if (quantity + value >= 1) {
      setQuantity(quantity + value);
    }
  };

  return (
    <div className="container mx-auto pl-4 pt-4 flex flex-col lg:flex-row">
      {/* Product Images (Left Section) */}
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
              onClick={() => setShowMoreImages(!showMoreImages)}
            >
              {showMoreImages ? "Show Less" : "Show More.."}
            </button>
          )}
        </div>
      </div>

      {/* Carousel for mobile view */}
      <div className="lg:hidden w-full relative">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full h-96 object-contain"
        />

        {/* Left and right swipe buttons for mobile view */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSwipe("right")}
        >
          &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSwipe("left")}
        >
          &gt;
        </button>

        {/* Bulletins (Dots) for carousel */}
        <div className="flex justify-center space-x-2 mt-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
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
      <div className="hidden sm:flex w-full items-center justify-center">
        <img
          src={hoveredImage || selectedImage}
          alt="Selected Product"
          className="w-auto h-auto max-h-96 cursor-pointer mb-2"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Product Info (Right Section) */}
      <div className="w-full lg:w-1/3">
        <h1 className="text-2xl font-bold">{product.name}</h1>

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
            <span className="line-through">₹{product.originalPrice}</span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-yellow-500 flex align-middle justify-start">
            Rating: {product.rating}
          </p>
          {renderStars(product.rating)}
        </div>

        {/* Specifications */}
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

        {/* Quantity Section */}
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
        

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-0 bg-blue-500 text-white py-2 px-4 rounded hover:bg-black "
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
          {quantity} items added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductPage;
