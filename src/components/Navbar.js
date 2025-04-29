import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-warning px-3">
        <div className="container">
      <Link className="navbar-brand" to="/movie-listing">Movie Manager</Link>
      <div className="navbar-nav me-auto">
        {user && (
          <>
            <Link className="nav-link" to="/movie-listing">Movie List</Link>
            <Link className="nav-link" to="/search">Search</Link>
            <Link className="nav-link" to="/watchlist">Watchlist</Link>
            <Link className="nav-link" to="/booked">Booked Movie</Link>
          </>
        )}
      </div>
      {user ? (
        <>
        <span className="me-2">🧑 {user.name}</span>|
        <button className="btn btn-outline-dark ms-2" onClick={handleLogout}>
          Logout
        </button>
        </>
      ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
