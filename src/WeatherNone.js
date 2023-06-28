import React from 'react'
import image from './res/undraw_search_engines_ij7q.svg';
import { Link } from 'react-router-dom';
import FormSearch from './FormSearch';
function WeatherNone() {
  return (
    <div className='flex flex-col justify-center items-center h-screen overflow-hidden gap-8'>
        <FormSearch/>
        <div className='w-[300px]'><img src={image} alt="" className='w-[70%]' /></div>
        <p>You searched for nothing.</p>
        <p className="text-xl bg-slate-600 p-2 text-white">
              <Link to="/react-weather">Go back</Link>
          </p>
    </div>
  )
}

export default WeatherNone;