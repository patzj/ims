import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth-reducer';
import itemsReducer from './reducers/items-reducer';
import userMgmtReducer from './reducers/user-mgmt-reducer';

export const store = createStore(
    combineReducers({
        auth: authReducer,
        items: itemsReducer,
        users: userMgmtReducer
    }),
    applyMiddleware(
        // createLogger(),
        thunk
    )
);

export default store;
