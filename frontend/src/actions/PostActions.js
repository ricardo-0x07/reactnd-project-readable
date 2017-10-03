// import { browserHistory } from 'react-router-dom';
import {
    POSTS_FETCH_SUCCESS,
    POST_FETCH_SUCCESS,
    SORT_UPDATE,
    POST_UPDATE_SUCCESS,
    UPDATE_POSTS_SUCCESS,
    POST_CREATION_SUCCESS,
    POST_FORM_STATE_UPDATE_SUCCESS,
    POST_FORM_UPDATE_SUCCESS,
    POST_DELETE_SUCCESS
} from './types';
import * as API from '../utils/api';

export const postsFetch = () => {
    return dispatch => {
        API
            .getPosts()
            .then(response => {
                dispatch({ type: POSTS_FETCH_SUCCESS, payload: response });
            });
    };
};

export const postFetch = id => {
    return dispatch => {
        API
            .getPost(id)
            .then(response => {
                dispatch({ type: POST_FETCH_SUCCESS, payload: response });
            });
    };
};


export const postDelete = id => {
    return dispatch => {
        return API
            .deletePost(id)
            .then(response => {
                dispatch({ type: POST_DELETE_SUCCESS, payload: response });
                // browserHistory.push('/');
            });
    };
};
export const sortUpdate = ({ value }) => {
    return {
        type: SORT_UPDATE,
        payload: value
    };
};

export const updatePosts = posts => {
    return {
        type: UPDATE_POSTS_SUCCESS,
        payload: posts
    };
};

export const postFormStateUpdate = update => {
    return {
        type: POST_FORM_STATE_UPDATE_SUCCESS,
        payload: update
    };
};

export const postFormUpdate = update => {
    return {
        type: POST_FORM_UPDATE_SUCCESS,
        payload: update
    };
};

export const updatePost = post => {
    return dispatch => {
        return API
            .updatePost(post)
            .then(response => {
                dispatch({ type: POST_UPDATE_SUCCESS, payload: response });
            });
    };
};

export const createPost = post => {
    return dispatch => {
        return API
            .createPost(post)
            .then(response => {
                dispatch({ type: POST_CREATION_SUCCESS, payload: response });
            });
    };
};
