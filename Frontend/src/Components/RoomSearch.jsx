import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaCalendarAlt, 
  FaBed, 
  FaSearch, 
  FaMapMarkerAlt,
  FaUsers,
  FaExclamationTriangle
} from "react-icons/fa";
import APIService from "../Services/APISErvice";

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await APIService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.log(error.message);
        showError("Failed to load room types");
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const handleInternalSearch = async () => {
    // Validation
    if (!startDate || !endDate) {
      showError("Please select both check-in and check-out dates");
      return;
    }
    
    if (startDate >= endDate) {
      showError("Check-out date must be after check-in date");
      return;
    }

    if (startDate < new Date().setHours(0, 0, 0, 0)) {
      showError("Check-in date cannot be in the past");
      return;
    }
    

    setIsLoading(true);
    try {
      // Your search logic here
      const formatedStartDate = startDate ? startDate.toISOString().split('T')[0]:null;
      const formatedEndDate = endDate ? endDate.toISOString().split('T')[0]:null;
      console.log("Selected Room Type:", formatedEndDate);

      const response = await APIService.getAvailableRoomByDateAndTypes(formatedStartDate, formatedEndDate, roomType);
      console.log(response)

      if(response.statusCode === 200){
        if(response.roomList.length === 0){
            showError("Room not Currently available for the room type and date range");
            return;
        }
        handleSearchResult(response.roomList);
        setError('')
      }
      
      
    } catch (error) {
      showError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNights = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Room</h2>
        <p className="text-gray-600">Search and book the ideal accommodation for your stay</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 hover:to-blue-900 p-6">
          <div className="flex items-center text-white">
            <FaSearch className="text-2xl mr-3" />
            <h3 className="text-xl font-semibold">Room Search</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6 justify-center">
            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Check-In Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Check-In Date"
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Check-Out Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Check-Out Date"
                  minDate={startDate || new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaBed className="mr-2 text-blue-500" />
                Room Type
              </label>
              <select 
                value={roomType} 
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
              >
                <option disabled value="">
                  Select Room Type
                </option>
                {roomTypes.map((roomType) => (
                  <option key={roomType} value={roomType}>
                    {roomType}
                  </option>
                ))}
              </select>
            </div>

            
          </div>

          {/* Stay Duration Info */}
          {startDate && endDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-blue-800">
                <span className="font-semibold">Stay Duration:</span>
                <span className="text-lg font-bold">
                  {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleInternalSearch}
              disabled={isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Search Available Rooms
                </>
              )}
            </button>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setRoomType("");
                setError("");
              }}
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
          <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
          <div className="text-green-600 font-semibold mb-1">Best Price Guarantee</div>
          <div className="text-green-700 text-sm">Find a lower price? We'll match it!</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
          <div className="text-orange-600 font-semibold mb-1">Free Cancellation</div>
          <div className="text-orange-700 text-sm">Cancel up to 24 hours before check-in</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
          <div className="text-purple-600 font-semibold mb-1">Instant Confirmation</div>
          <div className="text-purple-700 text-sm">Get your booking confirmed immediately</div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearch;