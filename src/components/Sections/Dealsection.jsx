import React from 'react';
import { dealImages } from '../Image/Image'; 

const DealCard = ({ title, imgSrc, offerLink, items }) => {
  return (
    <div className="bg-white shadow-md px-4 py-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {imgSrc && (
          <a href={offerLink} target="_blank" rel="noopener noreferrer">
            <img src={imgSrc} alt={title} className="w-full mb-4" />
          </a>
        )}
        {items && items.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {items.map((item) => (
              <div key={item.id || item.label} className="flex flex-col items-center">
                <a href={offerLink} target="_blank" rel="noopener noreferrer">
                  <img src={item.img} alt={item.label} className="mb-4 h-[110px]" />
                </a>
                <p className="text-sm text-start ml-0 px-0">{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-start mt-4">
        <a href={offerLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold">
          See all offers
        </a>
      </div>
    </div>
  );
};


export function DealsSection() {
  const deals = [
    {
      title: "Up to 80% off | Electronics & accessories",
      imgSrc: dealImages.electronics, 
      offerLink: "#",
      items: [], 
    },
    {
      title: "Starting ₹6,999 | Upgrade to 4K TVs",
      imgSrc: dealImages.tv,
      offerLink: "#",
      items: [], 
    },
    {
      title: "Minimum 50% off | Home, kitchen & more",
      imgSrc: null,
      offerLink: "#",
      items: dealImages.homeItems, 
    },
    {
      title: "Up to 75% off | Refurbished products",
      imgSrc: null,
      offerLink: "#",
      items: dealImages.refurbishedItems, 
    },
  ];

  return (
    <div className="relative md:mt-[200px] -translate-y-24 z-10">
      <div className="px-4"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <DealCard
              key={deal.title} 
              title={deal.title}
              imgSrc={deal.imgSrc}
              offerLink={deal.offerLink}
              items={deal.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
