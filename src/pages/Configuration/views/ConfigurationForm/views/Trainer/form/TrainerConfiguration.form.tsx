import { Controller, useFormContext } from "react-hook-form";

import { TextField, Checkbox, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";

import ImagePicker from "../../../../../../../features/ImagePicker";

import { Gym } from "../../../../../../../shared/interfaces";
import { TrainerConfigFields } from "../../../../../../../hooks/formHooks/configuration/useTrainerConfigForm";
import { ControlledTextField } from "../../../../../../../features";
import { gyms, icon, checkedIcon } from "./constans";
import {
  ImagePickerSize,
  ImagePickerType,
} from "../../../../../../../shared/enums";
import { useUserContext } from "../../../../../../../contexts/userContext";
import { API_URL } from "../../../../../../../config/env.config";

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
    rows={8}
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
        />
      )}
    />
  );
};
//

// Image //
export const Image = () => {
  const { user } = useUserContext();
  const initImagePreview =
    user && user.image ? `${API_URL}${user.image}` : undefined;
  return (
    <ImagePicker
      fieldName={TrainerConfigFields.IMAGE}
      type={ImagePickerType.CIRCLE}
      size={ImagePickerSize.LARGE}
      initImagePreview={initImagePreview}
    />
  );
};

//
