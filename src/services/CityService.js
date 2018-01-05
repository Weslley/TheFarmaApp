import BaseService from './BaseService';

class CityService extends BaseService {

	static async function getCities(url) {
		try {
			let response = await fetch(this.getBaseURL() + url);
			let responseJson = await response.json();
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	}
	
}