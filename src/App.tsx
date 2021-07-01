import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import RedirectUrl from './pages/RedirectUrl';

function App() {
	return (
		<Router>
			<div className='container mx-auto my-10 px-6'>
				<NavLink to='/' className='block text-3xl text-center font-semibold hover:underline'>
					Connect to QuickBooks
				</NavLink>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/redirectUrl' component={RedirectUrl} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
