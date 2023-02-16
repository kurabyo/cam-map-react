import { Marker, Polyline } from "@react-google-maps/api";
import m from './DeviceMarker.module.css'
import React, { useState } from "react";
import { ConcentrationArea } from "../ConcentrationArea";



export const DeviceMarker = ({position, name, state, id, concentration, conbool, polybool}) => {
  const [pickState, setPickState] = useState(false)
  const [polyPath, setPolyPath] = useState([])
  

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
        onPositionChanged={() => {
          if (state.selected) {
            state.setSelectedOrigin(Object.values(position));
            state.calculateRoute();
          }
          setPolyPath(prev => [...prev, position])
        }}
      />
      {conbool && (
        <ConcentrationArea position={position} concentration={concentration} />
      )}
      {polybool && <Polyline path={polyPath} />}
    </>
  );
  
}