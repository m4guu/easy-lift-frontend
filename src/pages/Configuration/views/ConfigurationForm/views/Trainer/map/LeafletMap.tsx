import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Box, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";

import { Gym } from "../../../../../../../shared/interfaces";
import {
  latLngPositions,
  defaultMarkerIcon,
  greenMarkerIcon,
} from "./constans";
import { gyms } from "../form/constans";

interface LeafletMapProps {
  selectedGyms: Gym[];
  gymsChangeHandler: (selectedGym: Gym) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  selectedGyms,
  gymsChangeHandler,
}) => {
  return (
    <Map
      center={[latLngPositions.warsaw.x, latLngPositions.warsaw.y]}
      zoom={5.5}
    >
      <TileLayer url={import.meta.env.VITE_MAP_BOX_URL} />

      <MarkerClusterGroup>
        {gyms.map((gym) => {
          const isSelected = !!selectedGyms.filter(
            (selectedGym) => selectedGym.id === gym.id
          ).length;

          return (
            <Marker
              position={[gym.location.position.x, gym.location.position.y]}
              key={gym.id}
              icon={isSelected ? greenMarkerIcon : defaultMarkerIcon}
              riseOnHover
            >
              <Popup>
                <Typography>{gym.name}</Typography>
                <GymImage src={gym.image} alt="gym" />
                <Chip
                  variant="filled"
                  color="primary"
                  label={<Typography>{gym.location.adres}</Typography>}
                />
                <GymActions>
                  <AddGym
                    onClick={() => gymsChangeHandler(gym)}
                    color={isSelected ? "error" : "primary"}
                    variant="contained"
                    fullWidth
                  >
                    {isSelected ? "remove" : "add"}
                  </AddGym>
                </GymActions>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </Map>
  );
};

const Map = styled(MapContainer)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.down("lg")]: {
    height: "25rem",
  },
}));

const GymImage = styled("img")({
  width: "100%",
  height: "8rem",
  objectFit: "cover",
});

const GymActions = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const AddGym = styled(Button)({});
