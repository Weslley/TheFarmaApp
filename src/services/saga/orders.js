import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
    responseError,
    responseSuccess,
    LIST_ORDER_ERROR, LIST_ORDER_SUCCESS,
    GET_PROPOSALS_ERROR, GET_PROPOSALS_SUCCESS,
    CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR, UPDATE_ORDER_SUCCESS,
    CANCEL_ORDER_ERROR, CANCEL_ORDER_SUCCESS,
    CHECKOUT_ERROR, CHECKOUT_SUCCESS,
    GET_ORDER_ERROR, GET_ORDER_SUCCESS,
    LIST_ORDER_NEXT_PAGE_ERROR, LIST_ORDER_NEXT_PAGE_SUCCESS
} from "../../actions/orders";

export const getOrder = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.get, `${SERVER_API}/pedidos/${action.params.order.id}/`, config);
        yield put(responseSuccess(GET_ORDER_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_ORDER_ERROR, e));
    }
}

export const getOrders = function* (action) {
    try {
        let config = {
            headers: {
                'Authorization': 'Token ' + action.params.client.token,
                'Content-Type': 'application/json'
            }
        }
        const response = yield call(axios.get, `${SERVER_API}/pedidos/`, config);
        yield put(responseSuccess(LIST_ORDER_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(LIST_ORDER_ERROR, e));
    }
}

export const getOrdersNextPage = function* (action) {
    try {
        let config = {
            headers: {
                'Authorization': 'Token ' + action.params.client.token,
                'Content-Type': 'application/json'
            }
        }
        const response = yield call(axios.get, `${action.params.url}`, config);
        yield put(responseSuccess(LIST_ORDER_NEXT_PAGE_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(LIST_ORDER_NEXT_PAGE_SUCCESS, e));
    }
}

export const createOrder = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.post, `${SERVER_API}/pedidos/`, action.params.order, config);
        yield put(responseSuccess(CREATE_ORDER_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(CREATE_ORDER_ERROR, e));
    }
}

export const checkoutOrder = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.put, `${SERVER_API}/pedidos/${action.params.order.id}/checkout/`, action.params.fields, config);
        yield put(responseSuccess(CHECKOUT_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(CHECKOUT_ERROR, e));
    }
}

export const cancelOrder = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.post, `${SERVER_API}/pedidos/${action.params.order.id}/cancelamento_cliente/`, {}, config);
        yield put(responseSuccess(CANCEL_ORDER_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(CANCEL_ORDER_ERROR, e));
    }
}