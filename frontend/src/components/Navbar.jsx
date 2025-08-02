import React from 'react'
import APIService from '../Services/APIService'

function Navbar() {
    const isAuthenticated = APIService.isAuthenticated();
    const isAdmin = APIService.isAdmin();
    const isUser = APIService.isUser();
    const handleLogout = () => {
        const isLogout = window.confirm("Are you sure you really want to logout!")
        if(isLogout){
            APIService.logout();
        }
    }
  return (
    <nav>
        <div>
            <ul>
                <li><NavLink to = "/home" activeClass="active">Home</NavLink></li>
                <li><NavLink to = "/rooms" activeClass="active">Rooms</NavLink></li>
                <li><NavLink to = "/about-us" activeClass="active">About-Us</NavLink></li>
                <li><NavLink to = "/contact-us" activeClass="active">Contact-Us</NavLink></li>
                {isAdmin && <li><NavLink to = "/admin" activeClass="active">Admin</NavLink></li>}
                {isAuthenticated && <li><NavLink to = "/profile" activeClass="active">Profile</NavLink></li>}
                {!isAuthenticated && <li><NavLink to = "/login" activeClass="active">Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to = "/register" activeClass="active">Register</NavLink></li>}
                {isAuthenticated && <li onClick = {handleLogout}>ogout</li>}

                


            </ul>
        </div>
    </nav>
  )
}

export default Navbar