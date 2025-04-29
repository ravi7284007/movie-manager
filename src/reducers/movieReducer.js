const initialState = {
  results: [],
  selectedMovie: null,
  loading: false,
  error: null,
  topRated: []
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIES_REQUEST':
    case 'MOVIES_REQUEST_TOP':
      return { ...state, loading: true, error: null };
    case 'MOVIES_SUCCESS':
      return {
        ...state,
        results: action.payload, 
        loading: false,
        error: null,
      };
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
      case 'CLEAR_SEARCH_RESULTS':
            return { ...state, results: [] }; 
    default:
      console.log('Unhandled action in movieReducer:', action);
      return state;
  }
};

export default movieReducer;
