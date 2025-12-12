// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setIsMobileNavOpen(false);
  };

  // Sync token from localStorage when page reloads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Toggle mobile navbar
  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <Router>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Smart Meal Tracker
          </Link>

          {/* Hamburger button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div
            className={`collapse navbar-collapse ${
              isMobileNavOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav ms-auto align-items-center">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-warning ms-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn btn-primary me-2"
                      to="/login"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-success"
                      to="/register"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={!!token} />} />
        <Route
          path="/meal-planner"
          element={token ? <MealPlanner /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={
            !token ? <Register setToken={setToken} /> : <Navigate to="/" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
