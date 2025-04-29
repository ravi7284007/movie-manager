import React from 'react';

const ReviewList = ({ reviews, onDelete, onEdit }) => (
  <div className="mt-4">
    <h5>Reviews</h5>
    {reviews.length === 0 && <p>No reviews yet.</p>}
    {reviews.map(r => (
      <div key={r.id} className="border rounded p-2 mb-2">
        <strong>{r.username}</strong> — {r.rating}⭐
        <p>{r.comment}</p>
        <button className="btn btn-sm btn-danger me-2" onClick={() => onDelete(r.id, r.movieId)}>Delete</button>
        <button className="btn btn-sm btn-warning" onClick={() => onEdit(r)}>Edit</button>
      </div>
    ))}
  </div>
);

export default ReviewList;
