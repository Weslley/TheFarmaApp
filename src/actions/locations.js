export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_ADDRESS = 'CLEAR_ADDRESS';

export const GET_LOCATION = 'GET_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const REQUEST_GEOCODE = 'REQUEST_GEOCODE';
export const REQUEST_GEOCODE_SUCCESS = 'REQUEST_GEOCODE_SUCCESS';
export const REQUEST_GEOCODE_ERROR = 'REQUEST_GEOCODE_ERROR';

export const GET_ADDRESS_BY_CEP = 'GET_ADDRESS_BY_CEP';
export const GET_ADDRESS_BY_CEP_SUCCESS = 'GET_ADDRESS_BY_CEP_SUCCESS';
export const GET_ADDRESS_BY_CEP_ERROR = 'GET_ADDRESS_BY_CEP_ERROR';

export const getLocation = () => ({
  type: GET_LOCATION
});

export const updateLocation = (uf, latitude, longitude) => ({
  type: UPDATE_LOCATION,
  uf, latitude, longitude
});

export const getGeocodeAddress = (params) => ({
  type: REQUEST_GEOCODE, params
});

export const getAddressByCep = (params) => ({
  type: GET_ADDRESS_BY_CEP, params
});

/** Action results body */
export const responseSuccess = (type, data) => ({
  type, data
});

export const responseError = (type, error) => ({
  type, error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const clearAddress = () => ({
  type: CLEAR_ADDRESS
});