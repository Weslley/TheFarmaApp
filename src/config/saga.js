import { takeEvery, takeLatest } from 'redux-saga/effects';

//LOCATIONS
import { getGeocode, getLocation } from '../services/saga/locations';
import { REQUEST_GEOCODE, GET_LOCATION } from '../actions/locations';
//PRODUCTS
import { getByName, selectProduct, getHistory, getByBarcode } from '../services/saga/products';
import { SEARCH_PRODUCTS, SELECT_PRODUCT, GET_HISTORY, SEARCH_PRODUCTS_BARCODE } from '../actions/products';
//APRESENTATIONS
import { getApresentations, getApresentationsNextPage, ranking } from '../services/saga/apresentations';
import { GET_APRESENTATIONS, GET_APRESENTATIONS_NEXT_PAGE, RANKING_VIEW } from '../actions/apresentations';
//GENERICS
import { getGenerics, getGenericsNextPage } from '../services/saga/generics';
import { GET_GENERICS, GET_GENERICS_NEXT_PAGE } from '../actions/generics';
//CITIES
import { getCities } from '../services/saga/cities';
import { GET_CITIES } from '../actions/cities';
//DISTRICTS
import { getDistricts } from '../services/saga/districts';
import { GET_DISTRICTS } from '../actions/districts';
//CLIENTS
import { login, logout, register, updateClient, updateClientV2, getCurrentClient } from '../services/saga/clients';
import { REQUEST_LOGIN, REGISTER_CLIENT, UPDATE_CLIENT, UPDATE_CLIENT_V2, GET_CURRENT_CLIENT, LOGOUT } from '../actions/clients';
//ADDRESSES
import { getAddresses, createAddress, updateAddress, removeAddress } from '../services/saga/addresses';
import { LIST_ADDRESS, SAVE_ADDRESS, UPDATE_ADDRESS, REMOVE_ADDRESS } from '../actions/addresses';
//CREDIT_CARDS
import { getCreditCards, createCreditCard, removeCreditCard } from '../services/saga/creditCards';
import { LIST_CREDIT_CARD, REMOVE_CREDIT_CARD, SAVE_CREDIT_CARD } from '../actions/creditCards';
//ORDERS
import { getOrder, getOrders, createOrder, checkoutOrder, cancelOrder, getOrdersNextPage } from '../services/saga/orders';
import { GET_ORDER, LIST_ORDER, CREATE_ORDER, CHECKOUT, CANCEL_ORDER, LIST_ORDER_NEXT_PAGE } from '../actions/orders';

const rootSaga = function* () {
    yield takeLatest(GET_LOCATION, getLocation);
    yield takeLatest(REQUEST_GEOCODE, getGeocode);

    yield takeEvery(GET_CITIES, getCities);
    yield takeEvery(GET_DISTRICTS, getDistricts);

    yield takeLatest(SEARCH_PRODUCTS, getByName);
    yield takeLatest(SEARCH_PRODUCTS_BARCODE, getByBarcode);
    yield takeEvery(GET_HISTORY, getHistory);
    yield takeEvery(SELECT_PRODUCT, selectProduct);
    yield takeEvery(GET_APRESENTATIONS, getApresentations);
    yield takeLatest(GET_APRESENTATIONS_NEXT_PAGE, getApresentationsNextPage);
    yield takeEvery(GET_GENERICS, getGenerics);
    yield takeLatest(GET_GENERICS_NEXT_PAGE, getGenericsNextPage);
    yield takeEvery(RANKING_VIEW, ranking);

    yield takeEvery(REQUEST_LOGIN, login);
    yield takeEvery(REGISTER_CLIENT, register);
    yield takeEvery(UPDATE_CLIENT, updateClient);
    yield takeEvery(UPDATE_CLIENT_V2, updateClientV2);
    yield takeEvery(GET_CURRENT_CLIENT, getCurrentClient);
    yield takeEvery(LOGOUT, logout);

    yield takeEvery(LIST_ADDRESS, getAddresses);
    yield takeEvery(SAVE_ADDRESS, createAddress);
    yield takeEvery(UPDATE_ADDRESS, updateAddress);
    yield takeEvery(REMOVE_ADDRESS, removeAddress);

    yield takeEvery(LIST_CREDIT_CARD, getCreditCards);
    yield takeEvery(SAVE_CREDIT_CARD, createCreditCard);
    yield takeEvery(REMOVE_CREDIT_CARD, removeCreditCard);

    yield takeEvery(GET_ORDER, getOrder);
    yield takeEvery(LIST_ORDER, getOrders);
    yield takeEvery(LIST_ORDER_NEXT_PAGE, getOrdersNextPage);
    yield takeLatest(CREATE_ORDER, createOrder);
    yield takeLatest(CHECKOUT, checkoutOrder);
    yield takeLatest(CANCEL_ORDER, cancelOrder);
}

export default rootSaga;
