import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import app from '../firebaseConfig';

function NavBar() {
	const auth = getAuth(app);
	const navigate = useNavigate();
	const [userLogin, setUserLogin] = useState(false);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log('cargando NavBar');
			if (user) {
				setUserLogin(true);
			} else {
				setUserLogin(false);
			}
		});
	}, []);

	const handleLogout = () => {
		signOut(auth).then(() => {
			alert('Sesión cerrada.');
			navigate('/');
		});
	};

	return (
		<nav className='bg-blue-500 text-white p-4 flex justify-between sticky top-0'>
			<h1 className='text-lg font-bold'>Live Chat App</h1>
			<div>
				<Link to='/' className='mr-4'>
					Inicio
				</Link>
				{userLogin && (
					<>
						<Link to='/chat' className='mr-4'>
							Chat
						</Link>
						<button onClick={handleLogout} className='bg-red-500 p-2 rounded'>
							Cerrar sesión
						</button>
					</>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
