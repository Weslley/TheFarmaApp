export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_CITIES = "CLEAR_CITIES";

export const GET_CITIES = "GET_CITIES";
export const GET_CITIES_ERROR = "GET_CITIES_ERROR";
export const GET_CITIES_SUCCESS = "GET_CITIES_SUCCESS";

export const GET_CITIES_NEXT_PAGE = "GET_CITIES_NEXT_PAGE";
export const GET_CITIES_NEXT_PAGE_ERROR = "GET_CITIES_NEXT_PAGE_ERROR";
export const GET_CITIES_NEXT_PAGE_SUCCESS = "GET_CITIES_NEXT_PAGE_SUCCESS";

export const getCities = () => ({
  type: GET_CITIES
});

export const getCitiesNextPage = (params) => ({
  type: GET_CITIES, params
});

export const clearCities = () => ({
  type: CLEAR_CITIES
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

/** Action results body */
export const responseSuccess = (type, data) => ({
  type, data
});

export const responseError = (type, error) => ({
  type,
  error
});