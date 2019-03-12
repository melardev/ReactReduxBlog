import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './store/store';
import {AxiosService} from "./services/remote/base/AxiosService";
import {UserService} from "./services/local/UserService";
import {AuthAction} from "./actions/types";
import {UiActionCreator} from "./actions/ui.actions";


const user = UserService.initAndGetUser();

if (user && user.username) {
    AxiosService.setUser(user);
    store.dispatch({type: AuthAction.LOGIN_SUCCESS, user});
    store.dispatch(UiActionCreator.successToast(`You are signed in as ${user.username}`));
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
