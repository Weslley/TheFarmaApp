import { STORE_PRODUCT, FILL_PRODUCTS } from '../actions/produto';

const INITIAL_STATE = {
    productName: '',
    products: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_PRODUCT:
            return {
                ...state,
                productName: action.productName
            };
        case FILL_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        default:
            return state;
    }
};
