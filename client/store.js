import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth-reducer';
import itemsReducer from './reducers/items-reducer';

export const store = createStore(
    combineReducers({
        auth: authReducer,
        items: itemsReducer
    }),
    applyMiddleware(
        createLogger(),
        thunk
    )
);

export default store;
