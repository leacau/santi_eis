import React, { useState } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Actualizamos el perfil con el nombre y apellido
			await updateProfile(user, { displayName: `${firstName} ${lastName}` });

			// Guardamos la información adicional en Firestore
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				email: user.email,
				firstName,
				lastName,
				createdAt: new Date(),
			});

			alert('Registro exitoso. Ahora puedes iniciar sesión.');
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
					type='text'
					placeholder='Nombre'
					className='border p-2 w-full mb-4'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<input
					type='text'
					placeholder='Apellido'
					className='border p-2 w-full mb-4'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<input
					type='email'
					placeholder='Correo'
					className='border p-2 w-full mb-4'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Contraseña'
					className='border p-2 w-full mb-4'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
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
