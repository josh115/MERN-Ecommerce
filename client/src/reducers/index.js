import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
const allReducers = combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  cart: cartReducer
});

export default allReducers;
