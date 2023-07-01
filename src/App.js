import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import FormSearch from './FormSearch';
import Forecast from './Forecast';
function App() {
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationpos, setLocationpos] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDay, setIsDay] = useState(true);

  const handleSearchButtonClick = () => {
    setSearchFieldOpen(true);
  };

  const handleCloseButtonClick = () => {
    setSearchFieldOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locPos = `${latitude}, ${longitude}`;
            setLocationpos(locPos); // Set the locationpos state
            const options = {
              method: 'GET',
              url: 'https://weatherapi-com.p.rapidapi.com/current.json',
              params: { q: locPos },
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
  
  useEffect(() => {
    const fetchTime = () => {
      const currentDate = new Date();
      setCurrentDate(currentDate);
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
      setIsDay(hours >= 6 && hours < 18);
    };
  
    fetchTime();
  
    const interval = setInterval(fetchTime, 1000 * 60); // Update the time every minute
  
    return () => clearInterval(interval);
  }, []);
  
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
        <div className='grid grid-cols-12 px-6 gap-4 animate__animated animate__fadeInUp'>
          <div className='col-span-12 md:col-span-6'>
            <GetLocation weatherData={weatherData} loading={loading} />
          </div>
          <div className='col-span-12 md:col-span-6'>
            <Forecast locationpos={locationpos} />
          </div>
        </div>
        <div className={`px-6 mt-4 w-full`}>
          <div className={`card rounded-md w-full md:w-[280px] ${isDay ? "sun" : "moon"} animate__animated animate__fadeInUp`} style={{animationDelay:'500ms'}}>
            <p className="time-text">
              <span>{currentTime}</span>
              <span className="time-sub-text">{currentTime.includes("PM") ? "PM" : "AM"}</span>
            </p>
            <p className="day-text">{currentDate.toLocaleString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</p>
           <div className="timeS"><i className={`fa fa-${isDay ? "sun" : "moon"}`}></i></div>
          </div>
        </div>
      </div>
    );
  }

  function GetLocation({ weatherData, loading }) {
    return (
      <div className='mainComponent w-[100%] animate__animated animate__fadeInUp flex flex-col mx-auto items-center gap-2 rounded-lg justify-center h-[300px] mt-6 md:w-full bg-blue-500'>
        {loading ? (
          <div className='w-full flex justify-center flex-col items-center'>
            <i className='fa-solid fa-circle-notch fa-spin text-2xl text-white'></i>
            <p className='text-white'>Please wait for a moment...</p>
          </div>
        ) : (
          <div>
            <div
              className='w-full text-center text-blue-100 animate__animated animate__fadeInUp'
              style={{
                animationDelay: '500ms',
              }}
            >
              <p className='text-4xl font-bold'>{weatherData?.location?.name}</p>
              {weatherData?.location?.region}, {weatherData?.location?.country}
            </div>
            <div className='text-center flex flex-col gap-3 relative'>
              <p
                className='text-7xl font-black text-white animate__animated animate__fadeInUp'
                style={{
                  animationDelay: '700ms',
                }}
              >
                {weatherData?.current?.temp_c}
                <span className='text-2xl absolute top-1'>°C</span>
              </p>
              <p
                className='text-white animate__animated animate__fadeInUp'
                style={{
                  animationDelay: '900ms',
                }}
              >
                {weatherData?.current?.condition.text}
              </p>
            </div>
            <br />
            <div className='w-[100%] md:w-full flex flex-col text-white font-light'>
              <div
                className='w-[100%] flex items-center animate__animated animate__fadeInUp'
                style={{
                  animationDelay: '1.1s',
                }}
              >
                <div className='w-full md:w-full text-left text-xs'>
                  <p className='w-full'>
                    <i className='fa fa-wind w-4'></i> Wind{' '}
                  </p>
                </div>
                |
                <div className='w-full md:w-full text-right text-xs'>
                  <p>{weatherData?.current?.wind_kph} kp/h </p>
                </div>
              </div>
              <div
                className='w-[100%] flex items-center animate__animated animate__fadeInUp'
                style={{
                  animationDelay: '1.3s',
                }}
              >
                <div className='w-full md:w-full text-left text-xs'>
                  <p className='w-full'>
                    <i className='fa fa-droplet w-4'></i> Humidity{' '}
                  </p>
                </div>
                |
                <div className='w-full md:w-full text-right text-xs'>
                  <p>{weatherData?.current?.humidity} % </p>
                </div>
                
              </div>
              
            </div>
            <br />
           
            
          </div>
        )}
  
        
      </div>
    );
  }
 
  
  export default App;