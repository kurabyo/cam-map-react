import { Map } from './components/Map';
import { Camera } from './components/Camera/Camera';
import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

import './App.css';
const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 50.44742795916658, 
  lng: 30.453964727138725,
};


const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  })


  return (
    <div className="App">
      {isLoaded ? <Map center={defaultCenter}/> : <h2>Loading...</h2>}
      
      <Camera/>
      <Camera/>
      <Camera/>
    </div>
  );
}

export default App;
