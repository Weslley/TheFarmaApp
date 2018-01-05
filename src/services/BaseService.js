import Config from '../utils/Config';

class BaseService {

	static getBaseURL(){
		return Config.IP_SERVER + Config.PORT;
	}

}