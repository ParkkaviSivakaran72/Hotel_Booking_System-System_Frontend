import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import APIService from "../Services/APISErvice";
import assets from "../assets/assets";

function Navbar() {
  const isAuthenticated = APIService.isAuthenticated();
  const isAdmin = APIService.isAdmin();
  const isUser = APIService.isUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you really want to logout?");
    if (isLogout) {
      APIService.logout();
      navigate("/home");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md py-2 px-4 flex justify-between items-center">

      {/* Logo and Navigation */}
      <div className="flex items-center gap-2">
        <NavLink to="/home" className="flex items-center space-x-2">
          <img
            src={assets.logo}
            alt="Hotel Logo"
            className="h-10 w-10 object-contain"
          />
        </NavLink>

        <ul className="flex space-x-6 items-center">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Side: Auth Buttons or Profile */}
      <ul className="flex items-center space-x-4 relative" ref={dropdownRef}>
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={assets.profile}
                alt="Profile"
                className="w-8 h-8 rounded-full border"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    navigate("/my-bookings");
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Bookings
                </button>
                <button
                  onClick={() => {
                    navigate("/edit-profile");
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
