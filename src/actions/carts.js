export const INSERT_PRODUCT_INTO_CART = 'INSERT_PRODUCT_INTO_CART';
export const REMOVE_PRODUCT_INTO_CART = 'REMOVE_PRODUCT_INTO_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addItemToCart = apresentation => ({
  type: INSERT_PRODUCT_INTO_CART,
  apresentation
});

export const removeItemToCart = apresentation => ({
  type: REMOVE_PRODUCT_INTO_CART,
  apresentation
});

export const cleanCart = () => ({
  type: CLEAR_CART,
});