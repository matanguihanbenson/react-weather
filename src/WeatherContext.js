import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, loading, setLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};
