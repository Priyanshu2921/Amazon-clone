import React, { useEffect, useState } from "react";

export function MobileCarousel() {
  const slides = [
    { src: "https://m.media-amazon.com/images/I/811yKuaCUML._SR1236,1080_.png", alt: "Slide 1" },
    { src: "https://m.media-amazon.com/images/I/81rTYK+5-GL._SR1236,1080_.png", alt: "Slide 2" },
    { src: "https://m.media-amazon.com/images/I/71xgmXymFyL._SR1236,1080_.jpg", alt: "Slide 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="md:hidden w-full overflow-hidden relative">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
