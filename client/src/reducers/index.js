import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const allReducers = combineReducers({
    item: itemReducer
});

export default allReducers;
