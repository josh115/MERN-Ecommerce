import { ADD_TO_CART, GET_CART, CART_LOADING } from '../actions/types';

const initialState = {
  cartItems: [],
  total: 0,
  msg: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      switch (action.payload.action) {
        case 'updateQuantity':
          var total = 0;
          state.cartItems.map(item => {
            if (item.item._id === action.payload.id) {
              item.quantity = action.payload.quantity;
            }
            total = total + item.quantity * item.item.price;
          });
          return {
            ...state,
            cartItems: [...state.cartItems],
            total: total
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
      var total = 0;
      action.payload.map(item => {
        total = total + item.quantity * item.item.price;
      });
      return {
        ...state,
        cartItems: action.payload,
        total: total,
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
