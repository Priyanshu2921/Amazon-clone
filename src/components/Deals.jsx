import React from 'react';
import DealsCarousel from './DealCarsoul';

export default function DealsSwipeSection() {
  const deals = [
    {
      title: "Minimum 50% off | Home, kitchen & outdoors",
      imgSrc: "https://m.media-amazon.com/images/I/414ly0wsjYL._AC_SY400_.jpg",
      offerLink: "#",
    },
    {
      title: "Up to 75% off | Refurbished products",
      imgSrc: "https://m.media-amazon.com/images/I/51whCkjJCXL._AC_SY400_.jpg",
      offerLink: "#",
    },
    {
      title: "Upgrade to 4K TVs",
      imgSrc: "https://m.media-amazon.com/images/I/51vNMv6Ua-L._AC_SY400_.jpg",
      offerLink: "#",
    },
    {
      title: "Electronics & Accessories",
      imgSrc: "https://m.media-amazon.com/images/I/61-rv4FJ3AL._AC_SY400_.jpg",
      offerLink: "#",
    },
    {
      title: "Electronics & Accessories",
      imgSrc: "https://m.media-amazon.com/images/I/61-rv4FJ3AL._AC_SY400_.jpg",
      offerLink: "#",
    },
    {
      title: "Electronics & Accessories",
      imgSrc: "https://m.media-amazon.com/images/I/61-rv4FJ3AL._AC_SY400_.jpg",
      offerLink: "#",
    }
  ];

  return (
    <div className="px-4 py-6">
      <DealsCarousel deals={deals} />
    </div>
  );
}
