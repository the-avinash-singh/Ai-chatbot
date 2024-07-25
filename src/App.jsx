import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToChatGPT } from './api/openai';
import { IoSend } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setMessage('');
    setIsLoading(true);

    try {
      const botMessageText = await sendMessageToChatGPT(newChat);
      const botMessage = { role: 'assistant', content: botMessageText };
      setChat((prevChat) => [...prevChat, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className='d-flex flex-column bg-light full-width'>
      <div className="chat-header bg-success text-white p-3">
        <h1 className="m-0 fw-bold"><span className='brand'>devDeejay</span>.in</h1>
      </div>
      <div className="chat-body mt-4 bg-light flex-grow-1">
        <div className="chat-messages card p-3 bg-white mx-2 mx-md-4 mx-lg-5">
          <ul className='list-unstyled'>
            {chat.map((msg, index) => (
              <li key={index} className={`message ${msg.role === 'assistant' ? 'bot-message' : 'user-message'} mb-2`}>
                <div className="message-bubble p-2 px-3 rounded">
                  {msg.content}
                </div>
              </li>
            ))}
            {isLoading && (
              <li className="message bot-message mb-2">
                <div className="message-bubble p-2 rounded">
                  <div className="loader mx-2"></div>
                </div>
              </li>
            )}
            <div ref={chatEndRef} />
          </ul>
        </div>
      </div>
      <div className='chat-input bg-white p-3 d-flex align-items-center'>
        <input 
          type='text'
          value={message}
          className='form-control me-2'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button className='btn btn-success w-auto pb-2 rounded-circle' onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default App;
