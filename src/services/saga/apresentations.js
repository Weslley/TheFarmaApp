import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
    responseError,
    responseSuccess,
    GET_APRESENTATIONS_ERROR,
    GET_APRESENTATIONS_SUCCESS,
    GET_APRESENTATIONS_NEXT_PAGE_SUCCESS,
    GET_APRESENTATIONS_NEXT_PAGE_ERROR,
} from "../../actions/apresentations";

export const getApresentations = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/apresentacoes/${action.uf}?nome=${action.name}`);
        yield put(responseSuccess(GET_APRESENTATIONS_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_APRESENTATIONS_ERROR, e));
    }
}

export const getApresentationsNextPage = function* (action) {
    try {
        const response = yield call(axios.get, `${action.params.url}`);
        yield put(responseSuccess(GET_APRESENTATIONS_NEXT_PAGE_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_APRESENTATIONS_NEXT_PAGE_ERROR, e));
    }
}

export const ranking = function* (action) {
    try {
        const response = yield call(axios.post, `${SERVER_API}/apresentacoes/${action.apresentation_id}/ranking_visualizacao/`);
    } catch (e) {
        console.log("Ranking Visualização:" + e);
    }
}