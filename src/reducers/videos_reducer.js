import _ from "lodash";
import {
    ADD_VIDEO
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_VIDEO:
            return {...state, [action.payload.path]: action.payload};
        default:
            return state;
    }
}