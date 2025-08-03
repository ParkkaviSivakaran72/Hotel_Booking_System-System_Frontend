import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import RoomSearch from '../Components/RoomSearch'
import Footer from '../Components/Footer'
import RoomResult from '../Components/RoomResult';

function Rooms() {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    }
  return (
    <div>
        <section id="search"><RoomSearch handleSearchResult={handleSearchResult}/></section>
        <section id ="result"><RoomResult roomSearchResults={roomSearchResults} /></section>
        
        
    </div>
  )
}

export default Rooms