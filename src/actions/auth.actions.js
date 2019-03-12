import {UiActionCreator} from './ui.actions';
import {AuthAction} from "./types";
import {AxiosUsersService} from "../services/remote/AxiosUsersService";
import {UserService} from "../services/local/UserService";


// Just as a remained here it is another syntax:
// const login({username, password}) =>{ return (dispatch) => {return axios blabla}}
function login({username, password}) {
    // return a function to be run async
    return dispatch => {
        dispatch(request());
        AxiosUsersService.login({username, password})
            .then(
                result => {
                    if (result && result.data.success) {
                        const token = result.data.token;
                        const user = result.data.user;
                        user.token = token;
                        UserService.saveUser(user);
                        dispatch(success(user));
                        dispatch(UiActionCreator.success("Logged In successfully as " + user.username));
                        // history.push('/');
                    } else {
                        if (result.errors) {
                            dispatch(failure('Unknown error'));
                            dispatch(UiActionCreator.error('Something went wrong'));
                        }
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(UiActionCreator.error(error.toString()));
                }
            );
    };

    function request() {
        return {type: AuthAction.LOGIN,}
    }

    function success(user) {
        return {type: AuthAction.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: AuthAction.LOGIN_FAILURE, error}
    }
}

function logout(dispatch) {
    // AxiosUsersService.logout();
    UserService.clearSession();
    dispatch(UiActionCreator.successToast('You have just logged out'));
    return {type: AuthAction.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        AxiosUsersService.create(user)
            .then(res => {
                if (res.data.success) {
                    dispatch(success());
                    if (res.data.full_messages && res.data.full_messages instanceof Array && res.data.full_messages.length > 0)
                        dispatch(UiActionCreator.success(res.data.full_messages[0]));
                    else
                        dispatch(UiActionCreator.success('Registration successful'));
                }
            }).catch(error => {
                debugger;
                if (error.response && error.response.data && error.response.data.full_messages) {
                    dispatch(UiActionCreator.error(error.response.data.full_messages.join(',')));
                    dispatch(failure(error.response.data.full_messages.join(',')));
                } else {
                    dispatch(failure(error.toString()));
                    dispatch(UiActionCreator.error(error.toString()));
                }
            }
        );
    };

    function request(user) {
        return {type: AuthAction.REGISTER, user}
    }

    function success(user) {
        return {type: AuthAction.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: AuthAction.REGISTER_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        AxiosUsersService.delete(id)
            .then(user => dispatch(success(id))).catch(error => dispatch(failure(id, error.toString())));
    };

    function request(id) {
        return {type: AuthAction.DELETE, id}
    }

    function success(id) {
        return {type: AuthAction.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: AuthAction.DELETE_FAILURE, id, error}
    }
}



function clearRegisterForm() {
    return {
        type: AuthAction.CLEAR_REGISTER_FORM
    }
}

function updateLoginForm(key, value) {
    return {
        type: AuthAction.UPDATE_LOGIN_FORM,
        key, value
    };
}

function clearLoginForm() {
    return {
        type: AuthAction.CLEAR_LOGIN_FORM,
    };
}

function clearRegisterSuccess() {
    return {
        type: AuthAction.CLEAR_REGISTER_SUCCESS,
    }
}
export const AuthActionCreators = {
    login,
    logout,
    register,
    delete: _delete, // delete is a reserved keyword
    clearRegisterSuccess,
    clearRegisterForm,

    updateLoginForm,
    clearLoginForm,
};
