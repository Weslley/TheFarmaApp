import configuracao from '../utils/config';

export default class BaseService {

	static getBaseURL(){
		return configuracao.IP_SERVER; // + ":" + configuracao.PORT;
	}

}