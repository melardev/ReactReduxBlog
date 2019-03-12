import {CommentAction} from "./types";
import {CommentAxiosService} from "../services/remote/CommentAxiosService";
import {UiActionCreator} from "./ui.actions";
import {stripResponseMeta} from "../utils/net.utils";


const fetchedComments = (comments) => {
    return {
        type: CommentAction.local.COMMENT_FETCHED_SUCCESS,
        comments
    };
};

export function createComment(slug, data) {
    return function (dispatch) {
        dispatch(request());
        CommentAxiosService.create(slug, data).then(res => {
            if (res.data.success) {
                dispatch(success(stripResponseMeta(res.data)));
                if (res.data && res.data.full_messages instanceof Array && res.data.full_messages.length > 0)
                    dispatch(UiActionCreator.success(res.data.full_messages[0]));
                else
                    dispatch(UiActionCreator.success('Comment created successfully'));
            }
        }).catch(err => {
            debugger;
            dispatch(UiActionCreator.error(err.message));
        });
    };


    function success(comment) {
        return {
            type: CommentAction.local.COMMENT_CREATED_SUCCESS,
            comment
        };
    }

    function request() {
        return {
            type: CommentAction.remote.CREATE_COMMENT
        }
    }
}

export function clearCommentCreatedFlag() {
    return {
        type: CommentAction.local.CLEAR_COMMENT_CREATED_FLAG
    };
}

export const CommentActionCreator = {
    createComment, fetchedComments, clearCommentCreatedFlag
};
