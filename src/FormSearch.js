import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function FormSearch() {  
  const [searchQuery, setSearchQuery] = useState('');
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();
  navigate(`/check/${searchQuery}`);
};

const handleChange = (e) => {
  setSearchQuery(e.target.value);
};

  return (
    <div className='flex justify-center w-[400px]'>
        <form onSubmit={handleSearch} className='flex w-[80%] border-[1px] border-black'>
          <input
            type="text"
            name="check"
            placeholder="Search for a location..."
            className="min-w-[60%] w-[300px] h-10 outline-none indent-4 focus:outline-none"
            value={searchQuery}
            onChange={handleChange}
          required/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            Search
          </button>
        </form>
    </div>
  )
}

export default FormSearch;