import React from "react";

import { List, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { Gym } from "../../../../../../../../../shared/interfaces";
import { GymTag } from "../../../../../../../../../components";

interface GymTagsProps {
  selectedGyms: Gym[];
  removeGym: (gym: Gym) => void;
}

export const GymTags: React.FC<GymTagsProps> = ({
  selectedGyms,
  removeGym,
}) => {
  return (
    <TagsList disablePadding>
      {selectedGyms.map((gym) => {
        return (
          <>
            <Divider />
            <GymTag key={gym.id} gym={gym} removeGym={removeGym} />
            <Divider />
          </>
        );
      })}
    </TagsList>
  );
};

const TagsList = styled(List)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: 40,
  [theme.breakpoints.down("lg")]: {
    position: "sticky",
    marginBottom: theme.spacing(1),
  },
}));
