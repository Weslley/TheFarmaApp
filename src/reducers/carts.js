
import {
  INSERT_PRODUCT_INTO_CART,
  REMOVE_PRODUCT_INTO_CART,
  CLEAR_CART
} from '../actions/carts';

const INITIAL_STATE = {
  cartItems: [],
  valorTotalItens: 0.0
};

export default (state = INITIAL_STATE, action) => {
  let cartItem = null;
  let cItems = [];
  let index = null;
  switch (action.type) {

    case INSERT_PRODUCT_INTO_CART:
      cItems = [...state.cartItems];
      cartItem = cItems.find((item) => ( item.product.nome === action.params.product.nome && item.dosage === action.params.dosage && item.generic === action.params.generic ));

      if (cartItem) {
        if(action.params.quantity){
          cartItem.quantity += action.params.quantity;
        }else{
          cartItem.quantity += 1;
        }
      } else {
        cartItem = { 
          dosage: action.params.dosage,
          packing: action.params.packing,
          generic: action.params.generic,
          product: action.params.product,
          quantity: action.params.quantity,
          apresentations: action.params.apresentations,
        };
        cItems.push(cartItem);
      }

      return { ...state, cartItems: [...cItems] };

    case REMOVE_PRODUCT_INTO_CART:
      cItems = [...state.cartItems];
      
      index = cItems.findIndex(item => (item.product.nome === action.params.product.nome && item.dosage === action.params.dosage && item.generic === action.params.generic ));
      cartItem = cItems.find((item) => (item.product.nome === action.params.product.nome && item.dosage === action.params.dosage && item.generic === action.params.generic ));

      if (cartItem) {
        --cartItem.quantity;
        cItems.splice(index, 1, cartItem);
        if (cartItem.quantity <= 0) {
          cItems.splice(index, 1);
        }
      }

      return { ...state, cartItems: [...cItems] };

    case CLEAR_CART:
      return { ...state, cartItems: [] };
      
    default:
      return state;
  }
};
