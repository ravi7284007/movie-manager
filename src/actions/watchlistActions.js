import API from '../utils/api';

export const fetchWatchlist = (userId) => async dispatch => {
    dispatch({ type: 'FETCH_WATCHLIST_REQUEST' });
    try {
      const res = await API.get(`/watchlist?userId=${userId}`);
      const movies = res.data.map(item => item.movie);
      dispatch({ type: 'FETCH_WATCHLIST_SUCCESS', payload: movies });
    } catch (err) {
      dispatch({ type: 'FETCH_WATCHLIST_FAILURE', error: err.message });
    }
  };

  export const addToWatchlist = (userId, movie) => async dispatch => {
    try {
      // Step 1: Check if movie already exists in watchlist
      const { data } = await API.get(`/watchlist?userId=${userId}&movieId=${movie.id}`);
      
      if (data.length > 0) {
        console.warn('Movie already in watchlist');
        return; // Don't add again
      }
  
      // Step 2: Add movie if not found
      await API.post(`/watchlist`, {
        userId,
        movieId: movie.id,
        movie, // Save full movie details
      });
  
      // Step 3: Refresh list
      dispatch(fetchWatchlist(userId));
    } catch (err) {
      console.error("Add to watchlist failed", err);
    }
  };

export const removeFromWatchlist = (userId, movieId) => async dispatch => {
  try {
    const { data } = await API.get(`/watchlist?userId=${userId}&movieId=${movieId}`);
    if (data.length > 0) {
      await API.delete(`/watchlist/${data[0].id}`);
      dispatch(fetchWatchlist(userId));
    }
  } catch (err) {
    console.error("Remove from watchlist failed", err);
  }
};
