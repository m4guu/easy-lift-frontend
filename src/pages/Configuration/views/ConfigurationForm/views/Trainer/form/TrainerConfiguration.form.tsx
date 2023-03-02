import { Controller, useFormContext } from "react-hook-form";

import { MenuItem, Select, Box, Chip, TextField, List } from "@mui/material";
import { styled } from "@mui/system";

import { TrainerConfigFields } from "../../../../../../../hooks/formHooks/configuration/useTrainerConfigForm";
import { ControlledTextField } from "../../../../../../../features";
import ImagePicker from "../../../../../../../features/ImagePicker";
import { gyms } from "./constans";

// Name //
export const Name = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Name"
    type="text"
    fieldName={TrainerConfigFields.NAME}
    placeholder="Krystian, Paulina ..."
  />
))``;
//

// Description //
export const Description = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Description"
    multiline
    rows={10}
    type="text"
    fieldName={TrainerConfigFields.DESCRIPTION}
    placeholder="I'm passionate trainer ..."
  />
))``;
//

// Gyms //
export const Gyms: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name={TrainerConfigFields.GYMS}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          label="Gyms"
          size="small"
          variant="standard"
          multiple
          input={<TextField select variant="standard" label="Gyms" />}
          renderValue={(selected) => (
            <GymsListContainer>
              {selected.map((value: string) => {
                const isDefaultValue = value === "default";
                if (isDefaultValue) {
                  return <Box>Choose Yours Gyms</Box>;
                }
                return <Chip key={value} label={value} />;
              })}
            </GymsListContainer>
          )}
        >
          <MenuItem key="default" selected disabled value="default" />

          {gyms.map((gym) => {
            return (
              <MenuItem key={gym.id} value={gym.name}>
                {gym.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    />
  );
};
//

// Image //
export const Image = styled(() => (
  <ImagePicker fieldName={TrainerConfigFields.IMAGE} />
))``;
//

// Styles //
const GymsListContainer = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: 0,
}));
//
