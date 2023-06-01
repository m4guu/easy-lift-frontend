import { useParams } from "react-router-dom";

import { ProgramFormProvider } from "./views/ProgramFormProvider/ProgramFormProvider";
import { SectionHeader, SectionContainer } from "../../components";
import { EditProgramFormProvider } from "./views/EditProgramFormProvider/EditProgramFormProvider";

const NewProgram: React.FC = () => {
  const { programId: editProgramId } = useParams();

  return (
    <SectionContainer>
      <SectionHeader>Training Program</SectionHeader>

      {editProgramId ? (
        <EditProgramFormProvider programId={editProgramId} />
      ) : (
        <ProgramFormProvider />
      )}
    </SectionContainer>
  );
};

export default NewProgram;
