import React from 'react';
import DealsCarousel from './DealCarousel'; 
import deals from '../../JSON files/deals.json'; 

export default function DealsSwipeSection() {
  return (
    <div className="px-4 py-6">
      <DealsCarousel deals={deals} />
    </div>
  );
}
