import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FaCalendarAlt, FaUsers, FaBed, FaArrowLeft } from 'react-icons/fa';
import { differenceInDays } from 'date-fns';
import APIService from '../Services/APISErvice';

const RoomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate: stateCheckInDate, checkOutDate: stateCheckOutDate } = location.state || {};
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Local state for dates (can be edited if not from search)
  const [checkInDate, setCheckInDate] = useState(stateCheckInDate || '');
  const [checkOutDate, setCheckOutDate] = useState(stateCheckOutDate || '');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Fetching room with ID:', roomId);
        
        const response = await APIService.getRoomById(roomId);
        const roomData = response.room;
        setRoom(roomData);
        console.log('Room data:', roomData);

        // Calculate nights and price only if both dates are available
        if (checkInDate && checkOutDate) {
          const nightsCount = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
          setNights(nightsCount > 0 ? nightsCount : 0);
          setTotalPrice(nightsCount > 0 ? nightsCount * parseFloat(roomData.roomPrice) : 0);
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  // Recalculate when dates change
  useEffect(() => {
    if (room && checkInDate && checkOutDate) {
      const nightsCount = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
      setNights(nightsCount > 0 ? nightsCount : 0);
      setTotalPrice(nightsCount > 0 ? nightsCount * parseFloat(room.roomPrice) : 0);
    }
  }, [checkInDate, checkOutDate, room]);

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      alert('Please select valid dates');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        room,
        checkInDate,
        checkOutDate,
        nights,
        totalPrice,
        numberOfAdults: adults,
        numberOfChildren: children,
      },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString; // Return original string if formatting fails
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Room Not Found</h3>
          <p className="text-red-600 mb-4">{error || 'The requested room could not be found.'}</p>
          <button 
            onClick={() => navigate('/all-rooms')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const roomImages = [
    room.roomPhotoURL,
    room.roomPhotoURL,
    room.roomPhotoURL,
    room.roomPhotoURL
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-800">{room.roomType} Room</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Room Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {roomImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Room view ${index + 1}`}
              className="w-full h-40 object-cover rounded-md hover:opacity-90 transition-opacity"
            />
          ))}
        </div>

        <p className="text-lg text-gray-700 mb-6">{room.description}</p>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" /> Check-in Date
              </label>
              {stateCheckInDate ? (
                <input
                  type="text"
                  value={formatDate(checkInDate)}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                />
              ) : (
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" /> Check-out Date
              </label>
              {stateCheckOutDate ? (
                <input
                  type="text"
                  value={formatDate(checkOutDate)}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                />
              ) : (
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Adults */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaUsers className="mr-2 text-blue-500" /> Adults
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaUsers className="mr-2 text-blue-500" /> Children
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Summary */}
          {checkInDate && checkOutDate && nights > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Room Rate (per night):</span>
                <span className="text-gray-800">LKR {parseFloat(room.roomPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Number of Nights:</span>
                <span className="text-gray-800 font-semibold">{nights}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total Price:</span>
                <span className="text-xl font-bold text-green-600">LKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={!checkInDate || !checkOutDate || nights <= 0}
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
          >
            {!checkInDate || !checkOutDate ? 'Select Dates to Book' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;