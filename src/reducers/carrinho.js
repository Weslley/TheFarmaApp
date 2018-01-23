import {
  INSERT_PRODUCT_INTO_CART,
  REMOVE_PRODUCT_INTO_CART,
  CLEAR_CART
} from '../actions/carrinho';

const INITIAL_STATE = {
  cartItems: []
};

export default (state = INITIAL_STATE, action) => {
  let cartItem = null;
  let cItems = [];
  let index = null;
  switch (action.type) {
    case INSERT_PRODUCT_INTO_CART:
      cItems = [...state.cartItems];
      cartItem = cItems.find(item => item.id === action.apresentation.id);
      if (cartItem) {
        cartItem.quantidade += 1;
      } else {
        cartItem = { ...action.apresentation };
        cartItem.quantidade = 1;
        cItems.push(cartItem);
      }
      return { ...state, cartItems: [...cItems] };
    case REMOVE_PRODUCT_INTO_CART:
      cItems = [...state.cartItems];
      index = cItems.findIndex(item => item.id === action.apresentation.id);
      cartItem = cItems.find(item => item.id === action.apresentation.id);
      if (cartItem) {
        --cartItem.quantidade;
        cItems.splice(index, 1, cartItem);
      }
      if (cartItem.quantidade <= 0) {
        cItems.splice(index, 1);
      }
      return { ...state, cartItems: [...cItems] };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
