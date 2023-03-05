import L from "leaflet";
import { keyframes } from "@mui/system";

export const latLngPositions = {
  warsaw: { x: 52.237049, y: 19.017532 },
  gdansk: { x: 54.35162650773143, y: 18.647367544363945 },
};

export const defaultMarkerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const greenMarkerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const jumpAnimation = keyframes`
from {
  transform: translateY(0);
  opacity: 0;
}

to {
  transform: translateY(-50%);
  opacity: 1;
}
`;
