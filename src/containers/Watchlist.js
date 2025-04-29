import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchlist, removeFromWatchlist } from '../actions/watchlistActions';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items, loading } = useSelector(state => state.watchlist);
    console.log('ravi', useSelector(state => state.watchlist));
    
  useEffect(() => {
    if (user) {
      dispatch(fetchWatchlist(user.id));
    }
  }, [user, dispatch]);

  const handleRemove = (movieId) => {
    dispatch(removeFromWatchlist(user.id, movieId));
  };

  return (
    <div className="container mt-4">
      <h3>Your Watchlist</h3>
      {loading ? <p>Loading...</p> : (
        <div className="row">
          {items.length === 0 ? <p>No movies in watchlist.</p> : items.map(movie => (
            <div className="col-md-3 mb-3" key={movie?.id}>
              <div className="card h-100">
                <div className="card-body">
                <img src={movie.poster} style={{'max-width': '300px'}} className='my-4' alt="" />
                  <h5 className="card-title">{movie?.title}</h5>
                  <p>Rating - {movie?.rating} | Date - {movie?.releaseDate}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(movie?.id)}
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
