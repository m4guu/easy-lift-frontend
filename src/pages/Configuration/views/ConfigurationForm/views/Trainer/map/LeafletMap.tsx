import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { styled } from "@mui/system";

export const LeafletMap: React.FC = () => {
  return (
    <Map center={[52.237049, 19.017532]} zoom={6.3}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>Example popup text.</Popup>
      </Marker>
    </Map>
  );
};

const Map = styled(MapContainer)({
  width: "50rem",
  height: "100%",
});
