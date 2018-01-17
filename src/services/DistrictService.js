import BaseService from './BaseService';

class DistrictService extends BaseService {

	static async getDistricts(url) {
		try {
			let response = await fetch(this.getBaseURL() + url);
			let responseJson = await response.json();
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	}

}