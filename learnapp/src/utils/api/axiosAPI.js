import axios from 'axios';
import errors from '../alerts/errorMessages';

export async function getRequest(baseURL) {
	try {
		const result = await axios.get(baseURL);
		return result.data;
	} catch (error) {
		window.alert(errors.getRequestFailError);
		window.location.reload();
	}
}

export async function getRequestParam(baseURL, getData) {
	try {
		const result = await axios.get(`${baseURL}/${getData}`);
		return result.data;
	} catch (error) {
		window.alert(errors.getRequestFailError);
		window.location.reload();
	}
}

export async function postRequset(baseURL, postData) {
	try {
		const result = await axios.post(baseURL, postData);
		console.log(result.data);
		return result.data;
	} catch (error) {
		console.error(errors.postRequestFailError);
	}
}

export async function deleteRequest(baseURL, id) {
	try {
		const result = await axios.delete(`${baseURL}/${id}`);
		return result.data;
	} catch (error) {
		console.error(errors.deleteRequestFailError);
	}
}

export default { getRequest, getRequestParam, postRequset, deleteRequest };

// export default axios.create({
//   baseURL: `http://jsonplaceholder.typicode.com/`
// });
