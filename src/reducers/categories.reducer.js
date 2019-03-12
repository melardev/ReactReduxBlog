import {CategoryAction} from "../actions/types";

const INITIAL_STATE = {
    is_loading: false,
    categories: []
};

export const CategoriesReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CategoryAction.local.CATEGORY_SET_IS_LOADING:
            return {...state, is_loading: action.is_loading};
        case CategoryAction.local.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state, is_loading: false,
                categories: action.categories
            };
        default:
            return state;
    }
};