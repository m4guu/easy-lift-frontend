import React from "react";

import { styled } from "@mui/system";

import { SectionHeader } from "../../components";
import { AddWeight } from "./views/AddWeight/AddWeight";
import { WeightChart } from "./views/WeightChart/WeightChart";
import { WeightHistory } from "./views/WeightHistory/WeightHistory";
import { useUserContext } from "../../contexts/userContext";

const BodyWeight: React.FC = () => {
  const { user } = useUserContext();
  return (
    <SectionContainer>
      <SectionHeader>body weight</SectionHeader>

      {user && <WeightChart userId={user.id} />}
      <AddWeight />
      {user && <WeightHistory userId={user.id} />}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  position: "relative",
}));
export default BodyWeight;
