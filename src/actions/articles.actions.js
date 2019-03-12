import {UiActionCreator} from "./ui.actions";
import {ArticleAxiosService} from "../services/remote/ArticleAxiosService";
import {ArticleAction} from "./types";
import {CommentActionCreator} from "./comments.actions";


function loading() {
    return {
        type: ArticleAction.local.ARTICLE_SET_IS_LOADING,
        is_loading: true,
    };
}

const fetchedArticles = (page_meta, articles) => {
    return {
        type: ArticleAction.local.FETCH_ARTICLES_SUCCESS,
        articles_data: {page_meta, articles}
    }
};
const fetchedArticle = (article) => {
    return {
        type: ArticleAction.local.FETCH_ARTICLE_SUCCESS,
        article
    };
};

const fetchArticles = function (query) {
    console.trace('ArticleActionCreator::fetchArticles');
    return (dispatch) => {
        console.trace('ArticleActionCreator::fetchArticles_Async');
        // dispatch(UiActionCreator.info('Loading articles'));
        dispatch(ArticleActionCreator.loading());
        ArticleAxiosService.fetchAll(query).then(res => {
            if (res.data.success)
                dispatch(ArticleActionCreator.fetchedArticles(res.data.page_meta, res.data.articles));
            else
                dispatch(UiActionCreator.error(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            dispatch(UiActionCreator.error('It could not load the articles, reason: ' + err.message));
            console.error(err);
        });
    }
};

export function fetchArticle(slug) {
    console.trace('ArticleActionCreator::fetchArticle');
    return (dispatch) => {
        console.trace('ArticleActionCreator::fetchArticle_Async');
        // dispatch(UiActionCreator.info('Loading article'));
        dispatch(ArticleActionCreator.loading());
        ArticleAxiosService.fetchBySlug(slug).then(res => {
            if (res.data.success) {
                dispatch(UiActionCreator.clear());
                dispatch(ArticleActionCreator.fetchedArticle(res.data));
                dispatch(CommentActionCreator.fetchedComments(res.data.comments));
            } else
                dispatch(UiActionCreator.error(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
            dispatch(UiActionCreator.error('It could not load the article, reason: ' + err.message));
        });
    }
}

function setArticleSelected(article) {
    return fetchedArticle(article);
}

export const ArticleActionCreator = {
    fetchArticles,
    fetchArticle,
    fetchedArticle,
    fetchedArticles,
    setArticleSelected, loading
};
