import axios from 'axios';
import { all, call, put } from 'redux-saga/effects';
import { SERVER_API, GOOGLE_MAPS_API } from '../../config/server';
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
    const response = yield call(axios.get, `https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.params.latitude},${action.params.longitude}&key=${GOOGLE_MAPS_API}`);
    let address = null;
    if (response.data && response.data.status === "OK") {
      address = handleAddress(response.data.results[0]);
      address['latitude'] = action.params.latitude;
      address['longitude'] = action.params.longitude;
    }
    yield put(responseSuccess(REQUEST_GEOCODE_SUCCESS, address));
  } catch (e) {
    yield put(responseError(REQUEST_GEOCODE_ERROR, e));
  }
}

export const handleAddress = (address) => {
  formatted_address = ""
  try {
    formatted_address = address.formatted_address
  } catch (error) {
    console.log(error);
  }

  place_id = ""
  try {
    place_id = address.place_id
  } catch (error) {
    console.log(error);
  }
  logradouro = ""
  try {
    logradouro = address.address_components.find((i) => i.types.includes("route")).short_name
  } catch (error) {
    console.log(error);
  }
  numero = ""
  try {
    numero = address.address_components.find((i) => i.types.includes("street_number")).short_name
  } catch (error) {
    console.log(error);
  }
  bairro = ""
  try {
    bairro = address.address_components.find((i) => i.types.includes("sublocality")).short_name
  } catch (error) {
    console.log(error);
  }
  cidade = ""
  try {
    locality = address.address_components.find((i) => i.types.includes("locality"))
    if (locality) {
      cidade = locality.short_name
    } else {
      administrative_area_level_2 = address.address_components.find((i) => i.types.includes("administrative_area_level_2"))
      if (administrative_area_level_2) cidade = administrative_area_level_2.short_name
    }
  } catch (error) {
    console.log(error);
  }
  estado = ""
  try {
    estado = address.address_components.find((i) => i.types.includes("administrative_area_level_1")).short_name
  } catch (error) {
    console.log(error);
  }
  uf = ""
  try {
    uf = address.address_components.find((i) => siglas.includes(i.short_name)).short_name
  } catch (error) {
    console.log(error);
  }
  pais = ""
  try {
    pais = address.address_components.find((i) => i.types.includes("country")).short_name
  } catch (error) {
    console.log(error);
  }
  cep = ""
  try {
    cep = address.address_components.find((i) => i.types.includes("postal_code")).short_name
  } catch (error) {
    console.log(error);
  }
  return { logradouro, numero, bairro, cidade, estado, uf, pais, cep, address: formatted_address, place_id }
}
