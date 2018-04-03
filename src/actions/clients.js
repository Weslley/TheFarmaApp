export const LOGOUT = "LOGOUT";

export const CLEAR_ERROR = "CLEAR_ERROR";

export const GET_CURRENT_CLIENT = "GET_CURRENT_CLIENT";
export const GET_CURRENT_CLIENT_ERROR = "GET_CURRENT_CLIENT_ERROR";
export const GET_CURRENT_CLIENT_SUCCESS = "GET_CURRENT_CLIENT_SUCCESS";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_ERROR = "REQUEST_LOGIN_ERROR";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";

export const REGISTER_CLIENT = "REGISTER_CLIENT";
export const REGISTER_CLIENT_ERROR = "REGISTER_CLIENT_ERROR";
export const REGISTER_CLIENT_SUCCESS = "REGISTER_CLIENT_SUCCESS";

export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_CLIENT_ERROR = "UPDATE_CLIENT_ERROR";
export const UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS";

export const getCurrentClient = () => ({
  type: GET_CURRENT_CLIENT
});

export const login = params => ({
  type: REQUEST_LOGIN, params
});

export const register = params => ({
  type: REGISTER_CLIENT, params
});

export const update = params => ({
  type: UPDATE_CLIENT, params
});

export const logout = () => ({
  type: LOGOUT
});

/** Action results body */
export const responseSuccess = (type, client) => ({
  type, client
});

export const responseError = (type, error) => ({
  type, error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
