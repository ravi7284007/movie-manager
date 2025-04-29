import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, selectMovie } from '../actions/movieActions';
import { useNavigate } from 'react-router-dom';
import { clearSearchResults } from '../actions/movieActions';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { results, loading, error } = useSelector(state => state.movies);
    const user = useSelector(state => state.auth.user);
    const handleSearch = e => {
        e.preventDefault();
        if (query.trim()) dispatch(searchMovies(query));
    };

    const handleSelect = (movie) => {
        dispatch(selectMovie(movie));
        navigate(`/movie/${movie.id}`);
    };
    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            dispatch(clearSearchResults()); 
        }
    }, [user, dispatch, navigate]);

    return (
        <div className="card p-4 shadow">
            <h3>Search Movies</h3>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title or genre"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </form>

            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && results.length === 0 && query && (
                <div className="alert alert-warning">No movies found.</div>
            )}
            <div className="row">
                {results.map(movie => (
                    <div className="col-md-4 mb-3" key={movie.id}>
                        <div className="card h-100" style={{
                                borderColor: movie.rating < 5 ? 'orange' : 'green',
                            }}>
                            <div className="card-body">
                                <img src={movie.poster} class="card-img-top mb-2" alt={movie.title} />
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                                <p className="card-text"><strong>Rating:</strong> {movie.rating}</p>
                                <button className="btn btn-outline-primary" onClick={() => handleSelect(movie)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
