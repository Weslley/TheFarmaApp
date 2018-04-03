export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_DISTRICTS = "CLEAR_DISTRICTS";

export const GET_DISTRICTS = "GET_DISTRICTS";
export const GET_DISTRICTS_ERROR = "GET_DISTRICTS_ERROR";
export const GET_DISTRICTS_SUCCESS = "GET_DISTRICTS_SUCCESS";

export const GET_DISTRICTS_NEXT_PAGE = "GET_DISTRICTS_NEXT_PAGE";
export const GET_DISTRICTS_NEXT_PAGE_ERROR = "GET_DISTRICTS_NEXT_PAGE_ERROR";
export const GET_DISTRICTS_NEXT_PAGE_SUCCESS = "GET_DISTRICTS_NEXT_PAGE_SUCCESS";

export const getDistricts = (params) => ({
  type: GET_DISTRICTS, params
});

export const getDistrictsNextPage = (params) => ({
  type: GET_DISTRICTS_NEXT_PAGE, params
});

export const clearDistricts = () => ({
  type: CLEAR_DISTRICTS
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

/** Action results body */
export const responseSuccess = (type, data) => ({
  type, data
});

export const responseError = (type, error) => ({
  type, error
});
