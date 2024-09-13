import React, { useState, useEffect } from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/August/Unrec/BAU/21Aug/2-1._CB565867124_.jpg", // Image 1
    "https://images-eu.ssl-images-amazon.com/images/G/31/img18/Lawn_Garden/Ud/2024/September/Dengue/Hero/GW-heros-Pc-8._CB564967377_.jpg", // Image 2
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/GW-Hero-PC_BBAug23_Soft-toys_with-Apay_Lifestyle_2x._CB597740150_.jpg", // Image 3
  ];

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
            src={images[currentIndex]}
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
