import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookedMovies } from '../actions/bookedAction';
import { useNavigate } from 'react-router-dom';
import { selectMovie } from '../actions/movieActions';

const BookedMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const { booked, loading, error } = useSelector(state => state.bookedMovies);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      dispatch(fetchBookedMovies(user.id));
    }
  }, [dispatch, user, navigate]);

  const handleRemove = async (movieId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/bookedMovies?userId=${user.id}&movieId=${movieId}`);
      if (data.length > 0) {
        await axios.delete(`http://localhost:5000/bookedMovies/${data[0].id}`);
        dispatch(fetchBookedMovies(user.id)); // 👈 refresh after delete
      }
    } catch (err) {
      console.error('Failed to delete movie:', err);
      alert('Failed to remove movie');
    }
  };

  const handleSlectedMovie = ({movie}) =>{
    dispatch(selectMovie(movie))
    navigate(`/movie/${movie.id}`);
  }

  if (loading) return <p>Loading booked movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Booked Movies</h2>
      <div className="row">
        {booked.length === 0 ? (
          <p>No movies booked yet.</p>
        ) : (
          booked.map(item => (
            <div className="col-md-3 mb-3" key={item.id}>
              <div className="card h-100">
                <img onClick={() => handleSlectedMovie(item)} src={item.movie.poster} className="card-img-top" alt={item.movie.title} />
                <div className="card-body">
                  <h5 className="card-title" onClick={() => handleSlectedMovie(item)} >{item.movie.title}</h5>
                  <p><strong>Rating:</strong> {item.movie.rating}</p>
                  <button className="btn btn-danger" onClick={() => handleRemove(item.movieId)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookedMovies;
