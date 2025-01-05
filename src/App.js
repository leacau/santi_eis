import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import React from 'react';
import Register from './components/Register';

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/chat' element={<ChatRoom />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;

