import { combineReducers } from 'redux';

import carts from './carts';
import products from './products';
import locations from './locations';
import clients from './clients';
import cities from './cities';
import districts from './districts';
import apresentations from './apresentations';
import generics from './generics';
import addresses from './addresses';
import creditCards from './creditCards';
import orders from './orders';
import notifications from './notifications';

export default combineReducers({
    locations, carts, cities, districts,
    products, apresentations, generics, 
    clients, addresses, creditCards, orders, notifications
});