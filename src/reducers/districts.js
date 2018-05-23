import { uniqBy, union, sortBy, orderBy } from 'lodash';

import { CLEAR_ERROR, GET_DISTRICTS, GET_DISTRICTS_ERROR, GET_DISTRICTS_SUCCESS } from '../actions/districts';

const INITIAL_STATE = {
  isLoading: false,
  districts: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  let list = []
  switch (action.type) {
    case GET_DISTRICTS:
      return { ...state, isLoading: true, districts: [] };

    case GET_DISTRICTS_SUCCESS:
      //list = uniqBy(union(action.data.results, state.orders), "id");
      list = orderBy(action.data, ['nome'], ['asc'])
      return { ...state, isLoading: false, districts: list };

    case GET_DISTRICTS_ERROR:
      return { ...state, isLoading: false, error: action.error };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
