import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Forecast({ locationpos }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locData, setlocData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {
          q: locationpos,
          days: '3',
        },
        headers: {
          'X-RapidAPI-Key': 'ef2f9f3508msh222e7bd07a8956fp1f91c7jsn27aa290318af',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setForecastData(response.data.forecast?.forecastday);
        setlocData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locationpos]);

  useEffect(() => {
    console.log(forecastData);
  }, [forecastData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  };

  return (
    <div className='md:mt-6 flex flex-col justify-center h-[300px]'>
      {loading ? (
        <p>Loading forecast...</p>
      ) : (
        <div>
          <h1 className='leading-none animate__animated animate__fadeInUp' style={{animationDelay: '100ms'}}>Chance of Rain</h1>
          <h1 className='leading-none font-bold text-4xl animate__animated animate__fadeInUp' style={{animationDelay: '200ms'}}>Daily Forecast</h1>
          <p className='text-[#676767] animate__animated animate__fadeInUp' style={{animationDelay: '300ms'}}>
            {locData?.location?.name}, {locData?.location?.region}, {locData?.location?.country}
          </p>
        </div>
      )}

      <div className='grid grid-cols-12 gap-4 mt-4'>
        {forecastData.map((day, index) => (
          <div
            key={day.date}
            className='bg-[#ececec] rounded-lg shadow-inner shadow-[#ccc] flex flex-col items-center col-span-4 px-2 py-2 animate__animated animate__fadeInUp'
            style={{ animationDelay: `${index * 0.1}s` }} // Multiply index by 0.1 for delay
          >
            <p>{formatDate(day.date)}</p>
            <img src={day.day.condition.icon} alt='' />
            <p className='text-5xl font-bold relative'>
              {day.day?.daily_chance_of_rain}
              <span className='text-lg absolute top-1'>%</span>
            </p>
            <p className='text-[#676767] text-center'>chance of rain</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
