import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login']
}


export const history = createBrowserHistory()

const composer = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
) : compose(
    applyMiddleware(routerMiddleware(history), thunk),
);

// export const initStore = () => {
//     const store = createStore(persistReducer(persistConfig, rootReducer(history)), composer);
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

export const store = createStore(persistReducer(persistConfig, rootReducer(history)), composer);

export const persistor = persistStore(store)