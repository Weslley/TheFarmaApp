import { CLEAR_ERROR, UPDATE_LOCATION, REQUEST_GEOCODE, REQUEST_GEOCODE_SUCCESS, REQUEST_GEOCODE_ERROR } from '../actions/locations';

const INITIAL_STATE = {
    latitude: 0.0,
    longitude: 0.0,
    uf: 'PI',
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return { ...state, uf: action.uf, latitude: action.latitude, longitude: action.longitude };
        case REQUEST_GEOCODE:
            return { ...state };
        case REQUEST_GEOCODE_SUCCESS:
            return { ...state, uf: action.data };
        case REQUEST_GEOCODE_ERROR:
            return { ...state, error: action.error };
        case CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};
