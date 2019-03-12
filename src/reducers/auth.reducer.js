import {AuthAction} from "../actions/types";


const INITIAL_STATE = {
    is_authenticated: false,
    is_trying_to_register: false,
    register_success: false,
    is_trying_to_login: false,
    user: {}
};

export const AuthReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthAction.REGISTER:
            return {...state, registering: true};
        case AuthAction.REGISTER_SUCCESS:
            return {...state, registering: false, register_success: true};
        case AuthAction.REGISTER_FAILURE:
            return {...state, register_success: false, registering: false};
        case AuthAction.LOGIN:
            return {...state, loggingIn: true};
        case AuthAction.LOGIN_SUCCESS:
            return {...state, is_authenticated: true, loggingIn: false, user: action.user};
        case AuthAction.LOGOUT:
            return INITIAL_STATE;
        case AuthAction.CLEAR_REGISTER_SUCCESS:
            return {...state, register_success: false};
        case AuthAction.AUTH_ERROR: // TODO: Remove this one
            return {...state, errors: action.payload};
        default:
            return state
    }
};
