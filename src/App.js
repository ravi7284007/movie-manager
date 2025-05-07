import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import Navbar from "./components/Navbar";
import MovieSearch from './containers/MovieSearch';
import MovieDetails from './containers/MovieDetails';
import Watchlist from './containers/Watchlist';
import MovieListing from './containers/MovieListing';
import BookedMovies from './containers/BookedMovies';
import MovieHistory from './containers/MovieHistory';
import "./App.css";

const App = () => (
  <> <Navbar />
  <div className="container mt-4">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/movie-listing" element={<MovieListing />} />
      <Route path="/search" element={<MovieSearch />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/booked" element={<BookedMovies />} />
      <Route path="/history" element={<MovieHistory />} />
    </Routes>
  </div>

  <footer className="app-footer">
  <div className="text-center py-3">
    © {new Date().getFullYear()} Ravi. All rights reserved.
  </div>
</footer>
  </>
);

export default App;
