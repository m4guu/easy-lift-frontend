import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Avatar, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { avatarPickerOptions } from "./constans";

type DropzoneProps = {
  changeImageField: (...event: any[]) => void;
};

export const Dropzone: React.FC<DropzoneProps> = ({ changeImageField }) => {
  const [imagePreview, setImage] = useState<string>("");
  const theme = useTheme();

  const onDrop = <T extends File>(acceptedFiles: T[]) => {
    // change image field from react hook form
    changeImageField(acceptedFiles);
    // generate image preview
    const reader = new FileReader();
    if (acceptedFiles?.length !== 0) {
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        const { result } = reader;
        if (typeof result === "string") {
          setImage(result);
        } else {
          setImage("");
        }
      };
    }
  };

  const { isDragAccept, isDragReject, open, getRootProps, getInputProps } =
    useDropzone({
      ...avatarPickerOptions,
      onDrop,
    });

  const borderColor = useMemo(() => {
    let color = theme.palette.primary.main;
    if (isDragAccept) {
      color = theme.palette.success.main;
    } else if (isDragReject) {
      color = theme.palette.error.main;
    }
    return color;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragAccept, isDragReject]);

  return (
    <DropzoneContainer {...getRootProps()}>
      <DropzoneContent sx={{ borderColor: { borderColor } }}>
        <input {...getInputProps()} />
        {imagePreview ? (
          <PreviewAvatar src={imagePreview} alt="avatar" />
        ) : (
          <AddPhotoAlternateIcon color="primary" />
        )}
      </DropzoneContent>

      <Button onClick={open}>{imagePreview ? "change" : "pick"} avatar</Button>
    </DropzoneContainer>
  );
};

const DropzoneContainer = styled(Box)({});

const DropzoneContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: theme.spacing(1),
  width: "7.1rem",
  height: "7.1rem",
  border: `solid 0.122rem`,
  borderStyle: "dashed",
  borderRadius: "55%",
}));
const PreviewAvatar = styled(Avatar)({
  width: "6.8rem",
  height: "6.8rem",
});
