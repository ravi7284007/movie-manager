import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BookedMovies = () => {
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/bookedMovies');
        setBooked(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load booked movies.');
        setLoading(false);
      }
    };

    fetchBookedMovies();
  }, []);

  useEffect(() => {
    if (!user) {
        navigate('/');
    }
}, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookedMovies/${id}`);
      // Remove from UI
      setBooked(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      console.error('Failed to delete movie:', err);
      alert('Failed to remove movie');
    }
  };

  if (loading) return <p>Loading booked movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Booked Movies</h2>
      <div className="row">
        {booked.length === 0 ? (
          <p>No movies booked yet.</p>
        ) : (
          booked.map(movie => (
            <div className="col-md-3 mb-3" key={movie.id}>
              <div className="card h-100">
                <img src={movie.poster} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p><strong>Rating:</strong> {movie.rating}</p>
                  <button className="btn btn-danger" onClick={() => handleRemove(movie?.id)}>
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
