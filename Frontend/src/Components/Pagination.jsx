import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalRooms / roomsPerPage);
    
    // Fixed the loop condition
    for(let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    }

    const goToPrevious = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    // Don't render pagination if there's only one page or no pages
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-8 mb-8">
            {/* Previous Button */}
            <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300'
                }`}
            >
                <FaChevronLeft className="mr-1" />
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentPage === number
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300'
                }`}
            >
                Next
                <FaChevronRight className="ml-1" />
            </button>
        </div>
    );
};

export default Pagination;