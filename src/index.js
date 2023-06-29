import React from 'react';
import ReactDOM from 'react-dom/client';
import './res/output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Weather from './Weather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherNone from './WeatherNone';
import NotFound from './Notfound';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/react-weather" element={<App />} />
        <Route path="/react-weather/check/:query" element={<Weather />} />
        <Route path="/react-weather/check/" element={<WeatherNone />} />
        <Route component={NotFound} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
