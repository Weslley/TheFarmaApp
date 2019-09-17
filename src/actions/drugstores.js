export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_DRUGSTORE = "CLEAR_DRUGSTORE";

export const GET_DRUGSTORE = "GET_DRUGSTORE";
export const GET_DRUGSTORE_ERROR = "GET_DRUGSTORE_ERROR";
export const GET_DRUGSTORE_SUCCESS = "GET_DRUGSTORE_SUCCESS";

export const getDrugstore = (params) => ({
  type: GET_DRUGSTORE, params
});

export const clearDrugstore = () => ({
  type: CLEAR_DRUGSTORE
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
