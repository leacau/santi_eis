import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref } from 'firebase/database';

import app from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

function Chat() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const auth = getAuth(app);
	const db = getDatabase(app);

	useEffect(() => {
		if (auth.currentUser === null || auth.currentUser === undefined) {
		} else {
			const messagesRef = ref(db, 'messages');
			onValue(messagesRef, (snapshot) => {
				const data = snapshot.val();
				const loadedMessages = data ? Object.values(data) : [];
				setMessages(loadedMessages);
			});
		}
	}, [db]);

	const sendMessage = () => {
		const user = auth.currentUser;

		if (user && newMessage.trim()) {
			const messagesRef = ref(db, 'messages');
			push(messagesRef, {
				sender: user.email,
				text: newMessage,
				timestamp: Date.now(),
			});
			setNewMessage('');
		}
	};

	const loginFirst = () => {
		if (auth.currentUser === null || auth.currentUser === undefined) {
			alert('debes estar regsitrado');
		} else {
			sendMessage();
		}
	};

	return (
		<div className='p-4'>
			<div className='overflow-y-auto h-64 border p-4 mb-4'>
				{messages.map((msg, index) => (
					<div key={index} className='mb-2'>
						<strong>{msg.sender}</strong>: {msg.text}
					</div>
				))}
			</div>
			<input
				type='text'
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				placeholder='Escribe un mensaje...'
				className='border p-2 w-full mb-2'
			/>
			<button
				onClick={loginFirst}
				className='bg-green-500 text-white p-2 rounded w-full'
			>
				Enviar
			</button>
		</div>
	);
}

export default Chat;
