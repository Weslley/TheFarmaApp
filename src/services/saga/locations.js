import {
    responseError,
    responseSuccess,
    REQUEST_GEOCODE_ERROR,
    REQUEST_GEOCODE_SUCCESS,
} from "../../actions/locations";

export const getGeocode = function* (action) {
    try {
        const response = yield call(axios.get, `${SERVER_API}/apresentacoes/${action.uf}?nome=${action.productName}`);
        yield put(responseSuccess(REQUEST_GEOCODE_SUCCESS, response.data.results));
    } catch(e) {
        yield put(responseError(REQUEST_GEOCODE_ERROR, e));
    }
}