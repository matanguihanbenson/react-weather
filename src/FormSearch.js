import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function FormSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/react-weather/check/${searchQuery}`);
    setSearchQuery('');
    setSuggest([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        setSuggest([]);
        return;
      }

      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: { q: searchQuery },
        headers: {
          'X-RapidAPI-Key': 'ef2f9f3508msh222e7bd07a8956fp1f91c7jsn27aa290318af',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setSuggest(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggest([]);
    }, 200);
  };

  const handleSuggestionClick = () => {
    setSearchQuery('');
    setSuggest([]);
    inputRef.current.focus();
  };

  return (
    <div className="flex justify-center w-[400px] flex-col items-center">
      <form onSubmit={handleSearch} className="flex w-[100%] flex-col relative">
        <div className='w-full flex items-center justify-center'>
          <input
            type="text"
            name="check"
            placeholder="Search for a location..."
            className="min-w-[60%] rounded-l-md w-[300px] h-14 outline-none indent-4 focus:outline-none bg-[#ebebeb]"
            value={searchQuery}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={inputRef} autoComplete='off'
            required
          />
          <button type="submit" className="bg-blue-500 rounded-r-md hover:bg-blue-700 text-white font-bold py-2 px-4 h-14 w-14">
            <i className="fa fa-search"></i>
          </button>
        </div>
        {suggest.length > 0 && (
          <div className="w-full bg-white suggestions absolute bottom-0 h-max top-14">
            {suggest.map((location) => (
              <Link to={`/react-weather/check/${location.name} ${location.region} ${location.country}`} onClick={handleSuggestionClick}>
                <p key={location.id} className='line-clamp-1 animate__animated animate__bounceIn h-10 py-2 px-3 border-b-[1px] w-[90%] mx-auto border-[#ccc]'>{location.name}, {location.region}, {location.country}</p>
              </Link>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default FormSearch;
