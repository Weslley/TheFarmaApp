import { uniqBy, union } from 'lodash';

import {
  CLEAR_ERROR, CLEAR_GENERICS,
  GET_GENERICS, GET_GENERICS_ERROR, GET_GENERICS_SUCCESS,
  GET_GENERICS_NEXT_PAGE, GET_GENERICS_NEXT_PAGE_ERROR, GET_GENERICS_NEXT_PAGE_SUCCESS
} from '../actions/generics';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  product: "",

  count: 0,
  num_pages: 0,
  next: null,
  previous: null,
  generics: [],
};

export default (state = INITIAL_STATE, action) => {
  let list = [];
  switch (action.type) {

    case GET_GENERICS:
      return { ...state, generics: [], isLoading: true, error: null, success: false };

    case GET_GENERICS_NEXT_PAGE:
      return { ...state, isLoading: true, error: null, success: false };

    case GET_GENERICS_SUCCESS:
    case GET_GENERICS_NEXT_PAGE_SUCCESS:
      list = uniqBy(union(action.data.results, state.generics), "id");
      return {
        ...state,
        isLoading: false,
        count: action.data.count,
        num_pages: action.data.num_pages,
        next: action.data.next,
        previous: action.data.previous,
        generics: list
      };

    case GET_GENERICS_ERROR:
      return { ...state, isLoading: false, error: action.error };

    case CLEAR_GENERICS:
      return { ...state, error: null, generics: [], count: 0, num_pages: 0, next: null };

    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
