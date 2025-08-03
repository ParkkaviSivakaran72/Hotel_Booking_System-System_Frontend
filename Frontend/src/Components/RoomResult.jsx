import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaWifi, FaCar, FaSwimmingPool, FaDumbbell } from 'react-icons/fa'
import RoomSearch from './RoomSearch';

function RoomResult({ roomSearchResults }) {
    const navigate = useNavigate();
    const modifyRef = useRef(null);

    
    return (
        <section className="py-8 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {roomSearchResults && roomSearchResults.length > 0 ? (
                    <>
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Available Rooms
                            </h2>
                            <p className="text-gray-600">
                                {roomSearchResults.length} room{roomSearchResults.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {roomSearchResults.map((room, index) => (
                                <div 
                                    key={room.id || index}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={room.roomPhotoURL} 
                                            alt={`${room.roomType} room`}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Price Badge */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-blue-700 text-white px-3 py-1 rounded-full font-semibold text-sm">
                                            ${room.roomPrice}/night
                                        </div>
                                        {/* Popular Badge (optional) */}
                                        <div className="absolute top-4 left-4 bg-blue-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            Popular
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Room Type & Rating */}
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {room.roomType}
                                            </h3>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar 
                                                        key={i} 
                                                        className="text-yellow-400 text-sm" 
                                                    />
                                                ))}
                                                <span className="text-gray-600 text-sm ml-1">(4.8)</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {room.description}
                                        </p>

                                        {/* Amenities */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex items-center text-gray-500 text-xs">
                                                <FaWifi className="mr-1" />
                                                WiFi
                                            </div>
                                            <div className="flex items-center text-gray-500 text-xs">
                                                <FaCar className="mr-1" />
                                                Parking
                                            </div>
                                            <div className="flex items-center text-gray-500 text-xs">
                                                <FaSwimmingPool className="mr-1" />
                                                Pool
                                            </div>
                                        </div>

                                        {/* Price & Button */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-800">
                                                    ${room.roomPrice}
                                                </span>
                                                <span className="text-gray-500 text-sm">/night</span>
                                            </div>
                                            
                                            <button 
                                                onClick={() => navigate(`/room-details-book/${room.id}`)}
                                                className="bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 to-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button (optional) */}
                        <div className="text-center mt-12">
                            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 border border-gray-300 rounded-lg transition-colors duration-200">
                                Load More Rooms
                            </button>
                        </div>
                    </>
                ) : (
                    /* No Results State */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                No Rooms Available
                            </h3>
                            <p className="text-gray-600 mb-8">
                                We couldn't find any rooms matching your search criteria. 
                                Try adjusting your dates or room preferences.
                            </p>
                            <button 
                                
                                className="bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                            >
                                <a href="#search">Modify Search</a>
                                
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
        </section>
        
    )
}

export default RoomResult