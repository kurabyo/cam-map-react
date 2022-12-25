import { Marker } from "@react-google-maps/api";

export const DirectionMarker = ({position}) => {
    
    return (
      <Marker
        position={position}
      />
    );
}