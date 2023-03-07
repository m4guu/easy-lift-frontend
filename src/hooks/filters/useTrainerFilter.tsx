import React, { useState, useEffect, useCallback } from "react";

import { User } from "../../shared/interfaces";

export const useTrainerFilter = (trainers: User[] | undefined) => {
  const [updatedList, setUpdatedList] = useState<User[]>([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedPersonalTraining, setPersonalTraining] = useState(false);
  const [selectedGyms, setSelectedGyms] = useState<string[]>([]);

  const handleSelectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(event.target.value);
  };
  const handleSelectPersonalTrening = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setPersonalTraining(checked);
  };

  const handleSelectGyms = (
    event: React.ChangeEvent<HTMLInputElement>,
    gyms: string[]
  ) => {
    setSelectedGyms(gyms);
  };

  const applyFilters = useCallback(() => {
    let filteredTrainers = trainers || [];

    // name filter
    if (selectedName) {
      filteredTrainers = filteredTrainers.filter((trainer) =>
        trainer.name.toLowerCase().includes(selectedName.toLowerCase())
      );
    }

    // personal training filter
    if (selectedPersonalTraining) {
      filteredTrainers = filteredTrainers.filter(
        (trainer) => trainer.gyms?.length !== 0
      );
    }

    // gyms filter
    if (selectedGyms) {
      filteredTrainers = filteredTrainers.filter((trainer) => {
        return selectedGyms.map((selectedGym) =>
          trainer.gyms?.includes(selectedGym)
        );
      });
    }

    setUpdatedList(filteredTrainers);
  }, [trainers, selectedName, selectedPersonalTraining, selectedGyms]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    updatedList,
    filterPanelProps: {
      selectedName,
      selectedPersonalTraining,
      selectedGyms,
      handleSelectName,
      handleSelectGyms,
      handleSelectPersonalTrening,
    },
  };
};
