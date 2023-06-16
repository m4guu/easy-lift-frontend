import React from "react";

import { useUserContext } from "../../contexts/userContext";

import { SectionContainer, SectionHeader } from "../../components";

import { UserInformation } from "./views/UserInformation/UserInformation";

const ProfilePage: React.FC = () => {
  const { user } = useUserContext();

  return (
    <SectionContainer>
      <SectionHeader>yours profile</SectionHeader>

      {user ? <UserInformation user={user} /> : <div>Log in</div>}
    </SectionContainer>
  );
};

const Profile = ProfilePage;
export default Profile;
