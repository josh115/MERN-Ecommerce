import { ADD_TO_CART, GET_CART, CART_LOADING } from '../actions/types';

const initialState = {
  cartItems: [],
  msg: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      switch (action.payload.action) {
        case 'updateQuantity':
          state.cartItems.map(item => {
            if (item._id == action.payload.id) {
              item.quantity = action.payload.quantity;
            }
          });
          return {
            ...state,
            cartItems: [...state.cartItems]
          };

        case 'addItem':
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                _id: action.payload.id,
                item: action.payload.item,
                quantity: action.payload.quantity
              }
            ]
          };
        default:
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                _id: action.payload.id,
                item: action.payload.item,
                quantity: action.payload.quantity
              }
            ]
          };
      }
    case GET_CART:
      return {
        ...state,
        cartItems: action.payload,
        loading: false
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
