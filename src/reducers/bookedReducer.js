const initialState = {
    loading: false,
    error: null,
    booked: [],
};

const bookedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVIES_SUCCESS_TOP':
            return { ...state, loading: false, topRated: action.payload };
        case 'MOVIES_FAILURE':
            return { ...state, loading: false, error: action.error };
        case 'SELECT_MOVIE':
            return { ...state, selectedMovie: action.payload };
        case 'BOOK_MOVIE_SUCCESS':
            return {
                ...state,
                booked: [...(state.booked || []), action.payload]
            };

        case 'FETCH_BOOKED_MOVIES_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_BOOKED_MOVIES_SUCCESS':
            return { ...state, loading: false, booked: action.payload };

            case 'BOOK_MOVIE_FAILURE':
            return { ...state, loading: false, error: action.error };

        case 'FETCH_BOOKED_MOVIES_FAILURE':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default bookedReducer;
