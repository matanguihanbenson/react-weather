import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import FormSearch from './FormSearch';
import Footer from './Footer';

function App() {

  return (
    <div className="h-screen w-full flex-col flex items-center justify-center overflow-x-hidden overflow-y-hidden" style={{ background: 'url(https://cdn.wallpapersafari.com/93/77/rtZdDG.jpg)', backgroundSize: 'cover' }}>
      <div className="w-[400px] h-[300px] backdrop-blur-sm flex justify-center items-center flex-col gap-8">
        <h1 className='text-black bg-white py-2 px-6 text-3xl'>Weather App</h1>
        <FormSearch/>
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
