import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import SERVER_API from '../../config/server';

import {
  responseError,
  responseSuccess,
  LIST_CREDIT_CARD_ERROR, LIST_CREDIT_CARD_SUCCESS,
  SAVE_CREDIT_CARD_ERROR, SAVE_CREDIT_CARD_SUCCESS,
  UPDATE_CREDIT_CARD_ERROR, UPDATE_CREDIT_CARD_SUCCESS,
  REMOVE_CREDIT_CARD_ERROR, REMOVE_CREDIT_CARD_SUCCESS,
  LIST_CREDIT_CARD_NEXT_PAGE_ERROR, LIST_CREDIT_CARD_NEXT_PAGE_SUCCESS
} from "../../actions/creditCards";

export const getCreditCards = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.get, `${SERVER_API}/clientes/${action.params.client.id}/cartoes/`, config);
        yield put(responseSuccess(LIST_CREDIT_CARD_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(LIST_CREDIT_CARD_ERROR, e));
    }
}

export const createCreditCard = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.post, `${SERVER_API}/clientes/${action.params.client.id}/cartoes/`, action.params.creditCard, config);
        yield put(responseSuccess(SAVE_CREDIT_CARD_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(SAVE_CREDIT_CARD_ERROR, e));
    }
}

export const updateCreditCard = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.patch, `${SERVER_API}/clientes/${action.params.client.id}/cartoes/${action.params.creditCard.id}/`, action.params.credit_card, config);
        yield put(responseSuccess(UPDATE_CREDIT_CARD_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(UPDATE_CREDIT_CARD_ERROR, e));
    }
}

export const removeCreditCard = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.delete, `${SERVER_API}/clientes/${action.params.client.id}/cartoes/${action.params.creditCard.id}/`, config);
        yield put(responseSuccess(REMOVE_CREDIT_CARD_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(REMOVE_CREDIT_CARD_ERROR, e));
    }
}