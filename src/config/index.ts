import axios from 'axios';

export const API_ENDPOINT_LAMBDA = 'https://7qi0cmrqu0.execute-api.us-east-1.amazonaws.com/v1';

export const JanttApi = axios.create({
	baseURL: API_ENDPOINT_LAMBDA,
	headers: {
		'Content-type': 'application/json',
	},
});
