import { combineReducers } from 'redux';

import produto from './produto';
import localizacao from './localizacao';
import carrinho from './carrinho';

export default combineReducers({
	produto, localizacao, carrinho
});
