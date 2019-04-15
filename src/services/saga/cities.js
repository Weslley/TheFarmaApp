import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
  responseError, responseSuccess,
  GET_CITIES_ERROR, GET_CITIES_SUCCESS,
  GET_CITIES_NEXT_PAGE_ERROR, GET_CITIES_NEXT_PAGE_SUCCESS
} from "../../actions/cities";

var nextPage = "";
export const getCities = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/cidades/`);
        let cities = response.data.results

        nextPage = response.data.next;
        while (nextPage) {
            let result = yield call(axios.get, nextPage);
            cities.push(...result.data.results)
            nextPage = result.data.next;
        }

        yield put(responseSuccess(GET_CITIES_SUCCESS, cities));
    } catch(e) {
        yield put(responseError(GET_CITIES_ERROR, e));
    }
}

export const getCitiesNextPage = function* (action) {
    try {
        const response = yield call(axios.get, `${action.params}`);
        yield put(responseSuccess(GET_CITIES_NEXT_PAGE_SUCCESS, response.data));
    } catch(e) {
        yield put(responseError(GET_CITIES_NEXT_PAGE_ERROR, e));
    }
}