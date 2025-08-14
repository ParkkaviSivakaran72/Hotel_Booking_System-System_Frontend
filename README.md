\section*{🏨 The Royal Crest – Hotel Booking Platform}
A full-stack hotel booking system built with Spring Boot, React.js, PostgreSQL, and AWS S3. Users can search, view, and book hotel rooms, while admins manage listings and bookings through a secure panel.\\[2pt]

\noindent
Backend : 
\href{https://github.com/ParkkaviSivakaran72/Hotel}{\includegraphics[height=12pt]{/mnt/data/19d37597-31bc-4e7d-b320-5c8d2560df0a.png}} % replace with badge image if needed

\vspace{2mm}
\section*{🚀 Features}

\textbf{🏨 Hotel Room Booking}
\begin{itemize}[leftmargin=0.5cm]
    \item 🔍 Real-time room availability
    \item 🎯 Search \& filter by location, price, and amenities
    \item 🏠 Room detail pages with image gallery
    \item 📝 Booking form with date range picker
    \item 📄 Pagination for room listings
\end{itemize}

\textbf{🖼️ Cloudinary Integration}
\begin{itemize}[leftmargin=0.5cm]
    \item ☁️ Upload room images securely to Cloudinary
    \item 🌐 Serve static image URLs in frontend
\end{itemize}

\textbf{👤 User Profile Management}
\begin{itemize}[leftmargin=0.5cm]
    \item 🔐 Register/Login system
    \item ✏️ Edit profile (with image upload)
    \item 📋 View bookings history
    \item ❌ Cancel bookings
\end{itemize}

\textbf{⚙️ Tech Stack}

\textbf{Frontend}
\begin{itemize}[leftmargin=0.5cm]
    \item React.js
    \item Tailwind CSS
    \item Axios for HTTP requests
    \item React Router DOM
    \item JWT storage in localStorage
\end{itemize}

\textbf{🗂️ Folder Structure}

\textbf{Frontend /client}
\begin{verbatim}
src/
├── components/     # Navbar, Footer, RoomSearch, RoomResult
├── pages/          # Home, Login, Profile, RoomDetails, AllRooms, Booking  
└── services/       # APIService, ProtectedRoute
\end{verbatim}

\textbf{🔐 Token Management}
\begin{itemize}[leftmargin=0.5cm]
    \item Upon login, the JWT is stored securely in localStorage and automatically added to Authorization headers in all protected routes.
\end{itemize}

\textbf{🧪 Testing \& Documentation}
\begin{itemize}[leftmargin=0.5cm]
    \item ✅ Postman collections for API testing
\end{itemize}
