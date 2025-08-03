import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <FaPhone className="text-blue-500 text-2xl mt-1" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Phone</p>
              <p className="text-gray-600">+9476-888-7770</p>
              <p className="text-gray-600">+9476-555-4440</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-blue-500 text-2xl mt-1" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Email</p>
              <p className="text-gray-600">kavSi@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-blue-500 text-2xl mt-1" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Address</p>
              <p className="text-gray-600">Jaffna, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
