import React from 'react';

import assets from '../assets/assets.js';

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${assets.logo})` }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold bg-black/40 px-6 py-3 rounded">
          About The Royal Crest
        </h1>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission & Vision</h2>
        <p className="text-lg leading-relaxed text-center mb-10">
          At The Royal Crest, we are committed to delivering unforgettable hospitality
          experiences. Our vision is to become the most cherished luxury hotel in the
          region, where comfort meets elegance.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <img src={assets.Service1} alt="Comfort" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg">Comfort Redefined</h3>
            <p className="text-sm mt-2">
              Enjoy premium rooms with modern amenities and elegant decor for a restful stay.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <img src={assets.Service2} alt="Dining" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg">Gourmet Dining</h3>
            <p className="text-sm mt-2">
              Indulge in world-class cuisine crafted by expert chefs using the finest ingredients.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <img src={assets.Service3} alt="Service" className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg">Exceptional Service</h3>
            <p className="text-sm mt-2">
              From concierge to room service, our team is here to exceed your expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
        <p className="mb-6">Book your stay at The Royal Crest and enjoy unmatched hospitality.</p>
        <a href="/rooms">
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-200 transition">
            View Rooms
          </button>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
