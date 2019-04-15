export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_GENERICS = "CLEAR_GENERICS";

export const GET_GENERICS = "GET_GENERICS";
export const GET_GENERICS_ERROR = "GET_GENERICS_ERROR";
export const GET_GENERICS_SUCCESS = "GET_GENERICS_SUCCESS";

export const GET_GENERICS_NEXT_PAGE = "GET_GENERICS_NEXT_PAGE";
export const GET_GENERICS_NEXT_PAGE_ERROR = "GET_GENERICS_NEXT_PAGE_ERROR";
export const GET_GENERICS_NEXT_PAGE_SUCCESS = "GET_GENERICS_NEXT_PAGE_SUCCESS";

export const getGenerics = (uf, apresentation_id) => ({
  type: GET_GENERICS,
  uf, apresentation_id
});

export const clearGenerics = () => ({
  type: CLEAR_GENERICS
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
