import {
  CLEAR_ERROR, CLEAR_CREDIT_CARD, CLEAR_CREDIT_CARDS,
  SELECT_CREDIT_CARD, SELECT_CREDIT_CARD_ERROR, SELECT_CREDIT_CARD_SUCCESS,
  LIST_CREDIT_CARD, LIST_CREDIT_CARD_ERROR, LIST_CREDIT_CARD_SUCCESS,
  SAVE_CREDIT_CARD, SAVE_CREDIT_CARD_ERROR, SAVE_CREDIT_CARD_SUCCESS,
  UPDATE_CREDIT_CARD, UPDATE_CREDIT_CARD_ERROR, UPDATE_CREDIT_CARD_SUCCESS,
  REMOVE_CREDIT_CARD, REMOVE_CREDIT_CARD_ERROR, REMOVE_CREDIT_CARD_SUCCESS,
  LIST_CREDIT_CARD_NEXT_PAGE, LIST_CREDIT_CARD_NEXT_PAGE_ERROR, LIST_CREDIT_CARD_NEXT_PAGE_SUCCESS,
} from '../actions/creditCards';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  creditCard: null,
  creditCards: [],
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  let creditCard = null;
  let list = [];
  let index = null;
  switch (action.type) {
    case SELECT_CREDIT_CARD:
      return { ...state, creditCard: action.params };

    case LIST_CREDIT_CARD:
    case SAVE_CREDIT_CARD:
    case UPDATE_CREDIT_CARD:
    case REMOVE_CREDIT_CARD:
    case LIST_CREDIT_CARD_NEXT_PAGE:
      return { ...state, isLoading: true, success: false };

    case LIST_CREDIT_CARD_SUCCESS:
    case LIST_CREDIT_CARD_NEXT_PAGE_SUCCESS:
      return { ...state, isLoading: false, creditCards: action.data };

    case SAVE_CREDIT_CARD_SUCCESS:
    case UPDATE_CREDIT_CARD_SUCCESS:
      return { ...state, creditCard: action.data, success: true };

    case REMOVE_CREDIT_CARD_SUCCESS:
      list = [...state.creditCards];
      index = list.findIndex(item => item.id === action.data.id);
      creditCard = list.find(item => item.id === action.data.id);
      if (creditCard) list.splice(index, 1);
      return { ...state, creditCards: [...list] };

    case LIST_CREDIT_CARD_ERROR:
    case SAVE_CREDIT_CARD_ERROR:
    case UPDATE_CREDIT_CARD_ERROR:
    case REMOVE_CREDIT_CARD_ERROR:
    case LIST_CREDIT_CARD_NEXT_PAGE_ERROR:
      return { ...state, error: action.error, success: false };

    case CLEAR_ERROR:
      return { ...state, error: null, success: false };

    case CLEAR_CREDIT_CARD:
      return { ...state, error: null, creditCard: null, success: false };

    case CLEAR_CREDIT_CARDS:
      return { ...state, error: null, creditCards: null, success: false };

    default:
      return state;
  }
};
