import {
    COMMENTS_FETCH_SUCCESS,
    COMMENT_SELECTED,
    COMMENT_CREATION_SUCCESS,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_FORM_STATE_UPDATE_SUCCESS,
    COMMENT_FORM_UPDATE_SUCCESS,
    COMMENT_DELETE_SUCCESS
} from '../actions/types';

const commentFormState = {
    voteScore: 1,
    body: '',
    author: '',
    category: ''
};
const errors = {};
const saving = false;
const newComment = false;
const comments = 'comments';
const commentFormStateName = 'commentFormState';
// const selectedId = 'selectedId';
const INITIAL_STATE = {
    newComment,
    comments: [],
    commentFormState,
    errors,
    saving,
    selectedId: ''
};

export default(state = INITIAL_STATE, action) => {
    console.log('COMMENTS_FETCH action', action);
    switch (action.type) {
        case COMMENTS_FETCH_SUCCESS:
            return {...state, comments: action.payload};
        case COMMENT_SELECTED:
            return {...state, selectedId: action.payload};
        case COMMENT_CREATION_SUCCESS:
            return {...state, comments: [...state[comments], Object.assign({}, action.payload)], commentFormState: Object.assign({}, commentFormState), errors, saving};
        case COMMENT_UPDATE_SUCCESS:
            return {...state, comments: [...state[comments].filter(comment => comment.id !== action.payload.id), Object.assign({}, action.payload)]};
        case COMMENT_FORM_STATE_UPDATE_SUCCESS:
            return {...state, [action.payload.key]: Object.assign({}, action.payload.value)};
        case COMMENT_FORM_UPDATE_SUCCESS:
            return {...state, [action.payload.key]: action.payload.value};
        case COMMENT_DELETE_SUCCESS:
            return {...state, [comments]: [...state[comments].filter(comment => comment.id !== action.payload.id)]};
        default:
            return state;
    }
};
