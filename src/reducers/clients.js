import {
  REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR, CLEAR_ERROR,
  REGISTER_CLIENT, REGISTER_CLIENT_ERROR, REGISTER_CLIENT_SUCCESS,
  UPDATE_CLIENT, UPDATE_CLIENT_ERROR, UPDATE_CLIENT_SUCCESS, LOGOUT,
  GET_CURRENT_CLIENT, GET_CURRENT_CLIENT_ERROR, GET_CURRENT_CLIENT_SUCCESS
} from '../actions/clients';

const INITIAL_STATE = {
  error: null,
  client: null,
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_CLIENT:
      return { ...state, isLoading: true };

    case REQUEST_LOGIN:
    case REGISTER_CLIENT:
    case UPDATE_CLIENT:
      return { ...state, isLoading: true };

    case REQUEST_LOGIN_SUCCESS:
    case UPDATE_CLIENT_SUCCESS:
    case REGISTER_CLIENT_SUCCESS:
    case GET_CURRENT_CLIENT_SUCCESS:
      return { ...state, client: action.client };

    case REQUEST_LOGIN_ERROR:
    case REGISTER_CLIENT_ERROR:
    case UPDATE_CLIENT_ERROR:
    case GET_CURRENT_CLIENT_ERROR:
      return { ...state, error: action.error, isLoading: false };

    case CLEAR_ERROR:
      return { ...state, error: null, isLoading: false };

    case LOGOUT:
      return { ...state, error: null, client: null };
      
    default:
      return state;
  }
};
