import { CLEAR_ERROR, GET_DISTRICTS, GET_DISTRICTS_ERROR, GET_DISTRICTS_SUCCESS } from '../actions/districts';

const INITIAL_STATE = {
    isLoading: false,
    districts: [],
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_DISTRICTS:
        return { ...state, isLoading: true };
      case GET_DISTRICTS_SUCCESS:
        return { ...state, isLoading: false, districts: action.data };
      case GET_DISTRICTS_ERROR:
        return { ...state, isLoading: false, error: action.error };
      case CLEAR_ERROR:
        return { ...state, error: null };
      default:
        return state;
    }
};
