import { CLEAR_ERROR, GET_DRUGSTORE, GET_DRUGSTORE_ERROR, GET_DRUGSTORE_SUCCESS } from '../actions/drugstores';

const INITIAL_STATE = {
  drugstore: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DRUGSTORE:
      return { ...state, loading: true, drugstore: null };

    case GET_DRUGSTORE_SUCCESS:
      return { ...state, loading: false, drugstore: action.data };

    case GET_DRUGSTORE_ERROR:
      return { ...state, loading: false, error: action.error };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
