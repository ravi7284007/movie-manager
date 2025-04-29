const initialState = {
    list: [],
    loading: false,
    error: null
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_REVIEWS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_REVIEWS_SUCCESS':
        return { ...state, loading: false, list: action.payload };
      case 'FETCH_REVIEWS_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  