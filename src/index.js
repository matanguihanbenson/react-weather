import React from 'react';
import ReactDOM from 'react-dom/client';
import './res/output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Weather from './Weather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/react-weather" element={<App />} />
        <Route path="/check/:query" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
