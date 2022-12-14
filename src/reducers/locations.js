import {
  CLEAR_ERROR, CLEAR_ADDRESS, UPDATE_LOCATION,
  REQUEST_GEOCODE, REQUEST_GEOCODE_SUCCESS, REQUEST_GEOCODE_ERROR,
  GET_ADDRESS_BY_CEP, GET_ADDRESS_BY_CEP_SUCCESS, GET_ADDRESS_BY_CEP_ERROR,
} from '../actions/locations';

const INITIAL_STATE = {
  address: null,
  latitude: -5.083036,
  longitude: -42.796248,
  uf: 'PI',
  loading: false,
  success: false,
  error: null,
  address_by_cep: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, uf: action.uf, latitude: action.latitude, longitude: action.longitude };

    case REQUEST_GEOCODE:
    case GET_ADDRESS_BY_CEP:
      return { ...state };

    case REQUEST_GEOCODE_SUCCESS:
      return { ...state, address: action.data, uf: action.data.uf, success: true, loading: false, error: null };

    case GET_ADDRESS_BY_CEP_SUCCESS:
      return { ...state, address_by_cep: action.data, loading: false, error: null };

    case REQUEST_GEOCODE_ERROR:
    case GET_ADDRESS_BY_CEP_ERROR:
      return { ...state, error: action.error };

    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_ADDRESS:
      return { ...state, address: null, error: null };
    default:
      return state;
  }
};
