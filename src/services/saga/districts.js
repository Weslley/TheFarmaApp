import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
    responseError,
    responseSuccess,
    GET_DISTRICTS_ERROR, GET_DISTRICTS_SUCCESS,
} from "../../actions/districts";

var nextPage = "";
export const getDistricts = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/bairros/${action.params}/`);
        let districts = response.data.results;
        nextPage = response.data.next;
        while (nextPage) {
            let result = yield call(axios.get, nextPage.replace('http://','https://'));
            districts.push(...result.data.results)
            nextPage = result.data.next;
        }
        yield put(responseSuccess(GET_DISTRICTS_SUCCESS, districts));
    } catch (e) {
        yield put(responseError(GET_DISTRICTS_ERROR, e));
    }
}
