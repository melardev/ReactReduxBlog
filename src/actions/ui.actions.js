import {UiAction} from './types';

export const UiActionCreator = {
    success,
    error,
    info,
    clear,
    successToast,
    clearToast
};

// ==============
// =   Toast    =
// ==============
function clearToast() {
    return {
        type: UiAction.TOAST_CLEAR
    };
}


function successToast(message) {
    return {type: UiAction.TOAST_SUCCESS, message, className: 'success'};
}

function success(message) {
    return {type: UiAction.TOAST_SUCCESS, message};
}

function error(message) {
    return {type: UiAction.TOAST_ERROR, className: 'error', message};
}

function clear() {
    return {type: UiAction.TOAST_CLEAR};
}

function info(message) {
    return {
        type: UiAction.TOAST_INFO, message
    };
}