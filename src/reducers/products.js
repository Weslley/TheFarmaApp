import {
    SELECT_PRODUCT, CLEAR_ERROR,
    GET_HISTORY, HISTORY_SUCCESS, HISTORY_ERROR,
    SEARCH_PRODUCTS, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_ERROR,
    SEARCH_PRODUCTS_BARCODE, SEARCH_PRODUCTS_BARCODE_SUCCESS, SEARCH_PRODUCTS_BARCODE_ERROR
} from '../actions/products';

const INITIAL_STATE = {
    isHistory: true,
    isLoading: false,
    loaded: [],
    apresentations: [],
    selected: null,
    error: null,
    apresentation: null,
    success: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return { ...state, selected: action.product };

        case GET_HISTORY:
        case SEARCH_PRODUCTS:
        case SEARCH_PRODUCTS_BARCODE:
            return { ...state, isLoading: true, success: false, apresentation: null }

        case HISTORY_SUCCESS:
            return { ...state, isHistory: true, isLoading: false, loaded: action.data }

        case SEARCH_PRODUCTS_SUCCESS:
            return { ...state, isHistory: false, isLoading: false, loaded: action.data };

        case SEARCH_PRODUCTS_BARCODE_SUCCESS:
            return { 
                ...state, 
                isHistory: false, 
                isLoading: false, 
                selected: action.data.produto, 
                apresentation: action.data,
                success: true 
            };

        case HISTORY_ERROR:
        case SEARCH_PRODUCTS_ERROR:
        case SEARCH_PRODUCTS_BARCODE_ERROR:
            return { ...state, isLoading: false, error: action.error, success: false };

        case CLEAR_ERROR:
            return { ...state, error: null, success: false, isLoading: false, apresentation: null };

        default:
            return state;
    }
};
