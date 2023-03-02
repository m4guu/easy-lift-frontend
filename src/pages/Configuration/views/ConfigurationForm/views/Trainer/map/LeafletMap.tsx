import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Box, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";

import { latLngPositions } from "./constans";
import { gyms } from "../form/constans";

interface LeafletMapProps {
  selectedGyms: string[];
  gymsChangeHandler: (newSelectedGyms: string[], selectedGym: string) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  selectedGyms,
  gymsChangeHandler,
}) => {
  return (
    <Map
      center={[latLngPositions.gdansk.x, latLngPositions.gdansk.y]}
      zoom={12}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {gyms.map((gym) => {
        const isSelected = selectedGyms.filter(
          (selectedGym) => selectedGym === gym.name
        );

        return (
          <Marker position={[gym.location.position.x, gym.location.position.y]}>
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
                  onClick={() =>
                    gymsChangeHandler([...selectedGyms, gym.name], gym.name)
                  }
                  color={isSelected.length === 0 ? "primary" : "error"}
                  variant="contained"
                  fullWidth
                >
                  {isSelected.length === 0 ? "add" : "remove"}
                </AddGym>
              </GymActions>
            </Popup>
          </Marker>
        );
      })}
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
