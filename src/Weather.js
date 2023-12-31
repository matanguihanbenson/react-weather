import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import notFoundImage from './res/undraw_location_search_re_ttoj.svg';
import FormSearch from './FormSearch';
import Footer from './Footer';

function Weather() {
  const { query } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: query },
        headers: {
          'X-RapidAPI-Key': 'ef2f9f3508msh222e7bd07a8956fp1f91c7jsn27aa290318af',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);

        const lastUpdatedEpoch = response.data.current.last_updated_epoch;
        const lastUpdatedDate = new Date(lastUpdatedEpoch * 1000);
        const localTime = new Date(response.data.location.localtime);

        const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        const formattedTime = lastUpdatedDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        const formattedDateLoc = localTime.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        const formattedTimeLoc = localTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        const updatedValue = `${formattedDateLoc} ${formattedTimeLoc}`;
        setCurrentTime(formattedTimeLoc);
        setCurrentDate(formattedDateLoc);
        setLastUpdated(updatedValue);

        console.log(response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="w-full h-screen bg-yellow-400 flex flex-col gap-8 justify-center items-center p-6 overflow-hidden">
      <header className="w-full h-10 absolute inset-0 flex justify-between p-6">
        <div>
          <p className="text-xl">
            <Link to="/react-weather">WeatherApp</Link>
          </p>
        </div>
      </header>
      <div className="w-[400px] max-w-[80%] flex justify-center">
        <FormSearch />
      </div>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div className="max-w-[100%] w-[400px] h-[450px] bg-white rounded-md flex flex-col justify-center items-center">
          <div className="flex w-full flex-col items-center justify-center h-full">
            <p
              className="text-center animate__animated animate__fadeInUp"
              style={{ animationDelay: '100ms' }}
            >
              {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
            </p>
            <p className=" animate__animated animate__fadeInUp" style={{ animationDelay: '200ms' }}>
              {currentDate} {currentTime}
            </p>
            <img
              src={weatherData.current.condition.icon}
              alt=""
              className="w-[30%] mt-4 animate__animated animate__fadeInUp"
              style={{ animationDelay: '300ms' }}
            />
            <p className="text-6xl font-bold animate__animated animate__fadeInUp" style={{ animationDelay: '400ms' }}>
              {weatherData.current.temp_c}°C
            </p>
            <p className=" animate__animated animate__fadeInUp" style={{ animationDelay: '500ms' }}>
              {weatherData.current.condition.text}
            </p>
          </div>
          <p
            className="text-xl bg-slate-600 p-2 text-white animate__animated animate__fadeIn"
            style={{ animationDelay: '700ms' }}
          >
            <Link to="/react-weather">Go back</Link>
          </p>
          <br />
        </div>
      ) : (
        <div className="w-[400px] flex flex-col gap-4 justify-center items-center">
          <img src={notFoundImage} className="w-[80%]" alt="" />
          <p className="text-slate-700 font-bold text-4xl">Location not found.</p>
          <p className="text-xl bg-slate-600 p-2 text-white">
            <Link to="/react-weather">Go back</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
