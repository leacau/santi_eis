import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		const auth = getAuth(app);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert('Inicio de sesión exitoso');
			navigate('/');
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form onSubmit={handleLogin} className='bg-white p-6 rounded shadow-md'>
				<h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>
				<input
					type='email'
					placeholder='Correo'
					className='border p-2 w-full mb-4'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Contraseña'
					className='border p-2 w-full mb-4'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white p-2 rounded w-full'
				>
					Iniciar sesión
				</button>
			</form>
		</div>
	);
}

export default Login;
