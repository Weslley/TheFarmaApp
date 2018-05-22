import { uniqBy, union, sortBy, orderBy } from 'lodash';

import {
    CLEAR_PROPOSAL, SELECT_PROPOSAL,
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
    proposal: null,
    count: 0,
    num_pages: 0,
    next: null,
    previous: null,
    orders: [],
    success: false
};

export default (state = INITIAL_STATE, action) => {
    let newOrder = null;
    let list = [];
    let index = null;
    switch (action.type) {
        case SELECT_PROPOSAL:
            return { ...state, proposal: action.params };

        case LIST_ORDER:
            return { ...state, isLoading: true, orders: [], error: null, success: false };

        case LIST_ORDER_NEXT_PAGE:
        case CREATE_ORDER:
        case CANCEL_ORDER:
        case CHECKOUT:
            return { ...state, isLoading: true, error: null, success: false };


        case LIST_ORDER_SUCCESS:
        case LIST_ORDER_NEXT_PAGE_SUCCESS:
            list = uniqBy(union(action.data.results, state.orders), "id");
            list = orderBy(list, ['id'], ['desc'])
            return {
                ...state,
                error: null,
                isLoading: false,
                count: action.data.count,
                num_pages: action.data.num_pages,
                next: action.data.next,
                previous: action.data.previous,
                orders: list,
            };

        case UPDATE_ORDER:
            return { ...state, order: action.params.order, isLoading: false, error: null, success: false };

        case GET_ORDER_SUCCESS:
            newOrder = Object.assign(state.order, action.data)
            return { ...state, order: action.data, error: null, isLoading: false };

        case CREATE_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
            return { ...state, order: action.data, error: null, isLoading: false };

        case CHECKOUT_SUCCESS:
            //newOrder = Object.assign(state.order, action.data)
            newOrder = state.order
            newOrder.cartao = action.data.cartao
            newOrder.farmacia = action.data.farmacia
            return { ...state, orders: [], order: newOrder, isLoading: false, error: null, success: true };

        case CANCEL_ORDER_SUCCESS:
            return { ...state, orders: [], order: INITIAL_ORDER, isLoading: false, error: null, success: true };

        case CHECKOUT_ERROR:
        case GET_ORDER_ERROR:
        case LIST_ORDER_ERROR:
        case CREATE_ORDER_ERROR:
        case UPDATE_ORDER_ERROR:
        case CANCEL_ORDER_ERROR:
        case GET_PROPOSALS_ERROR:
        case LIST_ORDER_NEXT_PAGE_ERROR:
            return { ...state, error: action.error, isLoading: false };

        case CLEAR_ERROR:
            return { ...state, error: null, isLoading: false };

        case CLEAR_ORDER:
            return { ...state, error: null, order: INITIAL_ORDER, isLoading: false };

        case CLEAR_ORDERS:
            return { ...state, error: null, orders: [], isLoading: false };

        case CLEAR_PROPOSAL:
            return { ...state, isLoading: false, error: null, proposal: null, };

        default:
            return state;
    }
};
