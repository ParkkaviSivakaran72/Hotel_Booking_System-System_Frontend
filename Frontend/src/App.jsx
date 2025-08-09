import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Rooms from "./Pages/Rooms";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FindBooking from "./Pages/FindBooking";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage"; // Add this if you have a register page
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  
  // Define routes that shouldn't have navbar and footer
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/find-booking" element={<FindBooking />} />
        <Route path="/room-details-book/:roomId" element={<RoomDetails />} />
      </Routes>
      
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;