import React from 'react';
import axios from 'axios';

const Landing = () => {
	const handleConnect = async () => {
		try {
			const res = await axios.get('http://localhost:4000/authUri');
			console.log('🚀 handleConnect ~ res', res);

			// Launch Popup
			// let parameters = 'location=1,width=800,height=650';
			// parameters += ',left=' + 50 + ',top=' + 50;
			// window.open(res.data.authUri, 'connectPopup', parameters);
			// window.open(res.data.authUri, '_blank', parameters);
			window.location.href = res.data.authUri;
		} catch (error) {
			console.log('⚠ handleConnect ~ error.response', error.response);
		}
	};

	return (
		<div className='space-y-4 my-8'>
			<button className='bg-[#2CA01C] text-white font-semibold rounded-full px-4 py-2' onClick={handleConnect}>
				Connect
			</button>
		</div>
	);
};

export default Landing;
