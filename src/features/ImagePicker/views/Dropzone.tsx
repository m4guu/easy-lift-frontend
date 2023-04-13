import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Button, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { useIsDragging } from "../../../hooks";

import { DragInfo } from "./views/DragInfo";
import { ImagePickerSize, ImagePickerType } from "../../../shared/enums";
import { avatarPickerOptions, sizes } from "./constans";

interface DropzoneContentProps extends React.ComponentProps<typeof Box> {
  type: ImagePickerType;
  size: ImagePickerSize;
  fullwidth?: string;
}

interface DropzoneProps {
  changeImageField: (...event: any[]) => void;
  type: ImagePickerType;
  size: ImagePickerSize;
  fullwidth?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  changeImageField,
  type,
  size,
  fullwidth,
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
        fullwidth={fullwidth?.toString()}
        type={type}
        size={size}
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <ImagePreview src={imagePreview} alt="preview" type={type} />
        ) : (
          <Box>
            {isDragging ? (
              <Box>
                {(isDragAccept || isDragReject) && !imagePreview ? (
                  <DragInfo
                    isDragAccept={isDragAccept}
                    isDragReject={isDragReject}
                  />
                ) : (
                  <DragContainer>
                    <CloudDownloadIcon color="info" />
                    <DragTitle variant="caption" color="info">
                      Drag file here
                    </DragTitle>
                  </DragContainer>
                )}
              </Box>
            ) : (
              <AddPhotoAlternateIcon color="primary" />
            )}
          </Box>
        )}
      </DropzoneContent>

      <Button onClick={open}>{imagePreview ? "change" : "pick"} image</Button>
    </DropzoneContainer>
  );
};

const DropzoneContainer = styled(Box)({
  textAlign: "center",
});

const DragContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const DragTitle = styled(Typography)({
  fontSize: "0.9rem",
});

const DropzoneContent = styled(Box)<DropzoneContentProps>(
  ({ theme, type, size, fullwidth }) => {
    const { width = 0, height = 0 } =
      sizes.find(
        (sizeItem) => sizeItem.type === type && sizeItem.size === size
      ) || {};

    const widthValue = fullwidth ? "100%" : width;

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
