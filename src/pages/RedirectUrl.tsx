import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import querystring from 'querystring';
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
			const res = await JanttApi.get('/qbo/callback' + location.search);
			console.log('🚀 handleConnect ~ res', res);
			console.log('🚀 handleConnect ~ res.data', res.data);
			setToken(res.data);
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};

	const getCompanyInformation = async () => {
		try {
			const res = await JanttApi.get('/qbo/company/' + params.realmId, {
				headers: { Authorization: token?.access_token },
			});
			console.log('🚀 handleConnect ~ res', res);
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};
	
	const getVendorInformation = async () => {
		try {
			const res = await JanttApi.get('/qbo/expensebyvendor/' + params.realmId, {
				headers: { Authorization: token?.access_token },
			});
			console.log('🚀 handleConnect ~ res', res);
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};

	const getSalesInformation = async () => {
		try {
			const res = await JanttApi.get(`/qbo/salesreport/${params.realmId}?date_macro=Last Fiscal Quarter`, {
				headers: { Authorization: token?.access_token },
			});
			console.log('🚀 handleConnect ~ res', res);
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
						className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2 mr-4'
						onClick={getCompanyInformation}>
						Get Company Information
					</button>
					<button
						className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2 mr-4'
						onClick={getVendorInformation}>
						Get Vendor Information
					</button>
					<button
						className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2'
						onClick={getSalesInformation}>
						Get Sales Information
					</button>
				</>
			)}
		</div>
	);
};

export default RedirectUrl;
