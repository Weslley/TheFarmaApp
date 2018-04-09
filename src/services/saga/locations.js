import axios from 'axios';
import { all, call, put } from 'redux-saga/effects';
import { GEOCODE_API_KEY } from '../../config/server';
import { siglas } from "../../models/enums";

import {
    updateLocation,
    responseError,
    responseSuccess,
    REQUEST_GEOCODE_ERROR,
    REQUEST_GEOCODE_SUCCESS,
    UPDATE_LOCATION,
} from "../../actions/locations";

export const getLocation = function* (action) {
    navigator.geolocation.watchPosition((position) => {
        updateLocation('PI', position.coords.latitude, position.coords.longitude);
    },
        (error) => { console.log(error) },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
}

export const getGeocode = function* (action) {
    try {
        let uf = 'PI';
        const response = yield call(axios.get, `https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.latitude},${action.longitude}&key=${GEOCODE_API_KEY}`);
        if (response.data && response.data.results.status === "OK") {
            let address = response.results[0].address_components.find((i) => siglas.includes(i.short_name))
            if (address) {
                uf = address.short_name
            }
        }
        yield put(responseSuccess(REQUEST_GEOCODE_SUCCESS, uf));
    } catch (e) {
        yield put(responseError(REQUEST_GEOCODE_ERROR, e));
    }
}