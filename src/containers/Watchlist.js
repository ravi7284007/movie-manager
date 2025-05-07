import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchlist, removeFromWatchlist } from '../actions/watchlistActions';
import { selectMovie } from '../actions/movieActions';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items, loading } = useSelector(state => state.watchlist);
  const navigate = useNavigate()
    
  useEffect(() => {
    if (user) {
      dispatch(fetchWatchlist(user.id));
    }
  }, [user, dispatch]);

  const handleRemove = async (movieId, movie) => {
    await axios.post('http://localhost:5000/movieHistory', {
      userId : user.id,
      movieId,
      movie,
      status: 'remove from watchlist',
      timestamp: new Date().toISOString()
    });
    dispatch(removeFromWatchlist(user.id, movieId));
  };

  const handleSlectedMovie = (movie) =>{
      dispatch(selectMovie(movie))
      navigate(`/movie/${movie.id}`);
    }

  return (
    <div className="container mt-4">
      <h3>Your Watchlist</h3>
      {loading ? <p>Loading...</p> : (
        <div className="row">
          {items.length === 0 ? <p>No movies in watchlist.</p> : items.map(movie => (
            <div className="col-md-3 mb-3" key={movie?.id}>
              <div className="card h-100">
                <div className="card-body">
                <img onClick={() => handleSlectedMovie(movie)}  src={movie.poster} style={{'max-width': '300px'}} className='my-4' alt="" />
                  <h5 className="card-title" onClick={() => handleSlectedMovie(movie)}>{movie?.title}</h5>
                  <p>Rating - {movie?.rating} | Date - {movie?.releaseDate}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(movie?.id, movie)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
