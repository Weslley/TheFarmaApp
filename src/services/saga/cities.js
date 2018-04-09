import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
  responseError, responseSuccess,
  GET_CITIES_ERROR, GET_CITIES_SUCCESS,
  GET_CITIES_NEXT_PAGE_ERROR, GET_CITIES_NEXT_PAGE_SUCCESS
} from "../../actions/cities";

export const getCities = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/cidades/`);
        let cities = response.data.results
        while(response.data.next){
           let result = yield call(axios.get, response.data.next);
           cities.push(...result.data.results)
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