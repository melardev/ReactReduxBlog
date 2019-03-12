import {combineReducers} from "redux";
import {AuthReducer} from './auth.reducer'
import {ArticleReducer} from './articles.reducer'
import {UiReducer} from './ui.reducer'
import {TagsReducer} from './tags.reducer'
import {CategoriesReducer} from './categories.reducer'
import {CommentReducer} from "./comments.reducer";

export const rootReducer = combineReducers({
    ArticleReducer, CommentReducer,
    AuthReducer,
    UiReducer,
    TagsReducer, CategoriesReducer
});
