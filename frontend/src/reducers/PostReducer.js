import {
    POSTS_FETCH_SUCCESS,
    SORT_UPDATE,
    UPDATE_POSTS_SUCCESS,
    POST_CREATION_SUCCESS,
    POST_FORM_STATE_UPDATE_SUCCESS,
    POST_UPDATE_SUCCESS,
    POST_FORM_UPDATE_SUCCESS,
    POST_DELETE_SUCCESS
} from '../actions/types';

const postFormState = {
    title: '',
    body: '',
    author: '',
    category: ''
};
const errors = {};
const saving = false;

const INITIAL_STATE = {
    posts: [],
    sortBy: 'voteScore',
    postFormState,
    errors,
    saving
};
const postFormStateName = 'postFormState';

export default(state = INITIAL_STATE, action) => {
    console.log('POSTS ACTIONS action', action);
    const posts = 'posts';
    const sortBy = 'sortBy';
    switch (action.type) {
        case POSTS_FETCH_SUCCESS:
            return {...state, [posts]: action.payload};
        case POST_CREATION_SUCCESS:
            return {...state, [posts]: [...state[posts], Object.assign({}, action.payload)], [postFormStateName]: Object.assign({}, postFormState), errors, saving};
        case POST_UPDATE_SUCCESS:
            return {...state, [posts]: [...state[posts].filter(post => post.id !== action.payload.id), Object.assign({}, action.payload)]};
        case POST_FORM_STATE_UPDATE_SUCCESS:
            return {...state, [action.payload.key]: Object.assign({}, action.payload.value)};
        case POST_FORM_UPDATE_SUCCESS:
            return {...state, [action.payload.key]: action.payload.value};
        case POST_DELETE_SUCCESS:
            return {...state, [posts]: [...state[posts].filter(post => post.id !== action.payload.id)]};
        case SORT_UPDATE:
            return {...state, [sortBy]: action.payload};
        case UPDATE_POSTS_SUCCESS:
            return {...state, [posts]: action.payload};
        default:
            return state;
    }
};
