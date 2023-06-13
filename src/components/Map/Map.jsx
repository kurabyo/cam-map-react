import React, { useRef, useState, useEffect, useCallback } from "react";
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import s from './Map.module.css'
import { DeviceMarker } from "../DeviceMarker";
import { DirectionMarker } from "../DirectionMarker";
import axios from "axios";

const containerStyle = {
  width: "75vw",
  height: "680px",
};

const defaultOptions = {
  streetViewControl: false,
  KeyboardShortcuts: false,
  panControl: false,
  disableDoubleClickZoom: true,
};
  
const Map = ({center}) => {
  
  useEffect(() => {
    setInterval(() => {
      if (count.current > 100) count.current = 0
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setConcentration(data[count.current].id + Math.random()))
      .catch((err) => console.log(err));
      count.current++
    }, 250);

    setInterval(() => {     
      axios.get('http://localhost:4000/').then((res) => {
        setCamsCoordinates([{lat: res.data.lat, lng: res.data.lng}])
      })
    }, 1000)
  }, []);


  // Concentration stuff 
  const [concentration, setConcentration] = useState(0);
  const [conBool, setConBool] = useState(false);
  const [polyBool, setPolyBool] = useState(false);

  const count = useRef(0)

    const handleConBoolChange = () => {
      setConBool(prev => !prev)
    }

    const handlePolyBoolChange = () => {
      setPolyBool(prev => !prev)
    }

  // Markers stuff
    const [selected, setSelected] = useState(null)
    const [markersList, setMarkersList] = useState([]);
    const [camsCoordinates, setCamsCoordinates] = useState([{lat: 51.34535,lng:51.225243}]);

    

    
    // Markers dynamic stuff

    // const dynamicTest = () => {
    //   setCamsCoordinates(prev => prev.map(e => {return {lat: e.lat, lng: e.lng + 0.000005}}))
    // }
    


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
        state={{ selected, setSelected, setSelectedOrigin, calculateRoute }}
        key={indx.toString()}
        id={indx.toString()}
        position={coordinate}
        name={`Actor ${indx + 1}`}
        concentration={concentration}
        conbool={conBool}
        polybool={polyBool}
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
        <button onClick={calculateRoute}>Calculate Route</button>

        <button onClick={clearRoute}>Clear Route</button>

        <button onClick={() => console.log({ distance, duration })}>
          Viev Console
        </button>

        <button onClick={handleConBoolChange}>Viev Concentration</button>

        <button onClick={handlePolyBoolChange}>Viev Trajectory</button>

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
            <DirectionsRenderer
              options={{ preserveViewport: true, suppressMarkers: true }}
              directions={directionsResponse}
            />
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