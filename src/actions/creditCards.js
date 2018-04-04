export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_CREDIT_CARD = "CLEAR_CREDIT_CARD";
export const CLEAR_CREDIT_CARDS = "CLEAR_CREDIT_CARDS";

export const SELECT_CREDIT_CARD = "SELECT_CREDIT_CARD";
export const SELECT_CREDIT_CARD_ERROR = "SELECT_CREDIT_CARD_ERROR";
export const SELECT_CREDIT_CARD_SUCCESS = "SELECT_CREDIT_CARD_SUCCESS";

export const LIST_CREDIT_CARD = "LIST_CREDIT_CARD";
export const LIST_CREDIT_CARD_ERROR = "LIST_CREDIT_CARD_ERROR";
export const LIST_CREDIT_CARD_SUCCESS = "LIST_CREDIT_CARD_SUCCESS";

export const SAVE_CREDIT_CARD = "SAVE_CREDIT_CARD";
export const SAVE_CREDIT_CARD_ERROR = "SAVE_CREDIT_CARD_ERROR";
export const SAVE_CREDIT_CARD_SUCCESS = "SAVE_CREDIT_CARD_SUCCESS";

export const UPDATE_CREDIT_CARD = "UPDATE_CREDIT_CARD";
export const UPDATE_CREDIT_CARD_ERROR = "UPDATE_CREDIT_CARD";
export const UPDATE_CREDIT_CARD_SUCCESS = "UPDATE_CREDIT_CARD";

export const REMOVE_CREDIT_CARD = "REMOVE_CREDIT_CARD";
export const REMOVE_CREDIT_CARD_ERROR = "REMOVE_CREDIT_CARD_ERROR";
export const REMOVE_CREDIT_CARD_SUCCESS = "REMOVE_CREDIT_CARD_SUCCESS";

export const LIST_CREDIT_CARD_NEXT_PAGE = "LIST_CREDIT_CARD_NEXT_PAGE";
export const LIST_CREDIT_CARD_NEXT_PAGE_ERROR = "LIST_CREDIT_CARD_NEXT_PAGE_ERROR";
export const LIST_CREDIT_CARD_NEXT_PAGE_SUCCESS = "LIST_CREDIT_CARD_NEXT_PAGE_SUCCESS";

export const selectCreditCard = params => ({
  type: SELECT_CREDIT_CARD, params
});

export const getCreditCards = params => ({
  type: LIST_CREDIT_CARD, params
});

export const getCreditCardsNextPage = (next) => ({
  type: GET_APRESENTATIONS_NEXT_PAGE,
  next
});

export const saveCreditCard = params => ({
  type: SAVE_CREDIT_CARD, params
});

export const updateCreditCard = params => ({
  type: UPDATE_CREDIT_CARD, params
});

export const removeCreditCard = params => ({
  type: REMOVE_CREDIT_CARD
});

export const clearCreditCard = () => ({
  type: CLEAR_CREDIT_CARD
});

export const clearCreditCards = () => ({
  type: CLEAR_CREDIT_CARDES
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

