import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormSearch from './FormSearch';
import GetLocation from './GetLocation';

function App() {
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  const handleSearchButtonClick = () => {
    setSearchFieldOpen(true);
  };

  const handleCloseButtonClick = () => {
    setSearchFieldOpen(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className='w-full'>
      <header className='w-full h-10 flex justify-between p-6'>
        <div>
          <p className="text-xl">
            <Link to="/react-weather">WeatherApp</Link>
          </p>
        </div>
        <div>
          <button className='searchBtn' onClick={handleSearchButtonClick}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        {isSearchFieldOpen && (
          <div className='searchField absolute w-full bg-white z-[9999] h-full inset-0 flex justify-center animate__animated animate__zoomInDown'>
            <button
              className='h-10 w-10 rounded-full shadow-md shadow-[#999] bg-white m-6 absolute top-0 right-0'
              onClick={handleCloseButtonClick}
            >
              <i className="fa fa-close text-[#222]"></i>
            </button>
            <div className='w-[80%] h-20 flex items-center justify-center mt-20'>
              <FormSearch />
            </div>
          </div>
        )}
      </header>
      <div>
        <GetLocation locationpos={userLocation} />
      </div>
    </div>
  );
}

export default App;
