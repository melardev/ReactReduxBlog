import {ArticleAction} from "../actions/types";

const INITIAL_STATE = {
    is_loading: false,
    articles_data: {
        page_meta: {},
        articles: []
    },
    selected_article: {}
};

export const ArticleReducer = function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case ArticleAction.local.ARTICLE_SET_IS_LOADING:
            return {...state, is_loading: action.is_loading};
        case ArticleAction.local.FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                is_loading: false,
                articles_data: action.articles_data
            };
        case ArticleAction.local.FETCH_ARTICLE_SUCCESS:
            return {...state, selected_article: action.article, is_loading: false};
        case ArticleAction.local.CREATE_ARTICLE_SUCCESS:
            return {
                ...state, is_loading: false,
                articles_data: {
                    articles: (state.articles_data.articles || []).push(action.article)
                }
            };
        case ArticleAction.local.UPDATE_ARTICLE_SUCCESS:
            // TODO: reconsider this, there may be some bugs with changed_valueus
            // If we don't resent the whole article values even if not changed
            return {
                ...state, is_loading: false,
                articles_data: {
                    articles: state.articles.list.map(article => {
                        if (article.id === action.id)
                            return {...article, ...action.changed_values};
                        else
                            return article;
                    })
                }

            };
        case ArticleAction.local.DELETE_ARTICLE_SUCCESS:
            return {
                ...state, is_loading: false, articles_data: {
                    articles: state.articles.filter(({id}) => id !== action.id)
                }
            };
        default:
            return state;
    }
};