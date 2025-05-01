import axios from 'axios';

export const bookMovie = (movie, userId) => async (dispatch) => {
    try {
        const movieWithUser = {
            userId,
            movieId: movie.id,
            movie
        };

        await axios.post('http://localhost:5000/bookedMovies', movieWithUser);

        dispatch({ type: 'BOOK_MOVIE_SUCCESS', payload: movieWithUser });
    } catch (error) {
        dispatch({ type: 'BOOK_MOVIE_FAILURE', error: 'Failed to book movie' });
    }
};

export const fetchBookedMovies = (userId) => async (dispatch) => {
    dispatch({ type: 'FETCH_BOOKED_MOVIES_REQUEST' });
    try {
        const res = await axios.get(`http://localhost:5000/bookedMovies?userId=${userId}`);
        dispatch({ type: 'FETCH_BOOKED_MOVIES_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'FETCH_BOOKED_MOVIES_FAILURE', error: 'Failed to fetch booked movies' });
    }
};