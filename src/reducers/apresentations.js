import { uniqBy, union } from 'lodash';

import {
  CLEAR_ERROR, CLEAR_APRESENTATIONS,
  GET_APRESENTATIONS, GET_APRESENTATIONS_ERROR, GET_APRESENTATIONS_SUCCESS,
  GET_APRESENTATIONS_NEXT_PAGE, GET_APRESENTATIONS_NEXT_PAGE_ERROR, GET_APRESENTATIONS_NEXT_PAGE_SUCCESS
} from '../actions/apresentations';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  product: "",

  count: 0,
  num_pages: 0,
  next: null,
  previous: null,
  apresentations: [],
};

export default (state = INITIAL_STATE, action) => {
  let list = [];
  switch (action.type) {
    case GET_APRESENTATIONS:
    case GET_APRESENTATIONS_NEXT_PAGE:
      return { ...state, isLoading: true };
    case GET_APRESENTATIONS_SUCCESS:
    case GET_APRESENTATIONS_NEXT_PAGE_SUCCESS:
      list = uniqBy(union(action.data.results, state.apresentations), "id");
      return { 
        ...state, 
        isLoading: false, 
        count: action.data.count,
        num_pages: action.data.num_pages,
        next: action.data.next,
        previous: action.data.previous,
        apresentations:  list
      };
    case GET_APRESENTATIONS_ERROR:
      return { ...state, isLoading: false, error: action.error };
    case CLEAR_APRESENTATIONS:
      return { ...state, error: null, apresentations: [], count: 0, num_pages: 0, next: null};
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
