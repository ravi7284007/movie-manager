const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_WATCHLIST_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_WATCHLIST_SUCCESS':
        return { ...state, loading: false, items: action.payload };
      case 'FETCH_WATCHLIST_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default watchlistReducer;
  