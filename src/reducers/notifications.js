import { uniqBy, union, sortBy, orderBy } from "lodash";

import {
  CLEAR_ERROR,
  CLEAR_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_ERROR,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_NEXT_PAGE,
  GET_NOTIFICATIONS_NEXT_PAGE_ERROR,
  GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS,
  VIEW_NOTIFICATION,
  VIEW_NOTIFICATION_ERROR,
  VIEW_NOTIFICATION_SUCCESS
} from "../actions/notifications";

const INITIAL_STATE = {
  loading: false,
  error: null,

  count: 0,
  num_pages: 0,
  next: null,
  previous: null,
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  let list = [];
  let index = null;
  let notification = null;
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        loading: true,
        error: null,
        success: false
      };

    case GET_NOTIFICATIONS_NEXT_PAGE:
      return { ...state, loading: true, error: null, success: false };

    case GET_NOTIFICATIONS_SUCCESS:
    case GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS:
      list = uniqBy(union(action.data.results, state.notifications), "id");
      list = orderBy(list, ["id"], ["desc"]);
      return {
        ...state,
        loading: false,
        count: action.data.count,
        num_pages: action.data.num_pages,
        next: action.data.next,
        previous: action.data.previous,
        notifications: list
      };

    /*
    case VIEW_NOTIFICATION_SUCCESS:
      return { ...state };
      try {
        list = state.notifications.filter((x) => x.id !== action.data.notificacao.id);
        return { ...state, notifications: list };
      } catch (error) {
        return { ...state };
      }
    */

    case GET_NOTIFICATIONS_ERROR:
    case GET_NOTIFICATIONS_NEXT_PAGE_ERROR:
      return { ...state, error: action.error, loading: false };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        error: null,
        notifications: [],
        count: 0,
        num_pages: 0,
        next: null
      };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
