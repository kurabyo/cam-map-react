import React, { useRef, useState, useEffect, useCallback } from "react";
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import s from './Map.module.css'
import { DeviceMarker } from "../DeviceMarker";
import { DirectionMarker } from "../DirectionMarker";


const containerStyle = {
    width: '1000px',
    height: '600px'
};

const defaultOptions = {
  streetViewControl: false,
  KeyboardShortcuts: false,
  panControl: false,
  disableDoubleClickZoom: true,
};
  
const Map = ({center}) => {
  // Concentration stuff 
  const [concentration, setConcentration] = useState(0);
  const count = useRef(0)

    useEffect(() => {
      setInterval(() => {
        if (count.current > 100) count.current = 0
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.json())
        .then((data) => setConcentration(prev => data[count.current].id + Math.random()))
        .catch((err) => console.log(err));
        count.current++
      }, 250);
    }, []);

  // Markers stuff
    const [markersList, setMarkersList] = useState([]);
    const [camsCoordinates, setCamsCoordinates] = useState([
      { lat: 50.44714720363349, lng: 30.452590622531584 },
      { lat: 50.44757789474116, lng: 30.452964910951152 },
      { lat: 50.44674295691523, lng: 30.453867984211996 },
      { lat: 50.44742795916658, lng: 30.453964727138725 },
    ]);
    const camsNewCoordinates = useRef(camsCoordinates)
    const [selected, setSelected] = useState(null)

    // Direction stuff
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const [selectedOrigin, setSelectedOrigin] = useState(null)
    const [selectedDestination, setSelectedDestination] = useState(null)

    async function calculateRoute() {
      if(selectedOrigin === null || selectedDestination === null) 
      {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        // eslint-disable-next-line no-undef
        origin: new google.maps.LatLng(...selectedOrigin),
        // eslint-disable-next-line no-undef
        destination: new google.maps.LatLng(...selectedDestination),
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.WALKING
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')

      setSelectedDestination(null)
      setMarkersList([]);
    }
    
    // Adding Device Markers in array by coordinates
    const camsList = camsCoordinates.map((coordinate, indx) => (
      <DeviceMarker
        state={{ selected, setSelected, setSelectedOrigin }}
        key={indx.toString()}
        id={indx.toString()}
        position={coordinate}
        name={`Cam ${indx + 1}`}
        concentration={concentration}
      />
    ));

    // Adding Markers in array by click
    const addMarkerClick = (env) => {
      setMarkersList(
        markersList.concat(
          <DirectionMarker
            key={markersList.length}
            position={{ lat: env.latLng.lat(), lng: env.latLng.lng() }}
          />
        )
      );
      setSelectedDestination([env.latLng.lat(), env.latLng.lng()])
    }
    
    // Default code
    const mapRef = useRef(undefined)

    const onLoad = useCallback(function callback(map) {   
        mapRef.current = map
      }, [])
    
    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined
      }, []);

    return (
      <div className={s.container}>

        <button
          onClick={() => {
            setMarkersList([]);
            setSelectedDestination(null);
          }}
        >
          Clear Markers
        </button>

        {/* Direction stuff */}
        <button type="submit" onClick={calculateRoute}>
          Calculate Route
        </button>

        <button type="submit" onClick={clearRoute}>
          Clear Route
        </button>

        <button type="submit" onClick={() => console.log({distance, duration})}>
          Viev Console
        </button>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
          onClick={(env) => addMarkerClick(env)}
        >
          {/* Directions render */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {/* Device Markers render */}
          {camsList}

          {/* Direction Markers render */}
          {markersList}
        </GoogleMap>
      </div>
    );
}

export { Map }