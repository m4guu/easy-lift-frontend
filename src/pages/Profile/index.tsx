import React from "react";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

import { useUserContext } from "../../contexts/userContext";

import { SectionContainer, SectionHeader } from "../../components";

import { Role } from "../../shared/enums";
import { API_URL } from "../../config/env.config";
import { UserInformation } from "./views/UserInformation/UserInformation";

const ProfilePage: React.FC = () => {
  const { user } = useUserContext();

  const userImage = `${API_URL}${user?.image}`;
  const emailField = {
    icon: <MailOutlineIcon fontSize="large" />,
    name: "email",
    value: user?.email!,
  };
  const passwordField = {
    icon: <KeyIcon fontSize="large" />,
    name: "password",
    value: "************",
  };
  const basicInfo =
    user?.role === Role.user
      ? [
          { name: "name", value: user.name },
          { name: "height", value: user.height! },
          { name: "weight", value: user.bodyWeights?.at(-1)?.weight! },
        ]
      : [
          { name: "name", value: user!.name! },
          { name: "description", value: user?.description! },
        ];

  return (
    <SectionContainer>
      <SectionHeader>yours profile</SectionHeader>

      <UserInformation
        userImage={userImage}
        fields={[emailField, passwordField]}
        basicInfo={basicInfo}
        gyms={user?.gyms}
      />
    </SectionContainer>
  );
};

const Profile = ProfilePage;
export default Profile;
