import { getAuth, signOut } from 'firebase/auth';

import { Link } from 'react-router-dom';
import React from 'react';
import app from '../firebaseConfig';

function NavBar() {
	const auth = getAuth(app);

	const handleLogout = () => {
		signOut(auth).then(() => {
			alert('Sesión cerrada.');
		});
	};

	return (
		<nav className='bg-blue-500 text-white p-4 flex justify-between'>
			<h1 className='text-lg font-bold'>Live Chat App</h1>
			<div>
				<Link to='/' className='mr-4'>
					Inicio
				</Link>
				<Link to='/chat' className='mr-4'>
					Chat
				</Link>
				<button onClick={handleLogout} className='bg-red-500 p-2 rounded'>
					Cerrar sesión
				</button>
			</div>
		</nav>
	);
}

export default NavBar;
