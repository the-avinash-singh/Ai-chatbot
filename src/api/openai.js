// src/openai.js
import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const sendMessageToChatGPT = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error communicating with ChatGPT API:', error);
    return 'Error communicating with ChatGPT API';
  }
};
