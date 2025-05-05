import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookedMovies } from '../actions/bookedAction';
import { useNavigate } from 'react-router-dom';
import { selectMovie } from '../actions/movieActions';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';


const BookedMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const { booked, loading, error } = useSelector(state => state.bookedMovies);
  const printRef = useRef();
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
        dispatch(fetchBookedMovies(user.id)); 
      }
    } catch (err) {
      console.error('Failed to delete movie:', err);
      alert('Failed to remove movie');
    }
  };

  const updateQuantity = async (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1 || newQuantity > 10) return;

    try {
      await axios.patch(`http://localhost:5000/bookedMovies/${item.id}`, {
        quantity: newQuantity
      });
      console.log(newQuantity);
      
      dispatch(fetchBookedMovies(user.id));
    } catch (err) {
      console.error('Failed to update quantity:', err);
      alert('Quantity update failed');
    }
  };

  const calculateTotal = () => {
    const subtotal = booked.reduce((acc, item) => acc + item.moviePrice * item.quantity, 0);
    const discount = subtotal > 1500 ? 200 : 0;
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };
  const { subtotal, discount, total } = calculateTotal();

  const handleSlectedMovie = ({ movie }) => {
    dispatch(selectMovie(movie))
    navigate(`/movie/${movie.id}`);
  }

  const handlePrint = () => {
    const input = printRef.current;
    html2canvas(input, { useCORS: true, allowTaint: false, scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('booked-movies.pdf');
    });
  };

  if (loading) return <p>Loading booked movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container" ref={printRef}>
      <h2 className="mb-4">Booked Movies Cart</h2>
      {booked.length === 0 ? (
        <p>No movies booked yet.</p>
      ) : (
        <div className='row'>
          <div className='col-md-8 card'>
            <div className="row movieList">

              {booked.map(item => (
                <div className="col-md-12 mb-3 " key={item.id}>
                  <div className="row h-100" style={booked.length > 0 ? { borderBottom: '1px solid #0000002d'} : null}>
                    <div className='col-md-2'>
                      <img onClick={() => handleSlectedMovie(item)} src={item.movie.poster} className="card-img-top" alt={item.movie.title} />
                    </div>
                    <div className='col-md-10'>
                      <div className="card-body">
                        <h4 className="card-title d-flex justify-content-between" onClick={() => handleSlectedMovie(item)} >{item.movie.title} <strong className='fs-4'>₹ {item.moviePrice}</strong></h4>

                        <p><strong>Rating:</strong> {item.movie.rating}</p>
                        <p>
                          <strong>Quantity:</strong>
                          <button className="btn btn-sm btn-secondary mx-2" onClick={() => updateQuantity(item, -1)}>-</button>
                          {item.quantity}
                          <button className="btn btn-sm btn-secondary mx-2" onClick={() => updateQuantity(item, 1)}>+</button>
                        </p>
                        <button onClick={() => handleRemove(item.movieId)} className="btn btn-primary" >
                          Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleRemove(item.movieId)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              {/* <div className="card-body">
                <h5 className="card-title">Total Summary</h5>
                <hr />
                <p><strong>Subtotal:</strong> ₹ {subtotal}</p>
                <p><strong>Discount:</strong> ₹ {discount}</p>
                <hr />
                <h2><strong>Total:</strong> ₹ {total}</h2>
              </div>
              <button className="btn btn-success w-100 mt-2" onClick={handlePrint} data-html2canvas-ignore="true">
                Print Tickets
              </button> */}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookedMovies;
