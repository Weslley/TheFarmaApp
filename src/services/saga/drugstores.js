import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { SERVER_API } from '../../config/server';

import {
    responseError, responseSuccess,
    GET_DRUGSTORE_ERROR, GET_DRUGSTORE_SUCCESS,
} from "../../actions/drugstores";

export const getDrugstore = function* (action) {
    try {
        let config = {headers: {'Authorization': 'Token ' + action.params.client.token}}
        const response = yield call(axios.get, `${SERVER_API}/farmacias/${action.params.id}/`, config);
        yield put(responseSuccess(GET_DRUGSTORE_SUCCESS, response.data));
    } catch (e) {
        yield put(responseError(GET_DRUGSTORE_ERROR, e));
    }
}
