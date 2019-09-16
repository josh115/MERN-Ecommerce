import axios from 'axios';
import { ADD_TO_CART, GET_CART, CART_LOADING } from './types';

export const addToCart = (item, user, quantity) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ item, user, quantity });
  axios.post('/api/cart/add', body, config).then(res => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: res.data.id,
        item: res.data.item,
        quantity: res.data.quantity,
        action: res.data.action
      }
    });
  });
};

export const getCart = userid => dispatch => {
  dispatch(setCartLoading());
  axios.get(`/api/cart/${userid}`).then(res => {
    dispatch({
      type: GET_CART,
      payload: res.data.items
    });
  });
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING
  };
};
