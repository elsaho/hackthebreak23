import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import OpenAI from './OpenAI';

function App() {
  <Navbar />
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const prompt = message;
    const model = 'text-davinci-002';
    const temperature = 0.5;
    const maxTokens = 100;
    const response = await OpenAI.completions.create({ prompt, model, temperature, maxTokens });
    const generatedText = response.choices[0].text;
    setResponse(generatedText);
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input type="text" value={message} onChange={handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
        <p>Response: {response}</p>
      </div>
  );

  
}


export default App;
