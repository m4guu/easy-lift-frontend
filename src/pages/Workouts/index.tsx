import React from "react";

import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { SectionHeader } from "../../components";
import { WorkoutsContent } from "./views/WorkoutsContent";

const Workouts: React.FC = () => {
  const { user } = useUserContext();

  return (
    <Container>
      <SectionHeader>Your userWorkouts</SectionHeader>
      {user && <WorkoutsContent userId={user.id} />}
    </Container>
  );
};

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  height: "100%",
}));

export default Workouts;
