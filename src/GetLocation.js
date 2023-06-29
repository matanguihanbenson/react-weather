import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetLocation({ locationpos }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: locationpos },
        headers: {
          'X-RapidAPI-Key': 'ef2f9f3508msh222e7bd07a8956fp1f91c7jsn27aa290318af',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
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
  }, [locationpos]);

  return(
    <div className='w-[80%] flex flex-col mx-auto items-center gap-2 rounded-lg justify-center h-[300px] mt-6 bg-blue-500'>
        <div className='w-full text-center text-blue-100'><p className="text-4xl font-bold">{weatherData?.location?.name}</p>{weatherData?.location?.region}, {weatherData?.location?.country}</div>
        <div className='text-center flex flex-col gap-3 relative'>
            <p className="text-7xl font-black text-white">{weatherData?.current?.temp_c}<span className="text-2xl absolute top-1">°C</span></p>
            <p className='text-white'>{weatherData?.current?.condition.text}</p>
        </div>
        <div className='w-[60%] flex flex-col text-white font-light'>
            <div className='w-[100%] flex gap-4 items-center '>
                <div className="w-1/2 text-left">
                    <p><i className="fa fa-wind w-6"></i> Wind </p>
                </div>
                |
                <div className="w-1/2 text-right">
                    <p>{weatherData?.current?.wind_kph} kp/h </p>
                </div>
            </div>
            <div className='w-[100%] flex gap-4 items-center '>
                <div className="w-1/2 text-left">
                    <p><i className="fa fa-droplet w-6"></i> Humidity </p>
                </div>
                |
                <div className="w-1/2 text-right">
                    <p>{weatherData?.current?.humidity} % </p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default GetLocation;
