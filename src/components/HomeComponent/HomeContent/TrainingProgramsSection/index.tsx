import React from "react";

import ProgramList from "./ProgramList";
import ProgramsNav from "./ProgramsNav";

const TreningProgramsSection: React.FC = () => {
  return (
    <section>
      <ProgramList />
      <ProgramsNav />
    </section>
  );
};

export default TreningProgramsSection;
