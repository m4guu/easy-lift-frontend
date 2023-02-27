import { v4 as uuidv4 } from "uuid";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const socials = [
  {
    id: uuidv4(),
    name: "facebook",
    link: "https://www.facebook.com/",
    icon: <FacebookIcon sx={{ color: "#4267B2" }} />,
  },
  {
    id: uuidv4(),
    name: "instagram",
    link: "https://www.instagram.com/",
    icon: <InstagramIcon sx={{ color: "#E1306C" }} />,
  },
  {
    id: uuidv4(),
    name: "linkedin",
    link: "https://www.linkedin.com/in/krystian-dom%C5%BCa%C5%82owicz-7a1905242/",
    icon: <LinkedInIcon sx={{ color: "#0e76a8" }} />,
  },
];
