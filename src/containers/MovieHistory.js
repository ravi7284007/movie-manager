import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMovie } from '../actions/movieActions';

const MovieHistory = () => {
  const user = useSelector(state => state.auth.user);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/movieHistory?userId=${user.id}`)
        .then(res => setHistory(res.data))
        .catch(err => console.error('Failed to load history', err));
    }
  }, [user]);

    const handleSlectedMovie = ({ movie }) => {
      dispatch(selectMovie(movie))
      navigate(`/movie/${movie.id}`);
    }

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movieHistory/${id}`);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove history item:', error);
      alert('Could not delete this item.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Booking History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="row">
          {history.map(item => (
            <div className="col-md-6 mb-3" key={item.id}>
              <div className={`card ${item.status === 'cancelled' ? 'bg-light' : ''}`}>
                <div className="card-body">
                  <div className='row'>
                    <div className='col-2'>
                      <img onClick={()=> handleSlectedMovie(item)} src={item.movie.poster} style={{ maxWidth: '100%' }} alt="" />
                    </div>
                    <div className='col-10'>
                      <h5 onClick={()=> handleSlectedMovie(item)}  className="card-title mt-0 d-flex justify-content-between">
                        {item.movie?.title}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleRemove(item.id)}
                        >
                          X
                        </button>
                      </h5>
                      <p>
                        <strong>Status:</strong> {item.status} |
                        <strong> Date:</strong> {new Date(item.timestamp).toLocaleString()}
                      </p>

                      {(item.moviePrice || item.quantity) && (
                        <p>
                          {item.moviePrice && <span><strong>Price:</strong> ₹{item.moviePrice}</span>}
                          {item.moviePrice && item.quantity && ' | '}
                          {item.quantity && <span><strong>Quantity:</strong> {item.quantity}</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieHistory;
