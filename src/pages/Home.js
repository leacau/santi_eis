import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import app from '../firebaseConfig';

function Home() {
	const auth = getAuth(app);
	const [userLogin, setUserLogin] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log('user en home: ' + user);
			if (user) {
				setUserLogin(true);
			} else {
				setUserLogin(false);
			}
			setLoading(false);
		});
	}, []);

	return (
		<div>
			{!loading && (
				<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
					<h1 className='text-4xl font-bold mb-4'>
						Bienvenido a Live Chat App
					</h1>
					<p className='mb-6'>Inicia sesión o regístrate para comenzar.</p>
					<div>
						{!userLogin && (
							<>
								<Link
									to='/login'
									className='bg-blue-500 text-white p-3 rounded mr-4 shadow-xl'
								>
									Iniciar sesión
								</Link>
								<Link
									to='/register'
									className='bg-green-500 text-white p-3 rounded shadow-xl'
								>
									Registrarse
								</Link>
							</>
						)}
					</div>
					{userLogin && (
						<Link
							to='/chat'
							className='bg-indigo-900 text-white p-3 rounded mt-4 shadow-xl'
						>
							Ir al chat
						</Link>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
