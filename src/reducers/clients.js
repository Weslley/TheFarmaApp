import {
  SET_PHOTO,
  SEND_SMS, SEND_SMS_SUCCESS, SEND_SMS_ERROR,
  UPDATE_CLIENT_V2, UPDATE_CLIENT_V2_SUCCESS, UPDATE_CLIENT_V2_ERROR,
  REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR, CLEAR_ERROR,
  REGISTER_CLIENT, REGISTER_CLIENT_ERROR, REGISTER_CLIENT_SUCCESS,
  UPDATE_CLIENT, UPDATE_CLIENT_ERROR, UPDATE_CLIENT_SUCCESS, LOGOUT,
  GET_CURRENT_CLIENT, GET_CURRENT_CLIENT_ERROR, GET_CURRENT_CLIENT_SUCCESS
} from '../actions/clients';

const INITIAL_STATE = {
  error: null,
  client: null,
  loading: false,
  photo: null,
  photo64: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PHOTO:
      return { ...state, photo: action.params.path, photo64: action.params.base64, success: false };

    case SEND_SMS:
    case REQUEST_LOGIN:
    case REGISTER_CLIENT:
    case UPDATE_CLIENT:
    case UPDATE_CLIENT_V2:
    case GET_CURRENT_CLIENT:
      return { ...state, loading: true, error: null, success: false };

    case SEND_SMS_SUCCESS:
    case REQUEST_LOGIN_SUCCESS:
    case REGISTER_CLIENT_SUCCESS:
    case GET_CURRENT_CLIENT_SUCCESS:
    case UPDATE_CLIENT_SUCCESS:
    case UPDATE_CLIENT_V2_SUCCESS:
      return { ...state, client: action.client, loading: false, error: null, success: true };

    case SEND_SMS_ERROR:
    case REQUEST_LOGIN_ERROR:
    case REGISTER_CLIENT_ERROR:
    case GET_CURRENT_CLIENT_ERROR:
    case UPDATE_CLIENT_ERROR:
    case UPDATE_CLIENT_V2_ERROR:
      return { ...state, error: action.error, loading: false, success: false };

    case CLEAR_ERROR:
      return { ...state, error: null, loading: false, success: false };

    case LOGOUT:
      return { ...state, error: null, client: null };

    default:
      return state;
  }
};
