import Chat from '../components/Chat';
import NavBar from '../components/NavBar';
import React from 'react';

function ChatRoom() {
	return (
		<div>
			<NavBar />
			<div className='min-h-screen bg-gray-100 p-4'>
				<h1 className='text-3xl font-bold mb-4'>Chat en Vivo</h1>
				<Chat />
			</div>
		</div>
	);
}

export default ChatRoom;
