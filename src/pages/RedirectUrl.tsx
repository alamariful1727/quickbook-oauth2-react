import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import querystring from 'querystring';
import axios from 'axios';
import { JanttApi } from '../config';
const RedirectUrl = () => {
	const location = useLocation();

	const params = querystring.decode(location.search.substring(1, location.search.length));

	const [token, setToken] = useState<{
		x_refresh_token_expires_in?: number;
		id_token?: string;
		access_token: string;
		refresh_token: string;
		expires_in?: number;
		token_type?: string;
	}>();

	const handleGetToken = async () => {
		try {
			// const res = await axios.get('http://localhost:4000/callback' + location.search);
			const res = await JanttApi.get('/qbo/callback' + location.search);
			console.log('🚀 handleConnect ~ res', res);
			console.log('🚀 handleConnect ~ res.data', res.data);
			setToken(res.data);
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};

	// TODO: Call proxy API
	const getCompanyInformation = async () => {
		try {
			const res = await axios.get('http://localhost:4000/company/' + params.realmId, {
				headers: { Authorization: token?.access_token },
			});
			console.log('🚀 handleConnect ~ res', res);
			// setToken(res.data.token);
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};

	return (
		<div className='space-y-4 my-8'>
			<div>
				<h2 className='font-semibold text-lg'>Params Information</h2>
				<p>{JSON.stringify(params, null, 2)}</p>
			</div>
			<button className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2' onClick={handleGetToken}>
				Get token
			</button>
			{token && (
				<>
					<div>
						<h2 className='font-semibold text-lg'>Token Information</h2>
						<p>{JSON.stringify(token, null, 2)}</p>
					</div>
					<button
						className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2'
						onClick={getCompanyInformation}>
						Get Company Information
					</button>
				</>
			)}
		</div>
	);
};

export default RedirectUrl;
