import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
   const getFullYear = () => new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Diamond Jubilee Info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            The Royal Crest
          </h3>
          <p className="text-sm mb-4">Thank You So Much Guys For Your Valuable Time</p>
          <div className="flex space-x-4">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Contact Info</h3>
          <p className="text-sm">📞 +9476-888-7770</p>
          <p className="text-sm">📞 +9476-555-4440</p>
          <p className="text-sm">✉️ kavSi@gmail.com</p>
          <p className="text-sm">📍 Jaffna, SriLanka</p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Explore</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#">➤ Home</a></li>
            <li><a href="#">➤ About-Us</a></li>
            <li><a href="#">➤ Service</a></li>
            <li><a href="#">➤ Rooms</a></li>
            <li><a href="#">➤ Customer Review</a></li>
            <li><a href="#">➤ Contact-Us</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Subscribe Us</h3>
          <p className="text-sm mb-2">Subscribe For Latest Updates</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-2 rounded text-white border-white mb-2"
          />
          <button className="w-full border border-white py-2 rounded hover:bg-blue-400 hover:text-black transition">
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center mt-10 text-xs border-t border-gray-700 pt-4">
        <p>© {getFullYear()} ParkSiva. All Rights Reserved</p>
        
      </div>
    </footer>
  );
};

export default Footer;
