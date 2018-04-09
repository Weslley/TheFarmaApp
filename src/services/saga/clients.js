import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { ClientLoginSerializable } from "../serializables";
import { save, removeAll, first as firstClient } from '../realm/clients';

import { SERVER_API } from '../../config/server';

import {
    responseError,
    responseSuccess,
    REQUEST_LOGIN_ERROR,
    REQUEST_LOGIN_SUCCESS,
    REGISTER_CLIENT_ERROR,
    REGISTER_CLIENT_SUCCESS,
    UPDATE_CLIENT_ERROR,
    UPDATE_CLIENT_SUCCESS,
    GET_CURRENT_CLIENT_SUCCESS,
    GET_CURRENT_CLIENT_ERROR
} from "../../actions/clients";

export const login = function* (action) {
    try {
        const response = yield call(axios.post, `${SERVER_API}/auth/login/`, action.params);
        let client = ClientLoginSerializable.serialize(response.data)
        yield call(save, client);
        yield put(responseSuccess(REQUEST_LOGIN_SUCCESS, client));
    } catch (e) {
        yield put(responseError(REQUEST_LOGIN_ERROR, e));
    }
}

export const register = function* (action) {
    try {
        const response = yield call(axios.post, `${SERVER_API}/auth/users/`, action.params);
        let client = ClientLoginSerializable.serialize(response.data)
        yield call(save, client);
        yield put(responseSuccess(REGISTER_CLIENT_SUCCESS, client));
    } catch (e) {
        yield put(responseError(REGISTER_CLIENT_ERROR, e));
    }
}

export const updateClient = function* (action) {
    try {
        const response = yield call(axios.patch, `${SERVER_API}/auth/users/`, action.params);
        yield put(responseSuccess(UPDATE_CLIENT_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(UPDATE_CLIENT_ERROR, e));
    }
}

export const getCurrentClient = function* (action) {
    try {
        let client = yield call(firstClient);
        yield put(responseSuccess(GET_CURRENT_CLIENT_SUCCESS, client));
    } catch (e) {
        yield put(responseError(GET_CURRENT_CLIENT_ERROR, e));
    }
}

export const logout = function* (action) {
    yield call(logout);
}
