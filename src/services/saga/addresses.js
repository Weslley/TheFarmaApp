import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
  responseError,
  responseSuccess,
  LIST_ADDRESS_ERROR, LIST_ADDRESS_SUCCESS,
  SAVE_ADDRESS_ERROR, SAVE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR, UPDATE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_ERROR, REMOVE_ADDRESS_SUCCESS,
  LIST_ADDRESS_NEXT_PAGE_ERROR, LIST_ADDRESS_NEXT_PAGE_SUCCESS
} from "../../actions/addresses";

export const getAddresses = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.get, `${SERVER_API}/clientes/${action.params.client.id}/enderecos/`, config);
        yield put(responseSuccess(LIST_ADDRESS_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(LIST_ADDRESS_ERROR, e));
    }
}

export const createAddress = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.post, `${SERVER_API}/clientes/${action.params.client.id}/enderecos/`, action.params.address, config);
        yield put(responseSuccess(SAVE_ADDRESS_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(SAVE_ADDRESS_ERROR, e));
    }
}

export const updateAddress = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.patch, `${SERVER_API}/clientes/${action.params.client.id}/enderecos/${action.params.address.id}/`, action.params.address, config);
        yield put(responseSuccess(UPDATE_ADDRESS_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(UPDATE_ADDRESS_ERROR, e));
    }
}

export const removeAddress = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.delete, `${SERVER_API}/clientes/${action.params.client.id}/enderecos/${action.params.address.id}/`, config);
        yield put(responseSuccess(REMOVE_ADDRESS_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(REMOVE_ADDRESS_ERROR, e));
    }
}