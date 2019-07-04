import axios from 'axios';
import { call, put, all } from 'redux-saga/effects';

import { SERVER_API } from '../../config/server';
import { list, save, remove } from '../realm/products';

import {
    responseError,
    responseSuccess,
    HISTORY_ERROR,
    HISTORY_SUCCESS,
    SEARCH_PRODUCTS_ERROR,
    SEARCH_PRODUCTS_SUCCESS,
    GET_APRESENTATIONS_ERROR,
    GET_APRESENTATIONS_SUCCESS,
    SEARCH_PRODUCTS_BARCODE_ERROR,
    SEARCH_PRODUCTS_BARCODE_SUCCESS
} from "../../actions/products";

export const getByName = function* (action) {
    try {
        if (action.query.length <= 2) {
            yield* getHistory(action);
        } else {
            const response = yield call(axios.get, `${SERVER_API}/produtos/v2/${action.uf}/?nome=${action.query}`);
            yield put(responseSuccess(SEARCH_PRODUCTS_SUCCESS, response.data.results));
        }
    } catch (e) {
        yield put(responseError(SEARCH_PRODUCTS_ERROR, e));
    }
}

export const getByBarcode = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/produtos/${action.params.uf}/?codigo_barras=${action.params.query}`);
        if (response.data.results[0] && response.data.results[0].apresentacoes) {
            apresentation = response.data.results[0].apresentacoes.find(i => `${i.codigo_barras}` === `${action.params.query}`);
            if (apresentation) {
                apresentation["produto"] = {
                    id: response.data.results[0].id,
                    nome: response.data.results[0].nome,
                    fabricante: response.data.results[0].fabricante,
                    tipo: response.data.results[0].tipo,
                    principio_ativo: response.data.results[0].principio_ativo
                }
            }
            yield put(responseSuccess(SEARCH_PRODUCTS_BARCODE_SUCCESS, apresentation));
        } else {
            let error = { code: 400, message: "Produto não encontrado." }
            yield put(responseError(SEARCH_PRODUCTS_BARCODE_ERROR, error));
        }
    } catch (e) {
        yield put(responseError(SEARCH_PRODUCTS_BARCODE_ERROR, e));
    }
}

export const getHistory = function* (action) {
    try {
        const history = yield list('', { sort: ['time', true], limit: 10 });
        yield put(responseSuccess(HISTORY_SUCCESS, history));
    } catch (e) {
        yield put(responseError(HISTORY_ERROR, e));
    }
}

export const selectProduct = function* (action) {
    yield call(save, { ...action.product, time: new Date() });
}

export const getApresentations = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/apresentacoes/${action.uf}?nome=${action.productName}`);
        yield put(responseSuccess(GET_APRESENTATIONS_SUCCESS, response.data.results));
    } catch (e) {
        yield put(responseError(GET_APRESENTATIONS_ERROR, e));
    }
}