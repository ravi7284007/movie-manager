import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToWatchlist } from '../actions/watchlistActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, updateReview, deleteReview } from '../actions/reviewActions';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { bookMovie } from '../actions/movieActions';

const MovieDetails = () => {
  const movie = useSelector(state => state.movies.selectedMovie);
  const { list: reviews } = useSelector(state => state.reviews);
  const [editingReview, setEditingReview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = 1; // Replace with real user state

  const handleAddToWatchlist = () => {

    if (movie) {
      dispatch(addToWatchlist(userId, movie));
    }
  };

  useEffect(() => {
    if (movie) {
      dispatch(fetchReviews(movie.id)); // Fixed to use `movie` here
    }
  }, [movie, dispatch]); // Make sure to include dispatch as a dependency

  const handleReviewSubmit = (review) => {
    if (editingReview) {
      dispatch(updateReview(editingReview.id, review));
      setEditingReview(null);
    } else {
      dispatch(addReview(review));
    }
  };
  const handleBook = (movie) => {
    dispatch(bookMovie(movie));
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
                <button className="btn btn-outline-info" onClick={handleAddToWatchlist}>
                  Add to Watchlist
                </button>
              </div>
              <div className=' col-md-5'>

                <button className="btn btn-outline-primary col-md-6" onClick={() => handleBook(movie)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-5'>
          <div className="card p-4 shadow">
            <h4>{movie.title}</h4> {/* Ensure you're using `movie` here */}
            <ReviewForm
              movieId={movie.id} // Ensure you're passing `movie.id` here
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
    </>
  );
};

export default MovieDetails;
