import axios from 'axios'
import { COOKIES } from './'

const request = async function ({ options = true, headers = {} }) {
	const authToken = COOKIES.getAuthToken() || ''
	const client = axios.create({
		baseURL: 'http://localhost:5000/v1',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + authToken,
			...headers,
		},
		responseType: 'json',
	})

	const onSuccess = function (response) {
		return response.data
	}

	const onError = function (error) {
		return Promise.reject(error.response || error.message)
	}

	return client(options).then(onSuccess).catch(onError)
}

const login = admin => {
	return request ({
		options: {
			url: '/admin',
			method: 'POST',
			data: admin,
		},
	})
}

const getType = async id => {
	return request ({
		options: {
			url: `/admin/type/${id}`,
			method: 'GET',
		},
	})
}

const getTile = url => {
	return request ({
		options: {
			url: `/tile/${url}`,
			method: 'GET',
		},
	})
}

const getTypes = () => {
	return request ({
		options: {
			url: '/types',
			method: 'GET',
		},
	})
}

const getTiles = async ({page = 1, typeBy= '', sortBy = '', orderBy = 1}) => {
	return request ({
		options: {
			url: `/tiles?&page=${page}&type=${typeBy}&sort=${sortBy}&order=${orderBy}`,
			method: 'GET',
		},
	})
}

const uploadImages = async ({ id, formData }) => {
	return request ({
		headers: {
			Accept: 'multipart/form-data',
			'Content-Type': 'multipart/form-data',
		},
		options: {
			url: `/admin/tile/images/${id}`,
			method: 'PUT',
			data: formData,
		},
	})
}

const addType = async ({ title, url }) => {
	return request ({
		options: {
			url: '/admin/type',
			method: 'POST',
			data: {
				title,
				url,
			},
		},
	})
}

const addTile = async data => {
	return request ({
		options: {
			url: '/admin/tile',
			method: 'POST',
			data,
		},
	})
}

const updateType = async ({ id, title }) => {
	return request ({
		options: {
			url: `/admin/type/${id}`,
			method: 'PUT',
			data: {
				title,
			},
		},
	})
}

const updateTile = async ( url, data ) => {
	return request ({
		options: {
			url: `/admin/tile/${url}`,
			method: 'PUT',
			data,
		},
	})
}

const deleteTile = async id => {
	return request ({
		options: {
			url: `/admin/tile/${id}`,
			method: 'DELETE',
		},
	})
}

const deleteType = async id => {
	return request ({
		options: {
			url: `/admin/type/${id}`,
			method: 'DELETE',
		},
	})
}

const useHTTPRequest = {
	login,
	getTypes,
	getTiles,
	getType,
	uploadImages,
	updateType,
	getTile,
	updateTile,
	addType,
	addTile,
	deleteTile,
	deleteType,
}

export default useHTTPRequest
