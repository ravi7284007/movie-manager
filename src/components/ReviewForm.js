import React, { useState } from 'react';

const ReviewForm = ({ movieId, onSubmit, existingReview }) => {
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [rating, setRating] = useState(existingReview?.rating || 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      movieId,
      userId: 1,
      username: 'Ravi',
      comment,
      rating: parseInt(rating)
    };
    if (existingReview?.id) review.id = existingReview.id;
    onSubmit(review);
    setComment('');
    setRating(3);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        className="form-control mb-2"
        placeholder="Leave a review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <select
        className="form-control mb-2"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} Stars</option>
        ))}
      </select>
      <button className="btn btn-success">{existingReview ? "Update" : "Submit"} Review</button>
    </form>
  );
};

export default ReviewForm;
