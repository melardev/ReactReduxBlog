import {CategoryAction} from "./types";
import {UiActionCreator} from "./ui.actions";
import {CategoriesAxiosService} from "../services/remote/CategoriesAxiosService";

function loading() {
    return {
        type: CategoryAction.local.CATEGORY_SET_IS_LOADING,
        is_loading: true,
    };
}

const fetchedCategories = (categories) => {
    return {
        type: CategoryAction.local.FETCH_CATEGORIES_SUCCESS,
        categories
    };
};

export const fetchCategories = function () {
    console.trace('CategoryActionCreator::fetchArticles');
    return (dispatch) => {
        console.trace('CategoryActionCreator::fetchArticles_Async');
        // dispatch(UiActionCreator.info('Loading categories'));
        dispatch(CategoryActionCreator.loading());
        CategoriesAxiosService.fetchAll().then(res => {
            if (res.data.success)
                dispatch(CategoryActionCreator.fetchedCategories(res.data.categories));
            else
                dispatch(UiActionCreator.error(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};


export const CategoryActionCreator = {
    fetchCategories, fetchedCategories, loading
};
