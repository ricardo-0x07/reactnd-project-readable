import { combineReducers } from 'redux';
import categories from './CategoryReducer';
import posts from './PostReducer';
import comments from './CommentReducer';

export default combineReducers({
    categories,
    posts,
    comments
});
