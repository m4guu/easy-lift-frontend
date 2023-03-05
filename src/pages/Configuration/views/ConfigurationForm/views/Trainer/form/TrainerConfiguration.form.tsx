import { Controller, useFormContext } from "react-hook-form";

import { TextField, Checkbox, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";

import { TrainerConfigFields } from "../../../../../../../hooks/formHooks/configuration/useTrainerConfigForm";
import { ControlledTextField } from "../../../../../../../features";
import ImagePicker from "../../../../../../../features/ImagePicker";
import { gyms, icon, checkedIcon } from "./constans";
import { Gym } from "../../../../../../../shared/interfaces";
import { GymTags } from "./views/GymTags/GymTags";

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
  selectedGyms: Gym[];
  gymsChangeHandler: (selectedGym: Gym) => void;
  removeGym: (gym: Gym) => void;
}
export const Gyms: React.FC<GymsProps> = ({
  selectedGyms,
  gymsChangeHandler,
  removeGym,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={TrainerConfigFields.GYMS}
      control={control}
      render={() => (
        <Autocomplete
          options={gyms}
          sx={{ width: "100%!important" }}
          getOptionLabel={(option) => option.name}
          groupBy={(option) => option.location.city}
          value={selectedGyms}
          onChange={(e, v, r, details) => {
            if (details) {
              gymsChangeHandler(details.option);
            }
          }}
          multiple
          disableClearable
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              size="small"
              label="Gyms"
              placeholder="Search gym..."
            />
          )}
          renderTags={(selectedValues) => {
            return (
              <GymTags selectedGyms={selectedValues} removeGym={removeGym} />
            );
          }}
        />
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
const AutoSelect = styled(Autocomplete)({
  width: "300px",
});
//
