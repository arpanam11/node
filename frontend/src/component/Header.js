import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './Header.css'; // Import your custom CSS for styling
const Header = () => {
  const location = useLocation(); // Get the current location object

  return (
    <header>
      <h2 className="text-center my-3">User Management System</h2>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* Optional: Add a Navbar Brand if you want one for the "User Management System" */}
            {/* <Link className="navbar-brand" to="/">User Management System</Link> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {/* Conditionally apply 'active' class based on location.pathname */}
                  <Link
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    aria-current={location.pathname === '/' ? 'page' : undefined} // For accessibility
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                    aria-current={location.pathname === '/about' ? 'page' : undefined}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
                    aria-current={location.pathname === '/add' ? 'page' : undefined}
                    to="/add"
                  >
                    Add User
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;