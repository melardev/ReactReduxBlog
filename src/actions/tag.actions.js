import {CategoryAction, TagAction} from "./types";
import {UiActionCreator} from "./ui.actions";
import {TagsAxiosService} from "../services/remote/TagsAxiosService";

const fetchedTags = (tags) => {
    console.trace('TagActionCreator::fetchedTags');
    return {
        type: TagAction.local.FETCH_TAGS_SUCCESS,
        tags
    };
};

function loading() {
    return {
        type: TagAction.local.TAG_SET_IS_LOADING,
        is_loading: true,
    };
}

export const fetchTags = function () {
    console.trace('TagActionCreator::fetchTags');
    return (dispatch) => {
        console.trace('TagActionCreator::fetchTags_Async');
        dispatch(TagActionCreator.loading());
        // dispatch(UiActionCreator.info('Loading tags'));
        TagsAxiosService.fetchAll().then(res => {
            if (res.data.success)
                dispatch(TagActionCreator.fetchedTags(res.data.tags));
            else
                dispatch(UiActionCreator.error(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};


export const TagActionCreator = {
    fetchTags, fetchedTags, loading
};
