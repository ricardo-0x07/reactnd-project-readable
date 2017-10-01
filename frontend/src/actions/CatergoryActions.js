import {
    CATEGORIES_FETCH_SUCCESS
} from './types';
import * as API from '../utils/api';

export const categoriesFetch = () => {
    return dispatch => {
        API
            .getAllCategories()
            .then(response => {
                dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: response });
            });
    };
};
