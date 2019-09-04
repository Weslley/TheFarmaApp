export const INSERT_PRODUCT_INTO_CART = 'INSERT_PRODUCT_INTO_CART';
export const REMOVE_PRODUCT_INTO_CART = 'REMOVE_PRODUCT_INTO_CART';
export const INSERT_PRODUCT_INTO_CART_V2 = 'INSERT_PRODUCT_INTO_CART_V2';
export const REMOVE_PRODUCT_INTO_CART_V2 = 'REMOVE_PRODUCT_INTO_CART_V2';
export const CLEAR_CART = 'CLEAR_CART';

export const addItemToCart = (params) => ({
  type: INSERT_PRODUCT_INTO_CART, params
});

export const removeItemToCart = params => ({
  type: REMOVE_PRODUCT_INTO_CART, params
});

export const addItemToCartV2 = (params) => ({
  type: INSERT_PRODUCT_INTO_CART_V2, params
});

export const removeItemToCartV2 = params => ({
  type: REMOVE_PRODUCT_INTO_CART_V2, params
});

export const cleanCart = () => ({
  type: CLEAR_CART,
});