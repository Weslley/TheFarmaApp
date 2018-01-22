import { CHANGE_LOCATION } from '../actions/localizacao';

const INITIAL_STATE = {
    uf: 'PI'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOCATION:
            return {
                ...state,
                uf: action.uf
            };
        default:
            return state;
    }
};
