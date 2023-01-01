import { Marker } from "@react-google-maps/api";
import m from './DeviceMarker.module.css'
import React, { useState } from "react";



export const DeviceMarker = ({position, camName}) => {
  const [pickMarker, setMarkerPick] = useState(false);
  // Choose marker by rc
  let pickCamera = () => { 
      setMarkerPick(!pickMarker);
  }

  return (
    <Marker
      position={position}
      icon={{ url: "/devicemarker.svg", scaledSize: { width: 30, height: 30 }}}
      label={{className: pickMarker ? m.markeron : m.marker, text: camName}}
      onRightClick={pickCamera}
    />
  );
}