import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
    responseSuccess, responseError,
    GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS, GET_NOTIFICATIONS_NEXT_PAGE_ERROR,
    VIEW_NOTIFICATION_ERROR, VIEW_NOTIFICATION_SUCCESS
} from "../../actions/notifications";

export const viewNotification = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.get, `${SERVER_API}/notificacoes/${action.params.notificacao.id}/visualizar`, config);
        console.log(response);
        yield put(responseSuccess(VIEW_NOTIFICATION_SUCCESS, action.params));
    } catch (e) {
        yield put(responseError(VIEW_NOTIFICATION_ERROR, e));
    }
}

export const getNotifications = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.get, `${SERVER_API}/notificacoes/`, config);
        yield put(responseSuccess(GET_NOTIFICATIONS_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_NOTIFICATIONS_ERROR, e));
    }
}

export const getNotificationsNextPage = function* (action) {
    try {
        let config = { headers: { 'Authorization': 'Token ' + action.params.client.token } }
        const response = yield call(axios.get, `${action.params.url}`, config);
        yield put(responseSuccess(GET_NOTIFICATIONS_NEXT_PAGE_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_NOTIFICATIONS_NEXT_PAGE_ERROR, e));
    }
}

/*
let config = {
    headers: {
        'Authorization': 'Token ' + action.params.student.token,
        'Content-Type': 'application/json'
    },
    params: action.params.filters
}
*/