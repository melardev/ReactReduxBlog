import {UiAction} from '../actions/types';

const initialState = {
    alert: {className: '', message: ''},
    toast: {className: '', message: ''}
};

export const UiReducer = function (state = initialState, action) {
    switch (action.type) {
        case UiAction.TOAST_SUCCESS:
            if(state.toast.message === action.message)
                return state;
            return {
                ...state,
                toast: {
                    className: 'alert-success',
                    message: action.message
                }
            };
        case UiAction.TOAST_ERROR:
            return {
                ...state,
                toast: {
                    className: 'alert-danger',
                    message: action.message
                }
            };
        case UiAction.TOAST_CLEAR:
            return {...initialState, toast: {message: '', className: ''}};
        case UiAction.MESSAGE_CLEAR:
            return {...initialState, message: {message: '', className: ''}};
        case UiAction.TOAST_SHOW:
            return {
                ...state,
                toast: {
                    className: action.className,
                    message: action.message
                }
            };
        default:
            return state
    }
};