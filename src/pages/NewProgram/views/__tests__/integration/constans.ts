import userEvent from "@testing-library/user-event";

import {
  screen,
  fireEvent,
  within,
} from "../../../../../config/tests/custom-render";
import { ProgramItem } from "../../../../../shared/interfaces";

// PAGE ELEMENTS
export async function findAllProgramWeeks() {
  return screen.findAllByRole("button", {
    name: /week/i,
  });
}
export async function findAllTrainings() {
  return screen.findAllByRole("heading", {
    name: /trening/i,
  });
}
export function getSelectProgramLength() {
  return screen.getByRole("combobox", {
    name: /length/i,
  });
}
export function getSelectProgramFrequency() {
  return screen.getByRole("combobox", {
    name: /frequency/i,
  });
}

// ACTIONS
export function clickNextStep() {
  fireEvent.click(
    screen.getByRole("button", {
      name: /next step/i,
    })
  );
}
export async function selectProgramLength(programLength: number) {
  const dropdown = getSelectProgramLength();
  await userEvent.selectOptions(
    dropdown,
    within(dropdown).getByRole("option", { name: `${programLength} week` })
  );
}
export async function selectTrainingFreq(programFreq: number) {
  const dropdown = getSelectProgramFrequency();
  await userEvent.selectOptions(
    dropdown,
    within(dropdown).getByRole("option", {
      name: `${programFreq} trainings per week`,
    })
  );
}

// MOCKS
export const programMock: ProgramItem[] = [
  {
    id: "2b2f6dff-f547-48a0-8220-8ad43dc65f83",
    weekWorkouts: [
      {
        id: "5addb7f4-873c-4a00-aa2d-251bf7f55d44",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "3/4 sit-up",
            id: "0001",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
      {
        id: "57bc417d-512f-4744-a797-d3d491f7e8f0",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "air bike",
            id: "0003",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
    ],
  },
  {
    id: "d8eae2b1-f0cb-4956-a13f-ba4199e3d77b",
    weekWorkouts: [
      {
        id: "029c2fd7-da08-45d6-88d1-d369b6f30a3f",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "air bike",
            id: "0003",
            sets: [
              {
                goal: "11 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 11,
              },
            ],
          },
        ],
        isDraft: false,
      },
      {
        id: "70a64d10-edba-4eef-814a-c227f42ed4ce",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "all fours squad stretch",
            id: "1512",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
    ],
  },
  {
    id: "31e82b5c-9c42-4ae4-bbf3-07472862cc25",
    weekWorkouts: [
      {
        id: "3e5d1a6b-ccdf-4502-8899-c1fe11dc7fd7",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "alternate heel touchers",
            id: "0006",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
      {
        id: "59055132-9f7f-40d4-a7ae-2c211695781d",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "alternate heel touchers",
            id: "0006",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
    ],
  },
  {
    id: "24b73155-408c-4a7c-a643-2d615ca56abc",
    weekWorkouts: [
      {
        id: "afa2e81e-4948-4328-a155-cfe182982a24",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "alternate heel touchers",
            id: "0006",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
      {
        id: "39945fcf-076a-402a-8a64-e4d0999a9ffc",
        creator: "649149f90d94308b97289b91",
        title: "aaaaaa",
        date: "2023-07-12T10:33:53.000Z",
        exercises: [
          {
            name: "all fours squad stretch",
            id: "1512",
            sets: [
              {
                goal: "1 x 1",
                tempo: "1-1-1-1",
                archived: "",
                repMax: 1,
              },
            ],
          },
        ],
        isDraft: false,
      },
    ],
  },
];
