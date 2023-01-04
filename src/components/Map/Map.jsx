import React from "react";
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
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
  
const Map = ({center}) => {
    const [markersList, setMarkersList] = React.useState([]);
    const [camsCoordinates, setCamsCoordinates] = React.useState([
      { lat: 50.44714720363349, lng: 30.452590622531584 },
      { lat: 50.44757789474116, lng: 30.452964910951152 },
      { lat: 50.44674295691523, lng: 30.453867984211996 },
      { lat: 50.44742795916658, lng: 30.453964727138725 },
    ]);
    const [selected, setSelected] = React.useState(null)
   
    
    // Цикл який заповнює масив by DeviceMarkers
    const camsList = camsCoordinates.map((item, indx) => <DeviceMarker state={{selected, setSelected}} key={indx.toString()} id={indx.toString()} position={item} name={`Cam ${indx+1}`} />)

    // Додавання маркера кліком по мапі 
    const addMarkerClick = (env) => {
      setMarkersList(markersList.concat(<DirectionMarker key={markersList.length} position={{lat: env.latLng.lat(), lng: env.latLng.lng()}}/>))
    }
    
    // Default code
    const mapRef = React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {   
        mapRef.current = map
      }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
      }, []);

    return (
      <div className={s.container}>

        <button onClick={() => setMarkersList([])} >CLEAR MARKERS</button>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
          onClick={(env) => addMarkerClick(env)}
        >

          {/* Рендер маркерів камер */}
          {camsList}

          {/* Рендер маркерів напрямку */}
          {markersList}          
        </GoogleMap>
      </div>
    );
}

export { Map }