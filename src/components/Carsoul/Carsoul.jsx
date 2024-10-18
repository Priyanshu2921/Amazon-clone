import React, { useState, useEffect } from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {corosalimages} from "../Image/Image"; 

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = corosalimages; 

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="w-full hidden md:block relative">
      <div className="relative w-full h-64">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-fill"
            src={images[currentIndex]} // Display current image
            alt={`Image ${currentIndex + 1}`}
          />
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 hover:bg-gray-700 z-10 flex items-center justify-center"
        >
          <ArrowBackIosIcon className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 hover:bg-gray-700 z-10 flex items-center justify-center"
        >
          <ArrowForwardIosSharpIcon className="text-white" />
        </button>
      </div>
    </div>
  );
}
