import { combineReducers } from 'redux';

import produto from './produto';
import localizacao from './localizacao';

export default combineReducers({
	produto, localizacao
});
