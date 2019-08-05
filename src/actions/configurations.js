export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';

export const setPermissions = params => ({
    type: SET_PERMISSIONS, params
});

export const setCurrentScreen = params => ({
    type: SET_CURRENT_SCREEN, params
});