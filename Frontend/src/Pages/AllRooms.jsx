import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch, FaTh, FaList, FaSortAmountDown } from 'react-icons/fa';
import RoomResult from '../Components/RoomResult';
import Pagination from '../Components/Pagination';
import APIService from '../Services/APIService';
const AllRooms = () => {
    const [allRooms, setAllRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await APIService.getRoomTypes();
                // Ensure response is an array
                console.log(response)
                setRoomTypes(Array.isArray(response) ? response : []);
            } catch (error) {
                console.log(error);
                setRoomTypes([]); // Set empty array on error
            }
        }
        fetchRoomTypes();
    }, [])
    
    // Filter states
    const [filters, setFilters] = useState({
        roomType: '',
        minPrice: '',
        maxPrice: '',
        searchTerm: ''
    });
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    
    // UI states
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');

    // Fetch all rooms on component mount
    useEffect(() => {
        fetchAllRooms();
    }, []);

    // Apply filters whenever filters or allRooms change
    useEffect(() => {
        applyFilters();
    }, [filters, allRooms, sortBy]);

    const fetchAllRooms = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await APIService.getAllRooms();
            console.log(response)
            
            setAllRooms(response.roomList);
            setFilteredRooms(response.roomList);
        } catch (error) {
            setError('Failed to fetch rooms');
            console.error('Error fetching rooms:', error);
            // Set empty arrays on error
            setAllRooms([]);
            setFilteredRooms([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        // Ensure allRooms is an array before filtering
        if (!Array.isArray(allRooms)) {
            console.warn('allRooms is not an array:', allRooms);
            setFilteredRooms([]);
            return;
        }

        let filtered = [...allRooms];

        // Filter by room type
        if (filters.roomType) {
            filtered = filtered.filter(room => 
                room?.roomType?.toLowerCase().includes(filters.roomType.toLowerCase())
            );
        }

        // Filter by search term
        if (filters.searchTerm) {
            filtered = filtered.filter(room =>
                room?.roomType?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                room?.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        if (filters.minPrice) {
            filtered = filtered.filter(room => 
                room?.roomPrice && room.roomPrice >= parseFloat(filters.minPrice)
            );
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(room => 
                room?.roomPrice && room.roomPrice <= parseFloat(filters.maxPrice)
            );
        }

        // Sort results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return (a?.roomPrice || 0) - (b?.roomPrice || 0);
                case 'price-high':
                    return (b?.roomPrice || 0) - (a?.roomPrice || 0);
                case 'name':
                    return (a?.roomType || '').localeCompare(b?.roomType || '');
                default:
                    return 0;
            }
        });

        setFilteredRooms(filtered);
        setCurrentPage(1);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            roomType: '',
            minPrice: '',
            maxPrice: '',
            searchTerm: ''
        });
        setSortBy('name');
    };

    // Get current rooms for pagination - with safety check
    const safeFilteredRooms = Array.isArray(filteredRooms) ? filteredRooms : [];
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = safeFilteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading rooms...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchAllRooms}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">All Rooms</h1>
                            <p className="text-gray-600 mt-1">
                                Discover our collection of {Array.isArray(allRooms) ? allRooms.length : 0} beautiful rooms
                            </p>
                        </div>
                        
                        {/* View Toggle */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors duration-200 ${
                                    viewMode === 'grid' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <FaTh />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors duration-200 ${
                                    viewMode === 'list' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className={`w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <FaFilter className="mr-2 text-blue-600" />
                                    Filters
                                </h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Rooms
                                </label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or description..."
                                        value={filters.searchTerm}
                                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Room Type Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Type
                                </label>
                                <select
                                    value={filters.roomType}
                                    onChange={(e) => handleFilterChange('roomType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="">All Room Types</option>
                                    {roomTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range (per night)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="name">Room Name (A-Z)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaFilter className="mr-2" />
                                Filters
                                {showFilters && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        Active
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {safeFilteredRooms.length} Room{safeFilteredRooms.length !== 1 ? 's' : ''} Found
                                </h2>
                                {(filters.roomType || filters.searchTerm || filters.minPrice || filters.maxPrice) && (
                                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        Filtered
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Room Results */}
                        {currentRooms.length > 0 ? (
                            <>
                                <RoomResult roomSearchResults={currentRooms} viewMode={viewMode} />
                                
                                {/* Pagination */}
                                <Pagination
                                    roomsPerPage={roomsPerPage}
                                    totalRooms={safeFilteredRooms.length}
                                    currentPage={currentPage}
                                    paginate={paginate}
                                />
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <FaSearch className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    No rooms found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {safeFilteredRooms.length === 0 && allRooms.length === 0
                                        ? "No rooms are currently available."
                                        : "Try adjusting your filters to see more results."
                                    }
                                </p>
                                {(filters.roomType || filters.searchTerm || filters.minPrice || filters.maxPrice) && (
                                    <button
                                        onClick={clearFilters}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div><Pagination /></div>
        </div>
    );
};

export default AllRooms;