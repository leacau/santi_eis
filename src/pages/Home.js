import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import React from 'react';

function Home() {
	return (
		<div>
			<NavBar />
			<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
				<h1 className='text-4xl font-bold mb-4'>Bienvenido a Live Chat App</h1>
				<p className='mb-6'>Inicia sesión o regístrate para comenzar.</p>
				<div>
					<Link to='/login' className='bg-blue-500 text-white p-3 rounded mr-4'>
						Iniciar sesión
					</Link>
					<Link to='/register' className='bg-green-500 text-white p-3 rounded'>
						Registrarse
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
