import { ADD_TO_CART, GET_CART, CART_LOADING } from '../actions/types';

const initialState = {
  cartItems: [],
  msg: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: action.payload.id,
            itemid: action.payload.itemid,
            quantity: action.payload.quantity
          }
        ]
        //msg: action.payload.msg
      };
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
