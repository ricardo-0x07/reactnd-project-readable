import {
    COMMENTS_FETCH_SUCCESS,
    COMMENT_FETCH_SUCCESS,
    COMMENT_SELECTED,
    COMMENT_CREATION_SUCCESS,
    COMMENT_FORM_STATE_UPDATE_SUCCESS,
    COMMENT_FORM_UPDATE_SUCCESS,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_DELETE_SUCCESS,
    POST_COMMENTS_FETCH_SUCCESS
} from './types';
import * as API from '../utils/api';

export const commentsFetch = postId => {
    return dispatch => {
        API
            .getPostComments(postId)
            .then(response => {
                dispatch({ type: COMMENTS_FETCH_SUCCESS, payload: response });
            });
    };
};

export const postCommentsFetch = postId => {
    return dispatch => {
        console.log('getComments id', postId);
        API
            .getPostComments(postId)
            .then(response => {
                dispatch({ type: POST_COMMENTS_FETCH_SUCCESS, payload: {key: postId, value: response} });
            });
    };
};

export const commentFetch = id => {
    return dispatch => {
        API
            .getPost(id)
            .then(response => {
                dispatch({ type: COMMENT_FETCH_SUCCESS, payload: response });
            });
    };
};

export const onCommentSelected = value => {
    return {
        type: COMMENT_SELECTED,
        payload: value
    };
};

export const createComment = comment => {
    return dispatch => {
        return API
            .addComment(comment)
            .then(response => {
                dispatch({ type: COMMENT_CREATION_SUCCESS, payload: response });
            });
    };
};

export const commentFormStateUpdate = update => {
    return {
        type: COMMENT_FORM_STATE_UPDATE_SUCCESS,
        payload: update
    };
};

export const commentFormUpdate = update => {
    return {
        type: COMMENT_FORM_UPDATE_SUCCESS,
        payload: update
    };
};

export const updateComment = comment => {
    return dispatch => {
        return API
            .updateComment(comment)
            .then(response => {
                dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: response });
            });
    };
};

export const commentDelete = id => {
    return dispatch => {
        return API
            .deleteComment(id)
            .then(response => {
                dispatch({ type: COMMENT_DELETE_SUCCESS, payload: response });
            });
    };
};

