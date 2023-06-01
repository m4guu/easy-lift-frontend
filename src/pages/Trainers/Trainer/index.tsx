import React from "react";
import { useParams } from "react-router-dom";

import { SectionHeader, SectionContainer } from "../../../components";
import { TrainerContent } from "./views/TrainerContent";

const Trainer: React.FC = () => {
  const { trainerId } = useParams();

  return (
    <SectionContainer>
      <SectionHeader>Trainer</SectionHeader>
      {trainerId && <TrainerContent trainerId={trainerId} />}
    </SectionContainer>
  );
};

export default Trainer;
