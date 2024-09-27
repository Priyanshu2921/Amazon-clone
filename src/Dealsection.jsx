import React from 'react';

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
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
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
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC-2_2x._SY232_CB562243010_.jpg", label: "Home decor" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC-3_2x._SY232_CB562243010_.jpg", label: "Furniture" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC-4_2x._SY232_CB562243010_.jpg", label: "Home improvement" },
      ],
    },
    {
      title: "Up to 75% off | Refurbished products",
      imgSrc: null,
      offerLink: "#",
      items: [
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/certified_refurbished/anjaga/RenewedMarketing2024/Jupiter24/JupiterGW/1_PC_QC_2x._SY232_CB562140816_.jpg", label: "Laptops" },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/certified_refurbished/anjaga/RenewedMarketing2024/Jupiter24/JupiterGW/2_PC_QC_2x._SY232_CB562140816_.jpg", label: "Mobile " },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/certified_refurbished/anjaga/RenewedMarketing2024/Jupiter24/JupiterGW/3_PC_QC_2x._SY232_CB562140816_.jpg", label: "Headphones " },
        { img: "https://images-eu.ssl-images-amazon.com/images/G/31/certified_refurbished/anjaga/RenewedMarketing2024/Jupiter24/JupiterGW/4_PC_QC_2x._SY232_CB562140816_.jpg", label: "Home & Kitchen " },
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
