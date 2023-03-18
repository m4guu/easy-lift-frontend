import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Avatar, Button, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TaskIcon from "@mui/icons-material/Task";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";

import { ImagePickerSize, ImagePickerType } from "../../../shared/enums";
import { avatarPickerOptions, sizes } from "./constans";

interface DropzoneContentProps extends React.ComponentProps<typeof Box> {
  type: ImagePickerType;
  size: ImagePickerSize;
  fullWidth?: boolean;
}

interface DropzoneProps {
  changeImageField: (...event: any[]) => void;
  type: ImagePickerType;
  size: ImagePickerSize;
  fullWidth?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  changeImageField,
  type,
  size,
  fullWidth,
}) => {
  const [imagePreview, setImage] = useState<string>("");
  const isDragging = useIsDragging();
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
    if (isDragging && !imagePreview) {
      color = theme.palette.info.main;
    }
    if (isDragAccept) {
      color = theme.palette.success.main;
    } else if (isDragReject) {
      color = theme.palette.error.main;
    }
    return color;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragAccept, isDragReject, isDragging, imagePreview]);

  return (
    <DropzoneContainer {...getRootProps()}>
      <DropzoneContent
        sx={{ borderColor: { borderColor } }}
        fullWidth={fullWidth}
        type={type}
        size={size}
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <ImagePreview src={imagePreview} alt="preview" type={type} />
        ) : (
          <AddPhotoAlternateIcon color="primary" />
        )}
      </DropzoneContent>

      <Button onClick={open}>{imagePreview ? "change" : "pick"} image</Button>
    </DropzoneContainer>
  );
};

const DropzoneContainer = styled(Box)({
  textAlign: "center",
});

const DropzoneContent = styled(Box)<DropzoneContentProps>(
  ({ theme, type, size, fullWidth }) => {
    const { width = 0, height = 0 } =
      sizes.find(
        (sizeItem) => sizeItem.type === type && sizeItem.size === size
      ) || {};

    const widthValue = fullWidth ? "100%" : width;

    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing(1),
      width: widthValue,
      height,
      border: `solid 0.122rem`,
      borderStyle: "dashed",
      borderRadius: type === ImagePickerType.CIRCLE ? "55%" : 0,
    };
  }
);

const ImagePreview = styled("img")<{ type: ImagePickerType }>(({ type }) => ({
  width: "99%",
  height: "99%",
  objectFit: "cover",
  borderRadius: type === ImagePickerType.CIRCLE ? "55%" : 0,
}));
