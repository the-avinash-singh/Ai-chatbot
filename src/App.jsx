import React, { useState, useEffect } from 'react';
import { sendMessageToChatGPT } from './api/openai';
import { IoSend } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css"

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setChat((prevChat) => [...prevChat, userMessage]);
    setMessage('');

    const botMessageText = await sendMessageToChatGPT(message);
    const botMessage = { sender: 'bot', text: botMessageText };
    setChat((prevChat) => [...prevChat, botMessage]);
  };

  return (
    <div className='d-flex flex-column bg-dark full-width'>
      <h1 className='text-white'>Chat with Us</h1>
      <div className="card pt-4 bg-black mx-2 mx-md-4 mx-lg-5">
      <ul className='d-flex flex-column text-white list-unstyled'>
        {chat.map((msg, index) => (
          <li key={index} className='d-flex'>
            {msg.sender=='bot'? <div className=" shadow text-width bg-dark mt-2 p-2 rounded">{msg.sender}: {msg.text}</div>: <div className="shadow user-text text-width mt-2 p-2 rounded ms-auto text-end">{msg.sender}: {msg.text}</div>}
          </li>
        ))}
      </ul>
      </div>
      <div className='mx-2 mt-3 mx-md-4 mx-lg-5 d-flex justify-content-between align-items-center bg-white rounded'>
      <input 
      type='text'
        value={message}
        className='text-black w-75 rounded'
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
      />
      <button className='bg-dark button btn' onClick={sendMessage}>
      <IoSend />
      </button>
      </div>
    </div>
  );
}

export default App;
