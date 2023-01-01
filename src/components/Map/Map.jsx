import React, { useRef, useState } from "react";
import { GoogleMap } from '@react-google-maps/api';
import s from './Map.module.css'
import { DeviceMarker } from "../DeviceMarker";
import { DirectionMarker } from "../DirectionMarker";

const containerStyle = {
    width: '1000px',
    height: '700px'
};

const defaultOptions = {
  streetViewControl: false,
  KeyboardShortcuts: false,
  panControl: false,
  disableDoubleClickZoom: true
};

// Коoрдинати камер
// const posi = [
//   { lat: 50.44714720363349, lng: 30.452590622531584 },
//   { lat: 50.44757789474116, lng: 30.452964910951152 },
//   { lat: 50.44674295691523, lng: 30.453867984211996 },
//   { lat: 50.44742795916658, lng: 30.453964727138725 },
// ];

  
const Map = ({center}) => {
    const [markerList, setMarkerList] = useState([]);
    // const [camsList, setCamsList] = useState( );
    const [posCoordCams, setPosCoordCams] = useState([
      { lat: 50.44714720363349, lng: 30.452590622531584 },
      { lat: 50.44757789474116, lng: 30.452964910951152 },
      { lat: 50.44674295691523, lng: 30.453867984211996 },
      { lat: 50.44742795916658, lng: 30.453964727138725 },
    ]);

    // Цикл який заповнює масив by DeviceMarkers
    const camsList = posCoordCams.map((item, indx) => <DeviceMarker key={indx.toString()} position={item} camName={`Cam ${indx+1}`} />)

    // Додавання маркера кліком по мапі 
    const addMarkerClick = (env) => {
      setMarkerList(markerList.concat(<DirectionMarker key={markerList.length} position={{lat: env.latLng.lat(), lng: env.latLng.lng()}}/>))
    }
    
    // Defaul code
    const mapRef = useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {   
        mapRef.current = map
      }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
      }, []);

    return (
      <div className={s.container}>

        <button onClick={() => setMarkerList([])} >CLEAR MARKERS</button>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
          onClick={(env) => addMarkerClick(env)}
        >
          


          {/* Рендер маркерів напрямку */}
          {markerList}

          {/* Рендер маркерів камер */}
          {camsList}          
        </GoogleMap>
        
      </div>
    );
}

export { Map }