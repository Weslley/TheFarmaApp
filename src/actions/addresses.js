export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_ADDRESS = "CLEAR_ADDRESS";
export const CLEAR_ADDRESSES = "CLEAR_ADDRESSES";

export const LIST_ADDRESS = "LIST_ADDRESS";
export const LIST_ADDRESS_ERROR = "LIST_ADDRESS_ERROR";
export const LIST_ADDRESS_SUCCESS = "LIST_ADDRESS_SUCCESS";

export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const SAVE_ADDRESS_ERROR = "SAVE_ADDRESS_ERROR";
export const SAVE_ADDRESS_SUCCESS = "SAVE_ADDRESS_SUCCESS";

export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_ADDRESS_ERROR = "UPDATE_ADDRESS_ERROR";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";

export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const REMOVE_ADDRESS_ERROR = "REMOVE_ADDRESS_ERROR";
export const REMOVE_ADDRESS_SUCCESS = "REMOVE_ADDRESS_SUCCESS";

export const LIST_ADDRESS_NEXT_PAGE = "LIST_ADDRESS_NEXT_PAGE";
export const LIST_ADDRESS_NEXT_PAGE_ERROR = "LIST_ADDRESS_NEXT_PAGE_ERROR";
export const LIST_ADDRESS_NEXT_PAGE_SUCCESS = "LIST_ADDRESS_NEXT_PAGE_SUCCESS";

export const getAddresses = params => ({
  type: LIST_ADDRESS, params
});

export const getAddressesNextPage = (next) => ({
  type: GET_APRESENTATIONS_NEXT_PAGE,
  next
});

export const saveAddress = params => ({
  type: SAVE_ADDRESS, params
});

export const updateAddress = params => ({
  type: UPDATE_ADDRESS, params
});

export const removeAddress = params => ({
  type: REMOVE_ADDRESS
});

export const clearAddress = () => ({
  type: CLEAR_ADDRESS
});

export const clearAddresses = () => ({
  type: CLEAR_ADDRESSES
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

