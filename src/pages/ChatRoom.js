import React, { use, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Chat from '../components/Chat';
import NavBar from '../components/NavBar';
import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function ChatRoom() {
	const auth = getAuth(app);
	const [userLogin, setUserLogin] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log('user en home: ' + user);

			if (user) {
				setUserLogin(true);
				setLoading(false);
			} else {
				setUserLogin(false);
				navigate('/');
			}
		});
	}, []);

	return (
		<div>
			{!loading && userLogin && (
				<>
					<div className='min-h-screen bg-gray-100 p-4'>
						<h1 className='text-3xl font-bold mb-4'>Chat en Vivo</h1>
						<Chat />
					</div>
				</>
			)}
		</div>
	);
}

export default ChatRoom;
