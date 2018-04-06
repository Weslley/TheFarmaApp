import {
  CLEAR_ERROR, CLEAR_ADDRESS, CLEAR_ADDRESSES,
  SELECT_ADDRESS, SELECT_ADDRESS_ERROR, SELECT_ADDRESS_SUCCESS,
  LIST_ADDRESS, LIST_ADDRESS_ERROR, LIST_ADDRESS_SUCCESS,
  SAVE_ADDRESS, SAVE_ADDRESS_ERROR, SAVE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS, UPDATE_ADDRESS_ERROR, UPDATE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS, REMOVE_ADDRESS_ERROR, REMOVE_ADDRESS_SUCCESS,
  LIST_ADDRESS_NEXT_PAGE, LIST_ADDRESS_NEXT_PAGE_ERROR, LIST_ADDRESS_NEXT_PAGE_SUCCESS,
} from '../actions/addresses';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  address: null,
  addresses: [],
  actionSuccess: null,
};

export default (state = INITIAL_STATE, action) => {
  let address = null;
  let list = [];
  let index = null;
  switch (action.type) {
    case SELECT_ADDRESS:
      return { ...state, address: action.params };
    case LIST_ADDRESS:
    case SAVE_ADDRESS:
    case UPDATE_ADDRESS:
    case REMOVE_ADDRESS:
    case LIST_ADDRESS_NEXT_PAGE:
      return { ...state, isLoading: true };
    case LIST_ADDRESS_SUCCESS:
    case LIST_ADDRESS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: action.data
      };
    case SAVE_ADDRESS_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
      return { ...state, address: action.data, actionSuccess: 'back' };

    case REMOVE_ADDRESS_SUCCESS:
      list = [...state.addresses];
      index = list.findIndex(item => item.id === action.data.id);
      address = list.find(item => item.id === action.data.id);
      if (address) list.splice(index, 1);
      return { ...state, addresses: [...list] };
    case LIST_ADDRESS_ERROR:
    case SAVE_ADDRESS_ERROR:
    case UPDATE_ADDRESS_ERROR:
    case REMOVE_ADDRESS_ERROR:
    case LIST_ADDRESS_NEXT_PAGE_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ERROR:
      return { ...state, error: null, actionSuccess: null };
    case CLEAR_ADDRESS:
      return { ...state, error: null, address: null, actionSuccess: null };
    case CLEAR_ADDRESSES:
      return { ...state, error: null, addresses: null, actionSuccess: null };
    default:
      return state;
  }
};
