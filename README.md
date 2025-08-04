🏨 The Royal Crest – Hotel Booking Platform
A full-stack hotel booking system built with Spring Boot, React.js, PostgreSQL, and AWS S3. Users can search, view, and book hotel rooms, while admins manage listings and bookings through a secure panel.
🤝 Contributors
👨‍💻 Parkkavi Sivakaran (@ParkkaviSivakaran72)
🚀 Features
🏨 Hotel Room Booking

🔍 Real-time room availability
🎯 Search & filter by location, price, and amenities
🏠 Room detail pages with image gallery
📝 Booking form with date range picker
📄 Pagination for room listings

🖼️ Cloudinary Integration

☁️ Upload room images securely to Cloudinary
🌐 Serve static image URLs in frontend

👤 User Profile Management

🔐 Register/Login system
✏️ Edit profile (with image upload)
📋 View bookings history
❌ Cancel bookings

⚙️ Tech Stack
Frontend
React.js
Tailwind CSS
Axios for HTTP requests
React Router DOM
JWT storage in localStorage

🗂️ Folder Structure
Frontend /client
src/
├── components/     # Navbar, Footer, RoomSearch, RoomResult
├── pages/         # Home, Login, Profile, RoomDetails, AllRooms, Booking  
└── services/      # APIService, ProtectedRoute

🔐 Token Management
Upon login, the JWT is stored securely in localStorage and automatically added to Authorization headers in all protected routes.

🧪 Testing & Documentation
✅ Postman collections for API testing
