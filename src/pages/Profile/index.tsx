import React from "react";

import { SectionContainer, SectionHeader } from "../../components";
import { useUserContext } from "../../contexts/userContext";
import { Role } from "../../shared/enums";
import { UserProfile } from "./views/UserProfile/UserProfile";
import { TrainerProfile } from "./views/TrainerProfile/TrainerProfile";

const ProfilePage: React.FC = () => {
  const { user } = useUserContext();

  return (
    <SectionContainer>
      <SectionHeader>yors profile</SectionHeader>
      {user && user.role === Role.user ? (
        <UserProfile user={user} />
      ) : (
        <TrainerProfile trainer={user!} />
      )}
    </SectionContainer>
  );
};

const Profile = ProfilePage;
export default Profile;
