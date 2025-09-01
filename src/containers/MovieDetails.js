import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToWatchlist } from '../actions/watchlistActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, updateReview, deleteReview } from '../actions/reviewActions';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { selectMovie } from '../actions/movieActions';
import { fetchWatchlist } from '../actions/watchlistActions';
import { bookMovie } from '../actions/bookedAction';
const MovieDetails = () => {
  const movie = useSelector(state => state.movies.selectedMovie);
  const { list: reviews } = useSelector(state => state.reviews);
  const { items } = useSelector(state => state.watchlist)
  const [editingReview, setEditingReview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id)

  const handleAddToWatchlist = async (movieId, movie) => {

    if (movie) {
      await axios.post('http://localhost:5000/movieHistory', {
        userId,
        movieId,
        movie,
        status: 'Add to watchlist',
        timestamp: new Date().toISOString()
      });
      dispatch(addToWatchlist(userId, movie));
    }
  };

  useEffect(() => {
    if (movie) {
      dispatch(fetchReviews(movie.id));
      dispatch(fetchWatchlist(userId))
    }
  }, [userId, movie, dispatch]);

  const handleSelect = (movie) => {
    dispatch(selectMovie(movie));
    navigate(`/movie/${movie.id}`);
  };

  const handleReviewSubmit = (review) => {
    if (editingReview) {
      dispatch(updateReview(editingReview.id, review));
      setEditingReview(null);
    } else {
      dispatch(addReview(review));
    }
  };
  const handleBook = (movie, userId) => {
    dispatch(bookMovie(movie, userId));
  };

  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleDelete = (reviewId, movieId) => dispatch(deleteReview(reviewId, movieId));

  // If movie is not selected, show a message
  if (!movie) return <div>No movie selected.</div>;

  return (
    <>
      <div className='row'>
        <div className='col-md-7'>
          <div className="card p-4 shadow">
            <button className="btn btn-link mb-3" onClick={() => navigate('/search')}>
              ← Back to Search
            </button>
            <h2>{movie.title}</h2>
            <img src={movie.poster} style={{ 'width': '200px' }} className='my-4' alt="" />
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Cast:</strong> {movie.cast}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <div className='row mt-3'>
              <div className=' col-md-3'>
                <button className="btn btn-outline-info" onClick={() => handleAddToWatchlist(movie.id, movie)}>
                  Add to Watchlist
                </button>
              </div>
              <div className=' col-md-5'>

                <button className="btn btn-outline-primary col-md-6" onClick={() => handleBook(movie, userId)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-5'>
          <div className="card p-4 shadow">
            <h4>{movie.title}</h4>
            <ReviewForm
              movieId={movie.id}
              onSubmit={handleReviewSubmit}
              existingReview={editingReview}
            />
            <ReviewList
              reviews={reviews}
              onDelete={handleDelete}
              onEdit={setEditingReview}
            />
          </div>
        </div>
      </div>

      {items.length > 0 &&
        <div className='recently_watched card p-4 shadow mt-5'>
          <h2 className='mb-4'>Recently Watched Movies</h2>
          <div className='row'>
            {getRandomItems(items, 4).map(movie => (
              <div
                key={movie.id}
                className="col-md-3 mb-3"

              >
                <figure style={{
                  border: '2px solid',
                  borderColor: movie.rating < 5 ? 'orange' : 'green',
                  padding: '10px',
                  height: '100%'
                }}>
                  <img onClick={() => handleSelect(movie)} src={movie.poster} alt={movie.title} />
                  <figcaption>
                    <h3 onClick={() => handleSelect(movie)}>{movie.title}</h3>
                    <p>Rating: {movie.rating}</p>
                    <button className="btn btn-outline-primary me-1" onClick={() => handleBook(movie)}>
                      Book Now
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => handleSelect(movie)}>View Details</button>

                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default MovieDetails;
