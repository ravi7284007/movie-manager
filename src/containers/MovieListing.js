import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovies } from '../actions/movieActions';
import { useNavigate } from 'react-router-dom';
import { bookMovie } from '../actions/movieActions';
import { selectMovie } from '../actions/movieActions';

const MovieListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);

    const { topRated, loading, error } = useSelector(state => state.movies);
    useEffect(() => {
        dispatch(fetchTopRatedMovies());

    }, [dispatch]);
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);
    const handleSelect = (movie) => {
        dispatch(selectMovie(movie));
        navigate(`/movie/${movie.id}`);
    };
    const handleBook = (movie) => {
        dispatch(bookMovie(movie));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movies: {error}</p>;

    return (
        <div className="movie-listing row">
            {topRated.map(movie => (
                <div
                    key={movie.id}
                    className="col-md-3 mb-3"

                >
                    <figure style={{
                        border: '2px solid',
                        borderColor: movie.rating < 5 ? 'orange' : 'green',
                        padding: '10px',
                        height: '100%'
                    }}>
                        <img src={movie.poster} alt={movie.title} />
                        <figcaption>
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.rating}</p>
                            <button className="btn btn-outline-primary me-1" onClick={() => handleBook(movie)}>
                                Book Now
                            </button>
                            <button className="btn btn-outline-primary" onClick={() => handleSelect(movie)}>View Details</button>

                        </figcaption>
                    </figure>
                </div>
            ))}
        </div>
    );
};

export default MovieListing;
