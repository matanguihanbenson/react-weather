import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import FormSearch from './FormSearch';
import Footer from './Footer';

function App() {

  return (
    <div className="h-screen w-full flex-col flex items-center justify-center" style={{ background: 'url(https://cdn.wallpapersafari.com/93/77/rtZdDG.jpg)', backgroundSize: 'cover' }}>
      <div className="w-[400px] h-[300px] backdrop-blur-sm flex justify-center items-center">
        <FormSearch/>
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
