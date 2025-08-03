import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Rooms from "./Pages/Rooms";
import AllRooms from "./Pages/AllRooms";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/all-rooms" element={<AllRooms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
