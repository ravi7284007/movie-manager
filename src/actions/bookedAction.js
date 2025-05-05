import axios from 'axios';

export const bookMovie = (movie, userId) => async (dispatch) => {
    try {
        const movieId = movie.id;

        const response = await axios.get(`http://localhost:5000/bookedMovies`, {
            params: {
                userId,
                movieId
            }
        });

        if (response.data.length > 0) {
            dispatch({ type: 'BOOK_MOVIE_FAILURE', error: 'Movie already booked' });
            return;
        }

        const movieWithUser = {
            userId,
            movieId,
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