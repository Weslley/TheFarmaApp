import {
    SET_PERMISSIONS,
    SET_CURRENT_SCREEN
} from "../actions/configurations"

const INITIAL_STATE = {
    location: '',
    camera: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PERMISSIONS:
            return { ...state }
    }
}