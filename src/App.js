import { Map } from './components/Map';
import { Camera } from './components/Camera/Camera';
import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api'
import './App.css';
import { FunctionGraph } from './components/FunctionGraph';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 50.692096,
  lng: 29.6288256,
};

const libraries = ['places', 'drawing']

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: libraries
  })


  return (
    <div className="App">
      {isLoaded ? <Map className='map' center={defaultCenter} /> : <h2>Loading...</h2>}
      <FunctionGraph />
      <Camera video={'https://192.168.31.145:8080/video'} />
    </div>
  );
}

export default App;
