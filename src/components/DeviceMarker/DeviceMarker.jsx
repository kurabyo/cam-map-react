import { Marker } from "@react-google-maps/api";
import m from './DeviceMarker.module.css'

export const DeviceMarker = ({position, camName}) => {
  return (
    <Marker
      position={position}
      icon={{ url: "/devicemarker.svg", scaledSize: { width: 30, height: 30 }}}
      label={{className: m.marker, text: camName}}
    />
  );
}