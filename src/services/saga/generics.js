import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
  responseError,
  responseSuccess,
  GET_GENERICS_ERROR,
  GET_GENERICS_SUCCESS,
  GET_GENERICS_NEXT_PAGE_ERROR,
  GET_GENERICS_NEXT_PAGE_SUCCESS,
} from "../../actions/generics";

export const getGenerics = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/apresentacoes/${action.uf}/${action.apresentation_id}/genericos/`);
        yield put(responseSuccess(GET_GENERICS_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(GET_GENERICS_ERROR, e));
    }
}

export const getGenericsNextPage = function* (action) {
    try {
        const response = yield call(axios.get, `${action.params.url}`);
        yield put(responseSuccess(GET_GENERICS_NEXT_PAGE_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(GET_GENERICS_NEXT_PAGE_ERROR, e));
    }
}