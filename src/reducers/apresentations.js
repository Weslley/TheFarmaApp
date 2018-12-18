import { uniqBy, union, sortBy, orderBy, differenceBy, concat } from 'lodash';

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
  apresentations_zeroed: [],
};

export default (state = INITIAL_STATE, action) => {
  let list = [];
  let list_zerados = [];
  let list_nao_zerados = [];
  switch (action.type) {

    case GET_APRESENTATIONS:
      return { ...state, apresentations: [], apresentations_zeroed: [], isLoading: true, error: null, success: false };

    case GET_APRESENTATIONS_NEXT_PAGE:
      return { ...state, isLoading: true, error: null, success: false };

    case GET_APRESENTATIONS_SUCCESS:
    case GET_APRESENTATIONS_NEXT_PAGE_SUCCESS:
      list_zerados = action.data.results.filter((x) => parseFloat(x.pmc) === 0)
      list_zerados = uniqBy(union(list_zerados, state.apresentations_zeroed), "id");

      list_nao_zerados = action.data.results.filter((x) => parseFloat(x.pmc) !== 0)
      list = concat(state.apresentations, list_nao_zerados)
      if (action.data.next === null) {
        list = concat(list, list_zerados)
      }

      return {
        ...state,
        isLoading: false,
        count: action.data.count,
        num_pages: action.data.num_pages,
        next: action.data.next,
        previous: action.data.previous,
        apresentations: list,
        apresentations_zeroed: list_zerados
      };
    case GET_APRESENTATIONS_ERROR:
      return { ...state, error: action.error, isLoading: false };
    case CLEAR_APRESENTATIONS:
      return { ...state, error: null, apresentations: [], apresentations_zeroed: [], count: 0, num_pages: 0, next: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
