import API from "../utils/api";

export const fetchReviews = (movieId) => async (dispatch) => {
  dispatch({ type: "FETCH_REVIEWS_REQUEST" });
  try {
    const res = await API.get(`/reviews?movieId=${movieId}`);
    dispatch({ type: "FETCH_REVIEWS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "FETCH_REVIEWS_FAILURE", error: err.message });
  }
};

export const addReview = (review) => async (dispatch) => {
  await API.post("/reviews", review);
  dispatch(fetchReviews(review.movieId));
};

export const updateReview = (reviewId, review) => async (dispatch) => {
  await API.put(`/reviews/${reviewId}`, review);
  dispatch(fetchReviews(review.movieId));
};

export const deleteReview = (reviewId, movieId) => async (dispatch) => {
  await API.delete(`/reviews/${reviewId}`);
  dispatch(fetchReviews(movieId));
};
