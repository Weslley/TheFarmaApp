import {
  CLEAR_CART,
  INSERT_PRODUCT_INTO_CART,
  REMOVE_PRODUCT_INTO_CART,
  INSERT_PRODUCT_INTO_CART_V2,
  REMOVE_PRODUCT_INTO_CART_V2
} from "../actions/carts";

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
      cartItem = cItems.find(item => item.id === action.params.apresentation.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cartItem = { ...action.params.apresentation };
        cartItem.quantity = 1;
        cItems.push(cartItem);
      }
      return { ...state, cartItems: [...cItems] };

    case REMOVE_PRODUCT_INTO_CART:
      cItems = [...state.cartItems];
      index = cItems.findIndex(item => item.id === action.params.apresentation.id);
      cartItem = cItems.find(item => item.id === action.params.apresentation.id);

      if (cartItem) {
        --cartItem.quantity;
        cItems.splice(index, 1, cartItem);
        if (cartItem.quantity <= 0) {
          cItems.splice(index, 1);
        }
      }
      return { ...state, cartItems: [...cItems] };

    case INSERT_PRODUCT_INTO_CART_V2:
      cItems = [...state.cartItems];
      try {
        cartItem = cItems.find(
          item =>
            item.dosage === action.params.dosage &&
            item.generic === action.params.generic && 
            item.product.nome === action.params.product.nome
        );

        if (cartItem) {
          if (action.params.quantity) {
            cartItem.quantity = action.params.quantity;
            cartItem.packing = action.params.packing;
            cartItem.apresentations = action.params.apresentations;
          } else {
            cartItem.quantity += 1;
          }
        } else {
          cartItem = {
            dosage: action.params.dosage,
            packing: action.params.packing,
            generic: action.params.generic,
            product: action.params.product,
            quantity: action.params.quantity,
            apresentations: action.params.apresentations
          };
          cItems.push(cartItem);
        }
      } catch (error) {
        console.log("Erro ao adicionar no carrinho:", error)
      }
      return { ...state, cartItems: [...cItems] };

    case REMOVE_PRODUCT_INTO_CART_V2:
      cItems = [...state.cartItems];

      index = cItems.findIndex(
        item =>
        item.dosage === action.params.dosage &&
        item.generic === action.params.generic &&
        item.product.nome === action.params.product.nome
      );
      cartItem = cItems.find(
        item =>
        item.dosage === action.params.dosage &&
        item.generic === action.params.generic &&
        item.product.nome === action.params.product.nome
      );

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
