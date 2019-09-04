import {orderBy, groupBy } from 'lodash';

import {
    SELECT_PRODUCT, CLEAR_ERROR,
    GET_HISTORY, HISTORY_SUCCESS, HISTORY_ERROR,
    SEARCH_PRODUCTS, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_ERROR,
    SEARCH_PRODUCTS_BARCODE, SEARCH_PRODUCTS_BARCODE_SUCCESS, SEARCH_PRODUCTS_BARCODE_ERROR,
    CLEAR_DOSAGES, GET_DOSAGES, GET_DOSAGES_ERROR, GET_DOSAGES_SUCCESS, CLEAR_PRODUCT
} from '../actions/products';

const INITIAL_STATE = {
    isHistory: true,
    loading: false,
    loaded: [],
    error: null,
    success: false,

    apresentation: null,
    
    selected: null,
    dosages: [],
    generic: false,
    action: null
};

export default (state = INITIAL_STATE, action) => {
    let list = []

    switch (action.type) {
        case SELECT_PRODUCT:
            return { ...state, selected: action.product, action: SELECT_PRODUCT};

        case GET_HISTORY:
        case SEARCH_PRODUCTS:
        case GET_DOSAGES:
        case SEARCH_PRODUCTS_BARCODE:
            return { ...state, loading: true, success: false, apresentation: null }

        case HISTORY_SUCCESS:
            return { ...state, isHistory: true, loading: false, loaded: action.data }

        case SEARCH_PRODUCTS_SUCCESS:
            return { ...state, isHistory: false, loading: false, loaded: action.data };

        case GET_DOSAGES_SUCCESS:
            list = groupBy(orderBy(action.data.results, ['dosagem_formatada'],['desc']), 'dosagem_formatada');
            return {
                ...state, 
                dosages: list,
                generic: action.data.generico,
                isHistory: false,
                loading: false,
                success: true,
                error: null,
                action: GET_DOSAGES_SUCCESS
            }

        case SEARCH_PRODUCTS_BARCODE_SUCCESS:
            return { 
                ...state, 
                isHistory: false, 
                loading: false, 
                selected: action.data.produto, 
                apresentation: action.data,
                success: true 
            };

        case HISTORY_ERROR:
        case SEARCH_PRODUCTS_ERROR:
        case GET_DOSAGES_ERROR:
        case SEARCH_PRODUCTS_BARCODE_ERROR:
            return { ...state, loading: false, error: action.error, success: false };
        
        case CLEAR_DOSAGES:
            return { ...state, error: null, dosages: []};
        
        case CLEAR_PRODUCT:
                return { ...state, error: null, dosages: [], action: null, selected: null };
                
        case CLEAR_ERROR:
            return { ...state, error: null, success: false, loading: false, apresentation: null, action: null };

        default:
            return state;
    }
};
