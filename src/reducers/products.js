import { SELECT_PRODUCT, SEARCH_PRODUCTS, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_ERROR, HISTORY_SUCCESS, HISTORY_ERROR, GET_HISTORY, CLEAR_ERROR } from '../actions/products';

const INITIAL_STATE = {
    loaded: [],
    apresentations: [],
    selected: {},
    isHistory: true,
    isLoading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                selected: action.product
            };
        case GET_HISTORY:
        case SEARCH_PRODUCTS:
            return {
                ...state,
                isLoading: true
            }
        case HISTORY_SUCCESS:
            return {
                ...state,
                isHistory: true,
                isLoading: false,
                loaded: action.products
            }
        case SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isHistory: false,
                isLoading: false,
                loaded: action.products
            };
        case HISTORY_ERROR:
        case SEARCH_PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case CLEAR_ERROR:
        return {
            ...state, 
            error: null
        };
        default:
            return state;
    }
};
