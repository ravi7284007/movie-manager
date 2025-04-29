import axios from 'axios';

const API_KEY = '39ec56d8c0e278c628a49b299b259b7c';

export const searchMovies = (query) => async (dispatch) => {
  dispatch({ type: 'MOVIES_REQUEST' });
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    const movies = res.data.results.map(movie => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`,
      title: movie.title,
      genre: 'N/A', 
      description: movie.overview,
      cast: '',
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    dispatch({ type: 'MOVIES_SUCCESS', payload: movies });
  } catch (error) {
    dispatch({ type: 'MOVIES_FAILURE', error: 'Failed to fetch movies' });
  }
};

export const fetchTopRatedMovies = () => async (dispatch) => {
  dispatch({ type: 'MOVIES_REQUEST_TOP' });
  try {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: API_KEY,
        sort_by: 'popularity.desc', 
        page: randomPage,
      },
    });
    const topMovies = res.data.results.map(movie => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`,
      title: movie.title,
      genre: 'N/A',
      description: movie.overview,
      cast: '',
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    dispatch({ type: 'MOVIES_SUCCESS_TOP', payload: topMovies });
  } catch (error) {
    dispatch({ type: 'MOVIES_FAILURE', error: 'Failed to fetch top-rated movies' });
  }
};

export const selectMovie = (movie) => ({
  type: 'SELECT_MOVIE',
  payload: movie
});


export const bookMovie = (movie) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/bookedMovies', movie);
    dispatch({ type: 'BOOK_MOVIE_SUCCESS', payload: movie });
  } catch (error) {
    dispatch({ type: 'BOOK_MOVIE_FAILURE', error: 'Failed to book movie' });
  }
};

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS',
});