import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Avatar, Button, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TaskIcon from "@mui/icons-material/Task";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";

import { avatarPickerOptions } from "./constans";
import { useIsDragging } from "../../../hooks";

type DropzoneProps = {
  changeImageField: (...event: any[]) => void;
};

export const Dropzone: React.FC<DropzoneProps> = ({ changeImageField }) => {
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
      <DropzoneContent sx={{ borderColor: { borderColor } }}>
        <input {...getInputProps()} />
        {imagePreview ? (
          <PreviewAvatar src={imagePreview} alt="avatar" />
        ) : (
          <Box>
            {isDragging ? (
              <DragContainer>
                <CloudDownloadIcon color="info" />
                <DragTitle variant="caption" color="info">
                  Drag file here
                </DragTitle>
              </DragContainer>
            ) : (
              <AddPhotoAlternateIcon color="primary" />
            )}
          </Box>
        )}
      </DropzoneContent>

      {isDragAccept && !imagePreview && (
        <DragInfoContainer>
          <TaskIcon color="success" />
          <DragInfoTitle color="success.main" variant="caption">
            File Accepted
          </DragInfoTitle>
        </DragInfoContainer>
      )}
      {isDragReject && !imagePreview && (
        <DragInfoContainer>
          <SimCardAlertIcon color="error" />
          <DragInfoTitle color="error" variant="caption">
            Wrong file extension,
          </DragInfoTitle>
        </DragInfoContainer>
      )}
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
  width: "10.1rem",
  height: "10.1rem",
  border: `solid 0.122rem`,
  borderStyle: "dashed",
  borderRadius: "55%",
}));

const PreviewAvatar = styled(Avatar)({
  width: "9.8rem",
  height: "9.8rem",
});

const DragContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const DragTitle = styled(Typography)({
  fontSize: "0.9rem",
});

const DragInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  gap: theme.spacing(1),
}));

const DragInfoTitle = styled(Typography)({
  fontSize: "0.9rem",
});
