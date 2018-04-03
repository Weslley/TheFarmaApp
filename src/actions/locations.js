export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const REQUEST_GEOCODE = 'REQUEST_GEOCODE';
export const REQUEST_GEOCODE_SUCCESS = 'REQUEST_GEOCODE_SUCCESS';
export const REQUEST_GEOCODE_ERROR = 'REQUEST_GEOCODE_ERROR';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const updateLocation = (uf, latitude, longitude) => ({
    type: UPDATE_LOCATION,
    uf, latitude, longitude
});

export const getGeocodeAddress = (latitude, longitude) => ({
    type: REQUEST_GEOCODE, latitude, longitude
});

/** Action results body */
export const responseSuccess = (type, result) => ({
    type, result
  });
  
  export const responseError = (type, error) => ({
    type, error
  });
  
  export const clearError = () => ({
    type: CLEAR_ERROR
  });
  