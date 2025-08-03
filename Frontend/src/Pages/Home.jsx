import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import assets from "../assets/assets.js";
import { 
  FaSnowflake, 
  FaCocktail, 
  FaParking, 
  FaWifi,
  FaBed,
  FaConciergeBell,
  FaDumbbell,
  FaSwimmingPool 
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function Home() {
  const images = [assets.Hotel1, assets.Hotel2, assets.Hotel3, assets.Hotel4];
  const texts = [
    "Welcome to Our Platform",
    "Find the Perfect Stay Anywhere",
    "Luxury Hotels at Affordable Prices",
    "Experience Comfort and Convenience",
  ];
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      icon: <FaSnowflake className="text-blue-500" />,
      title: "Air Conditioning",
      description: "Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.",
      gradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100"
    },
    {
      id: 2,
      icon: <FaCocktail className="text-orange-500" />,
      title: "Mini Bar",
      description: "Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.",
      gradient: "from-orange-50 to-amber-50",
      iconBg: "bg-orange-100"
    },
    {
      id: 3,
      icon: <FaParking className="text-green-500" />,
      title: "Parking",
      description: "We offer on-site parking for your convenience. Please inquire about valet parking options if available.",
      gradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100"
    },
    {
      id: 4,
      icon: <FaWifi className="text-purple-500" />,
      title: "WiFi",
      description: "Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.",
      gradient: "from-purple-50 to-indigo-50",
      iconBg: "bg-purple-100"
    },
    {
      id: 5,
      icon: <FaBed className="text-pink-500" />,
      title: "Room Service",
      description: "24/7 room service available for your comfort. Enjoy gourmet meals delivered directly to your room.",
      gradient: "from-pink-50 to-rose-50",
      iconBg: "bg-pink-100"
    },
    {
      id: 6,
      icon: <FaConciergeBell className="text-teal-500" />,
      title: "Concierge",
      description: "Our dedicated concierge team is here to assist with reservations, recommendations, and special requests.",
      gradient: "from-teal-50 to-cyan-50",
      iconBg: "bg-teal-100"
    },
    {
      id: 7,
      icon: <FaDumbbell className="text-red-500" />,
      title: "Fitness Center",
      description: "State-of-the-art fitness facilities available 24/7 with modern equipment and personal training services.",
      gradient: "from-red-50 to-orange-50",
      iconBg: "bg-red-100"
    },
    {
      id: 8,
      icon: <FaSwimmingPool className="text-blue-400" />,
      title: "Swimming Pool",
      description: "Relax and unwind in our heated outdoor pool with poolside service and comfortable lounging areas.",
      gradient: "from-blue-50 to-sky-50",
      iconBg: "bg-blue-100"
    }
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <div
      className="relative h-[50vh] w-full flex items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: images[index] ? `url(${images[index]})` : "none",
      }}
    >
      <div className="absolute inset-0 backdrop-brightness-50 bg-opacity-50 z-0" />
      <h1 className="text-white text-4xl md:text-6xl font-bold z-10 text-center px-4">
        {texts[index]}
      </h1>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <span onClick={() => navigate("/all-rooms")} className="text-sm font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full mr-4 hover:bg-orange-200 transition-colors cursor-pointer">
              All Rooms
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Services at{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              The Royal Crest
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience luxury and comfort with our comprehensive range of premium services designed for your perfect stay
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-gradient-to-br ${service.gradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/50 backdrop-blur-sm group cursor-pointer`}
            >
              {/* Icon */}
              <div className={`${service.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-2xl">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                {service.description}
              </p>

              {/* Hover Effect Indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-600 mb-6">
              Book your stay now and enjoy all these premium services included in your reservation.
            </p>
            <button onClick={() => navigate("/rooms")} className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
