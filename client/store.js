import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth-reducer';

export const store = createStore(
    combineReducers({auth: authReducer}),
    applyMiddleware(createLogger(), thunk)
);

export default store;
