import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers'

const middleWare = [thunk];

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(allReducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleWare)
));

export default store;