import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {rootReducer} from '../reducers';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, thunk);
    } else {
        return applyMiddleware(thunk, myRouterMiddleware, createLogger())
    }
};

export const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));