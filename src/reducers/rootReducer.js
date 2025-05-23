import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import watchlistReducer from './watchlistReducer';
import reviewReducer from './reviewReducer';
import bookedReducer from './bookedReducer';

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  watchlist: watchlistReducer,
  reviews: reviewReducer,
  bookedMovies: bookedReducer
});
