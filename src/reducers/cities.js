import { CLEAR_ERROR, GET_CITIES, GET_CITIES_ERROR, GET_CITIES_SUCCESS } from '../actions/cities';

const INITIAL_STATE = {
    isLoading: false,
    cities: [],
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CITIES:
        return { ...state, isLoading: true };
      case GET_CITIES_SUCCESS:
        return { ...state, isLoading: false, cities: action.data};
      case GET_CITIES_ERROR:
        return { ...state, isLoading: false, error: action.error };
      case CLEAR_ERROR:
        return { ...state, error: null };
      default:
        return state;
    }
};
