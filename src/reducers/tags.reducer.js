import {TagAction} from "../actions/types";

const INITIAL_STATE = {
    is_loading: false,
    tags: []
};

export const TagsReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TagAction.local.TAG_SET_IS_LOADING:
            return {...state, is_loading: action.is_loading};
        case TagAction.local.FETCH_TAGS_SUCCESS:
            return {
                ...state, is_loading: false,
                tags: action.tags
            };
        default:
            return state;
    }
};