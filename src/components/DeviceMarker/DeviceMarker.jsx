import { Marker } from "@react-google-maps/api";
import m from './DeviceMarker.module.css'
import React, { useState } from "react";
import { ConcentrationArea } from "../ConcentrationArea";



export const DeviceMarker = ({position, name, state, id, concentration}) => {
  const [pickState, setPickState] = useState(false)
  

  return (
    <>
      <Marker
        position={position}
        icon={{
          url: "/devicemarker.svg",
          scaledSize: { width: 30, height: 30 },
        }}
        label={{ className: pickState ? m.markeron : m.marker, text: name }}
        onRightClick={() => {
          if (!state.selected) {
            setPickState(true);
            state.setSelected(id);
            state.setSelectedOrigin(Object.values(position));
          } else if (state.selected === id) {
            setPickState(false);
            state.setSelected(null);
            state.setSelectedOrigin(null);
          }
        }}
      />
      <ConcentrationArea 
        position={position}
        concentration={concentration} 
      />
    </>
  );
  
}