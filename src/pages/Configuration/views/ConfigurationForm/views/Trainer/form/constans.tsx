import { v4 as uuidv4 } from "uuid";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Gym } from "../../../../../../../shared/interfaces";

export const gyms: Gym[] = [
  {
    id: uuidv4(),
    name: "Calypsoo Morena",
    image:
      "https://www.calypso.com.pl/wp-content/uploads/2018/02/gdansk-morena-strefa-cross-training-strefa-cardio.jpg",
    location: {
      city: "Gdańsk",
      adres: "Schuberta 102A",
      position: { x: 54.35277223306306, y: 18.59399427116378 },
    },
  },
  {
    id: uuidv4(),
    name: "Husarz Gym",
    image:
      "https://cdn-az.allevents.in/events9/banners/da1a39df5e25c7ba1ab041739c6bc921b1453f843eb22cc14c9853aa39a5e317-rimg-w526-h526-gmir?v=1594452407",
    location: {
      city: "Gdańsk",
      adres: "Trakt świętego Wojciecha 243",
      position: { x: 54.31270505655438, y: 18.629902769627535 },
    },
  },

  {
    id: uuidv4(),
    name: "Random Gym #1",
    image:
      "https://www.calypso.com.pl/wp-content/uploads/2018/02/gdansk-morena-strefa-cross-training-strefa-cardio.jpg",
    location: {
      city: "Warsaw",
      adres: "Schuberta 102A",
      position: { x: 52.43777387235252, y: 21.0096956871598 },
    },
  },

  {
    id: uuidv4(),
    name: "Random Gym #2",
    image:
      "https://cdn-az.allevents.in/events9/banners/da1a39df5e25c7ba1ab041739c6bc921b1453f843eb22cc14c9853aa39a5e317-rimg-w526-h526-gmir?v=1594452407",
    location: {
      city: "Warsaw",
      adres: "Trakt świętego Wojciecha 243",
      position: { x: 52.23777387235252, y: 21.3096956871598 },
    },
  },
  {
    id: uuidv4(),
    name: "Random Gym #3",
    image:
      "https://cityfit.pl/wp-content/uploads/2019/08/WC-700x740-4-700x440.jpg",
    location: {
      city: "Warsaw",
      adres: "Targ Węglowy 7",
      position: { x: 52.83777387235252, y: 21.0096956871598 },
    },
  },
];

export const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
export const checkedIcon = <CheckBoxIcon fontSize="small" />;
