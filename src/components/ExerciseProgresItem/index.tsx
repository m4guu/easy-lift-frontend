import React from "react";

import { Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  CustomListItem,
  ListItemContainer,
  ListItemHeader,
  SetsContainer,
  SetsContent,
  SetContent,
  SetTitle,
  SetsLabels,
  LabelTitle,
  UserAvatar,
} from "./ExerciseProgresItem.styles";

import { getHowMuchDaysUntill, getLongFormByDate } from "../../utils/Date";

import { UserProgres } from "../../shared/interfaces";
import userImage from "../../assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg";
import { labels } from "./constans";

type ExerciseProgresItemProps = {
  exerciseProgres: UserProgres;
};

const ExerciseProgresItem: React.FC<ExerciseProgresItemProps> = ({
  exerciseProgres,
}) => {
  const theme = useTheme();

  const longFormDate = getLongFormByDate(exerciseProgres.date);
  const daysAgo = getHowMuchDaysUntill(exerciseProgres.date);

  return (
    <CustomListItem>
      <UserAvatar variant="square" src={userImage} alt="user" />

      <ListItemContainer>
        <ListItemHeader>
          <Typography variant="h3" color={theme.palette.custom_grey.tint_1}>
            {longFormDate}
          </Typography>
          <Typography variant="h3" color={theme.palette.custom_grey.tint_1}>
            {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
          </Typography>
        </ListItemHeader>

        <SetsContainer>
          <SetsLabels>
            {labels.map((label, i, arr) => {
              if (i + 1 === arr.length) {
                return (
                  <LabelTitle
                    key={label.name}
                    variant="h3"
                    color={theme.palette.custom_grey.tint_2}
                    sx={{ textAlign: "right" }}
                  >
                    {label.name}
                  </LabelTitle>
                );
              }
              return (
                <LabelTitle
                  key={label.name}
                  variant="h3"
                  color={theme.palette.custom_grey.tint_2}
                >
                  {label.name}
                </LabelTitle>
              );
            })}
          </SetsLabels>

          <Divider />

          <SetsContent>
            {exerciseProgres.sets.map((set, index) => {
              return (
                <SetContent>
                  <SetTitle variant="subtitle1" color="primary">
                    {index + 1}
                  </SetTitle>
                  <SetTitle variant="subtitle1">{set.weight}</SetTitle>
                  <SetTitle variant="subtitle1">{set.reps}</SetTitle>
                  <SetTitle
                    variant="h3"
                    color={theme.palette.custom_grey.tint_1}
                  >
                    {set.tempo}
                  </SetTitle>
                  <SetTitle
                    variant={
                      set.repMax === exerciseProgres.repMax ? "subtitle1" : "h3"
                    }
                    color={
                      set.repMax === exerciseProgres.repMax
                        ? "primary"
                        : theme.palette.custom_grey.tint_1
                    }
                    sx={{ textAlign: "right" }}
                  >
                    {set.repMax}
                  </SetTitle>
                </SetContent>
              );
            })}
          </SetsContent>
        </SetsContainer>
      </ListItemContainer>
    </CustomListItem>
  );
};

export default ExerciseProgresItem;
