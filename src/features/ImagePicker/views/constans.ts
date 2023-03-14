import { ImagePickerType, ImagePickerSize } from "../../../shared/enums";

export const avatarPickerOptions = {
  accept: {
    "image/*": [".png", ".jpeg", ".jpg"],
  },
  maxFiles: 1,
  maxSize: 200000,
  noClick: true,
};

export const sizes = [
  {
    type: ImagePickerType.CIRCLE,
    size: ImagePickerSize.SMALL,
    width: "6.1rem",
    height: "6.1rem",
  },
  {
    type: ImagePickerType.CIRCLE,
    size: ImagePickerSize.MEDIUM,
    width: "7.1rem",
    height: "7.1rem",
  },
  {
    type: ImagePickerType.CIRCLE,
    size: ImagePickerSize.LARGE,
    width: "10.1rem",
    height: "10.1rem",
  },
  {
    type: ImagePickerType.SQUARE,
    size: ImagePickerSize.SMALL,
    width: "10rem",
    height: "10rem",
  },
  {
    type: ImagePickerType.SQUARE,
    size: ImagePickerSize.MEDIUM,
    width: "15rem",
    height: "15rem",
  },
  {
    type: ImagePickerType.SQUARE,
    size: ImagePickerSize.LARGE,
    width: "20rem",
    height: "20rem",
  },
];
