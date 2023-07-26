import {
  fireEvent,
  render,
} from "../../../../../../config/tests/custom-render";

import NewProgram from "../../../..";

import {
  clickNextStep,
  findAllProgramWeeks,
  findAllTrainings,
  selectProgramLength,
  selectTrainingFreq,
} from "../constans";
import {
  choosenFrequencyTestCases,
  choosenLengthTestCases,
} from "./scenarios.cases";

describe("NewProgram Page", () => {
  describe("create program", () => {
    describe("second step shoud generate as many training weeks as choosen length in first step", () => {
      it.each(choosenLengthTestCases)(
        "iteration #%#",
        async ({ programLength, expectedTrainingWeekesLength }) => {
          render(<NewProgram />);
          await selectProgramLength(programLength);
          clickNextStep();

          expect(await findAllProgramWeeks()).toHaveLength(
            expectedTrainingWeekesLength
          );
        }
      );
    });

    describe("second step shoud generate as many trainings as choosen frequency in first step", () => {
      it.each(choosenFrequencyTestCases)(
        "iteration #%#",
        async ({ trainingFrequency, expectedTrainingLength }) => {
          render(<NewProgram />);
          await selectTrainingFreq(trainingFrequency);
          clickNextStep();
          // unravel all training
          (await findAllProgramWeeks()).forEach((button) => {
            fireEvent.click(button);
          });

          expect(await findAllTrainings()).toHaveLength(expectedTrainingLength);
        }
      );
    });
  });
});
