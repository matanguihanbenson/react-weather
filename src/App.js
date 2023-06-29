import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormSearch from './FormSearch';
import imageLoading from './res/34338d26023e5515f6cc8969aa027bca_w200.gif';
function GetLocation() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locationpos = `${latitude}, ${longitude}`;
            const options = {
              method: 'GET',
              url: 'https://weatherapi-com.p.rapidapi.com/current.json',
              params: { q: locationpos },
              headers: {
                'X-RapidAPI-Key': 'ef2f9f3508msh222e7bd07a8956fp1f91c7jsn27aa290318af',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
              },
            };

            axios
              .request(options)
              .then((response) => {
                console.log(response.data);
                setWeatherData(response.data);
              })
              .catch((error) => {
                console.error(error);
                setWeatherData(null);
              })
              .finally(() => {
                setLoading(false);
              });
          },
          (error) => {
            console.error('Error getting user location:', error);
            setLoading(false);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mainComponent w-[80%] flex flex-col mx-auto items-center gap-2 rounded-lg justify-center h-[300px] mt-6 bg-blue-500'>
      {loading ? (
        <div className='w-full flex justify-center flex-col items-center'>
          <img
          className="h-[40px]"
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
          alt=""
        />
          <p>Please wait for a moment...</p>
        </div>
      ) : (
        <>
          <div className='w-full text-center text-blue-100'>
            <p className='text-4xl font-bold'>
              {weatherData?.location?.name}
            </p>
            {weatherData?.location?.region}, {weatherData?.location?.country}
          </div>
          <div className='text-center flex flex-col gap-3 relative'>
            <p className='text-7xl font-black text-white'>
              {weatherData?.current?.temp_c}
              <span className='text-2xl absolute top-1'>°C</span>
            </p>
            <p className='text-white'>{weatherData?.current?.condition.text}</p>
          </div>
          <div className='w-[60%] flex flex-col text-white font-light'>
            <div className='w-[100%] flex items-center '>
              <div className='w-1/2 text-left text-xs'>
                <p className='w-full'>
                  <i className='fa fa-wind w-4'></i> Wind{' '}
                </p>
              </div>
              |
              <div className='w-1/2 text-right text-xs'>
                <p>{weatherData?.current?.wind_kph} kp/h </p>
              </div>
            </div>
            <div className='w-[100%] flex items-center '>
              <div className='w-1/2 text-left text-xs'>
                <p className='w-full'>
                  <i className='fa fa-droplet w-4'></i> Humidity{' '}
                </p>
              </div>
              |
              <div className='w-1/2 text-right text-xs'>
                <p>{weatherData?.current?.humidity} % </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false);

  const handleSearchButtonClick = () => {
    setSearchFieldOpen(true);
  };

  const handleCloseButtonClick = () => {
    setSearchFieldOpen(false);
  };

  return (
    <div className='w-full'>
      <header className='w-full h-10 flex justify-between p-6'>
        <div>
          <p className='text-xl'>
            <Link to='/react-weather'>WeatherApp</Link>
          </p>
        </div>
        <div>
          <button className='searchBtn' onClick={handleSearchButtonClick}>
            <i className='fa fa-search'></i>
          </button>
        </div>
        {isSearchFieldOpen && (
          <div className='searchField absolute w-full bg-white z-[9999] h-full inset-0 flex justify-center animate__animated animate__zoomInDown'>
            <button
              className='h-10 w-10 rounded-full shadow-md shadow-[#999] bg-white m-6 absolute top-0 right-0'
              onClick={handleCloseButtonClick}
            >
              <i className='fa fa-close text-[#222]'></i>
            </button>
            <div className='w-[80%] h-20 flex items-center justify-center mt-20'>
              <FormSearch />
            </div>
          </div>
        )}
      </header>
      <div>
        <GetLocation />
      </div>
    </div>
  );
}

export default App;
