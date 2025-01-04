import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth(app);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			alert('Registro exitoso. Ahora puedes iniciar sesión.');
			navigate('/login');
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleRegister}
				className='bg-white p-6 rounded shadow-md'
			>
				<h1 className='text-2xl font-bold mb-4'>Registrarse</h1>
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
					className='bg-green-500 text-white p-2 rounded w-full'
				>
					Registrarse
				</button>
				<button
					type='button'
					onClick={() => navigate('/login')}
					className='bg-blue-500 text-white p-2 rounded w-full mt-3'
				>
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
}

export default Register;
