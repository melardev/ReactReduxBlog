import {CommentAction} from "../actions/types";

const INITIAL_STATE = {
    comment_created: false,
    comments_data: {
        comments: []
    }
};

export const CommentReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case CommentAction.local.COMMENT_FETCHED_SUCCESS:
            return {...state, comments_data: {comments: action.comments}};
        case CommentAction.local.COMMENT_CREATED_SUCCESS:
            const newState = {...state, comment_created: true};
            newState.comments_data.comments.push(action.comment);
            return newState;
        case CommentAction.local.CLEAR_COMMENT_CREATED_FLAG:
            return {...state, comment_created: false};
        default:
            return state;
    }
};
