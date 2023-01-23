import React, { useState } from 'react'
import { Circle } from "@react-google-maps/api";

export function ConcentrationArea({position, concentration}) {
  
  
  const conToHexcon = (con) => {
    if (con <= 33) {
      let green = Math.round(con * 7.65).toString(16);
        if (green.length === 1) return '0' + green + 'FF'
      return green + 'FF'
    }
    else if (con <= 66) {
      con = con - 33
      let yellow = Math.round(255 - con * 7.65).toString(16);
        if (yellow.length === 1) return 'FF0' + yellow
      return 'FF' + yellow
    } 
    else if (con <= 100){
      return 'FF00'
    }
  } 

  return (
    <div>
      <Circle
        center={position}
        radius={25}
        options={{
          fillColor: `#${conToHexcon(concentration)}00`,
          fillOpacity: 1,
          strokeWeight: 1,
        }}
      />
    </div>
  );
}

