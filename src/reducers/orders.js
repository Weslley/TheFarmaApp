import { uniqBy, union } from 'lodash';

import {
    CLEAR_ERROR, CLEAR_ORDER, CLEAR_ORDERS,
    GET_ORDER, GET_ORDER_ERROR, GET_ORDER_SUCCESS,
    LIST_ORDER, LIST_ORDER_ERROR, LIST_ORDER_SUCCESS,
    CREATE_ORDER, CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS,
    UPDATE_ORDER, UPDATE_ORDER_ERROR, UPDATE_ORDER_SUCCESS,
    CANCEL_ORDER, CANCEL_ORDER_ERROR, CANCEL_ORDER_SUCCESS,
    GET_PROPOSALS, GET_PROPOSALS_ERROR, GET_PROPOSALS_SUCCESS,
    CHECKOUT, CHECKOUT_ERROR, CHECKOUT_SUCCESS,
    LIST_ORDER_NEXT_PAGE, LIST_ORDER_NEXT_PAGE_ERROR, LIST_ORDER_NEXT_PAGE_SUCCESS,
} from '../actions/orders';

const INITIAL_ORDER = { forma_pagamento: 0, latitude: 0, longitude: 0, delivery: false, troco: "0.00", itens: [] }

const INITIAL_STATE = {
    isLoading: false,
    error: null,
    order: INITIAL_ORDER,
    count: 0,
    num_pages: 0,
    next: null,
    previous: null,
    orders: [],
};

export default (state = INITIAL_STATE, action) => {
    let order = null;
    let list = [];
    let index = null;
    switch (action.type) {
        case LIST_ORDER:
        case LIST_ORDER_NEXT_PAGE:
        case CREATE_ORDER:
        case CANCEL_ORDER:
        case CHECKOUT:    
            return { ...state, isLoading: true };
        case LIST_ORDER_SUCCESS:
        case LIST_ORDER_NEXT_PAGE_SUCCESS:
            list = uniqBy(union(action.data.results, state.orders), "id");
            return {
                ...state,
                isLoading: false,
                count: action.data.count,
                num_pages: action.data.num_pages,
                next: action.data.next,
                previous: action.data.previous,
                orders: list
            };
        case UPDATE_ORDER:
            return { ...state, order: action.params.order };
        case GET_ORDER_SUCCESS:
        case CREATE_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
            return { ...state, order: action.data };
        case CHECKOUT_SUCCESS:
        case CANCEL_ORDER_SUCCESS:
            return { ...state, order: INITIAL_ORDER, orders: [] };
        case CHECKOUT_ERROR:
        case GET_ORDER_ERROR:
        case LIST_ORDER_ERROR:
        case CREATE_ORDER_ERROR:
        case UPDATE_ORDER_ERROR:
        case CANCEL_ORDER_ERROR:
        case GET_PROPOSALS_ERROR:
        case LIST_ORDER_NEXT_PAGE_ERROR:
            return { ...state, error: action.error };
        case CLEAR_ERROR:
            return { ...state, error: null };
        case CLEAR_ORDER:
            return { ...state, error: null, order: INITIAL_ORDER};
        case CLEAR_ORDERS:
            return { ...state, error: null, orders: null };
        default:
            return state;
    }
};
