import React from 'react';

const DealCard = ({ title, imgSrc, offerLink, items }) => {
  return (
    <div className="bg-white shadow-md px-4 py-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {imgSrc && <img src={imgSrc} alt={title} className="w-full mb-4" />}
        {items && items.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={item.img} alt={item.label} className="mb-4 h-[110px]" />
                <p className="text-sm text-start ml-0 px-0"> 
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-start mt-4">
        <a href={offerLink} className="text-blue-500 font-semibold">
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
      imgSrc: "https://images-eu.ssl-images-amazon.com/images/G/31/Img23/Budget3/REC-PC_CC_758x608._SY608_CB564096366_.jpg",
      offerLink: "#",
      items: [],
    },
    {
      title: "Starting ₹6,999 | Upgrade to 4K TVs",
      imgSrc: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/nikita/1/1/Samsung_Mi_PC_CC_758x608._SY608_CB562051643_.jpg",
      offerLink: "#",
      items: [],
    },
    {
      title: "Minimum 50% off | Home, kitchen & more",
      imgSrc: null,
      offerLink: "#",
      items: [
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_1_2x._SY232_CB562243010_.jpg", label: "Kitchen appliance" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_1_2x._SY232_CB562243010_.jpg", label: "Home decor" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_1_2x._SY232_CB562243010_.jpg", label: "Furniture" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_1_2x._SY232_CB562243010_.jpg", label: "Home improvement" },
      ],
    },
    {
      title: "Up to 75% off | Never before offers on...",
      imgSrc: null,
      offerLink: "#",
      items: [
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/Jupiter24/PC_QC_1_2x-min._SY232_CB562147367_.jpg", label: "Front loads" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/Jupiter24/PC_QC_1_2x-min._SY232_CB562147367_.jpg", label: "High capacity fridges " },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/Jupiter24/PC_QC_1_2x-min._SY232_CB562147367_.jpg", label: "Energy efficient ACs " },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/Jupiter24/PC_QC_1_2x-min._SY232_CB562147367_.jpg", label: "Autoclean chimneys " },
      ],
    },
  ];

  return (
    <div className="relative mt-[200px] -translate-y-24 z-10"> 
      <div className="px-4"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <DealCard
              key={index}
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
