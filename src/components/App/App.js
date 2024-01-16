import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  const addUrl = (newUrl) => {
    postUrl(newUrl)
      .then(data => {
        setUrls([...urls, data]);
      })
      .catch(error => setError(error.message));
  }

  useEffect(() => {
    getUrls()
      .then(data => {
        setUrls([...urls, ...data.urls]);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl} />
      </header>

      <UrlContainer urls={urls} />
      {error && <p className='error-message'>{error}</p>}
    </main>
  );
}

export default App;
