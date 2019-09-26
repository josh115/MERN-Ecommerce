import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/items').then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const addItem = item => dispatch => {
  axios.post('/api/items/add', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: { msg: res.data.msg, item: res.data.item }
    })
  );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/delete/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: res.data
      })
    )
    .catch();
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
