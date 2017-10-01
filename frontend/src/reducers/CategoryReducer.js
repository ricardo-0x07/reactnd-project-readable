import {CATEGORIES_FETCH_SUCCESS} from '../actions/types';

const INITIAL_STATE = [];

export default(state = INITIAL_STATE, action) => {
    console.log('CATEGORIES_FETCH action', action);
    switch (action.type) {
        case CATEGORIES_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
