import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Box, Input, InputLabel, Typography, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface ImagePickerProps {
  fieldName: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ fieldName }) => {
  const [imagePreview, setImage] = useState<FileReader["result"]>("");
  const { control } = useFormContext();
  const theme = useTheme();

  const generatePreview = (files: FileList | null) => {
    const reader = new FileReader();

    if (files?.length === 1) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  return (
    <Box>
      <Typography variant="caption" color={theme.palette.text.secondary}>
        Image
      </Typography>
      <ImageInputLabel htmlFor="image-picker">
        {imagePreview ? (
          <PreviewAvatar src={imagePreview} alt="logo" />
        ) : (
          <AddPhotoAlternateIcon color="primary" />
        )}
      </ImageInputLabel>

      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          // todo: add input image validation: types and size?
          <ImageInput
            id="image-picker"
            type="file"
            onChange={(e) => {
              const { files } = e.target as HTMLInputElement;

              field.onChange(files);
              generatePreview(files);
            }}
          />
        )}
      />
    </Box>
  );
};

const ImageInputLabel = styled(InputLabel)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
  width: "7.1rem",
  height: "7.1rem",
  border: `solid 0.1rem ${theme.palette.primary.main}`,
  borderRadius: "0.5rem",
  cursor: "pointer",
}));

const PreviewAvatar = styled(Avatar)({
  width: "7rem",
  height: "7rem",
});

const ImageInput = styled(Input)({
  display: "none",
});

export default ImagePicker;
