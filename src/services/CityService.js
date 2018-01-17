import axios from 'axios';

import BaseService from './BaseService';

export default class CityService extends BaseService {	
	static getCities(url) {
		let requestURL = this.getBaseURL() + url;
		console.log(requestURL);
	
		axios.get(requestURL).then((response) => {
			return response;
		}).catch((error) => {
			return error;
		});
	}
}
