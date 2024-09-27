import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // Import Navigation styles

export default function DealsCarousel({ deals }) {
  return (
    <div className="max-h-[350px] overflow-hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },  // 2 slides on medium screens
          1024: { slidesPerView: 4 }, // 4 slides on large screens
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {deals.map((deal, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center justify-center">
            <a href={deal.offerLink} target="_blank" rel="noopener noreferrer">
              <img
                src={deal.imgSrc}
                alt={deal.title}
                className="h-[250px] w-full object-cover" // Ensuring that the image fits within 250px height
              />
            </a>
            <p className="text-sm font-semibold mt-2 text-center">
              {deal.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
