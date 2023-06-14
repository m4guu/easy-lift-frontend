import { useState } from "react";
import { UpdateUserModalProps } from "../../../modals/Update";

export interface UseUpdateUserModalArgs {
  tHeader: string;
  tForm: JSX.Element;
  tDescription?: string;
}

interface UseUpdateUserModalReturn {
  openModal: () => void;
  modalProps: UpdateUserModalProps;
}

export const useUpdateUserModal = ({
  tForm,
  tHeader,
  tDescription,
}: UseUpdateUserModalArgs): UseUpdateUserModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const modalProps: UpdateUserModalProps = {
    isOpen: isModalOpen,
    onClose: closeModal,
    tForm,
    tHeader,
    tDescription,
  };

  return {
    openModal,
    modalProps,
  };
};
