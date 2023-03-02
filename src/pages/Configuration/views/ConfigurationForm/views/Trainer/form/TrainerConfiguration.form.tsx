import { Controller, useFormContext } from "react-hook-form";

import {
  MenuItem,
  Select,
  Chip,
  TextField,
  List,
  SelectChangeEvent,
} from "@mui/material";
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
interface GymsProps {
  selectedGyms: string[];
  gymsChangeHandler: (newSelectedGyms: string[], selectedGym: string) => void;
}
export const Gyms: React.FC<GymsProps> = ({
  selectedGyms,
  gymsChangeHandler,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={TrainerConfigFields.GYMS}
      control={control}
      render={({ field: { onChange } }) => (
        <Select
          label="Gyms"
          size="small"
          variant="standard"
          multiple
          input={<TextField select variant="standard" label="Gyms" />}
          value={selectedGyms}
          onChange={(event: SelectChangeEvent<string[]>) => {
            onChange(event.target.value);
            gymsChangeHandler(
              event.target.value as string[],
              event.target.name
            );
          }}
          renderValue={(selected) => (
            <GymsListContainer>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </GymsListContainer>
          )}
        >
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
