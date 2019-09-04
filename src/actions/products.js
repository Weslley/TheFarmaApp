export const GET_HISTORY = 'GET_HISTORY';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_PRODUCTS_BARCODE = 'SEARCH_PRODUCTS_BARCODE';

export const CLEAR_PRODUCT = "CLEAR_PRODUCT";
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const HISTORY_ERROR = 'HISTORY_ERROR';
export const HISTORY_SUCCESS = 'HISTORY_SUCCESS';
export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';

export const SEARCH_PRODUCTS_BARCODE_ERROR = 'SEARCH_PRODUCTS_BARCODE_ERROR';
export const SEARCH_PRODUCTS_BARCODE_SUCCESS = 'SEARCH_PRODUCTS_BARCODE_SUCCESS';

export const CLEAR_DOSAGES = "CLEAR_DOSAGES";

export const GET_DOSAGES = "GET_DOSAGES";
export const GET_DOSAGES_ERROR = "GET_DOSAGES_ERROR";
export const GET_DOSAGES_SUCCESS = "GET_DOSAGES_SUCCESS";

export const getHistory = () => ({
    type: GET_HISTORY
})

export const selectProduct = product => ({
    type: SELECT_PRODUCT, product
});

export const searchProducts = (uf, query) => ({
    type: SEARCH_PRODUCTS, uf, query
});

export const searchProductsByBarcode = (params) => ({
    type: SEARCH_PRODUCTS_BARCODE, params
});

export const getDosages = (params) => ({
    type: GET_DOSAGES, params
});

export const clearDosages = () => ({
    type: CLEAR_DOSAGES
});

export const clearProduct = () => ({
    type: CLEAR_PRODUCT
});

export const clearError = () => ({
    type: CLEAR_ERROR
});

/** Action results body */
export const responseSuccess = (type, data) => ({
    type, data
});

export const responseError = (type, error) => ({
    type, error
});
