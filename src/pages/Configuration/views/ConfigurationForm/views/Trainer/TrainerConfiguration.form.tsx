import { Controller, useFormContext } from "react-hook-form";

import { MenuItem, Select, Box, Chip } from "@mui/material";
import { styled } from "@mui/system";

import { TrainerConfigFields } from "../../../../../../hooks/formHooks/configuration/useTrainerConfigForm";
import { ControlledTextField } from "../../../../../../features";
import ImagePicker from "../../../../../../features/ImagePicker";
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
          size="small"
          variant="standard"
          multiple
          renderValue={(selected) => (
            <Box>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {gyms.map((gym) => {
            // ? question: can i pass object to menuItem value ?
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
