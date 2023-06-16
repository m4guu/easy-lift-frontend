import { useState } from "react";
import { UpdateUserModalProps } from "../../../modals/Update";

export interface UseUpdateUserModalArgs {
  header: string;
  form: JSX.Element;
  description?: string;
}

interface UseUpdateUserModalReturn {
  openModal: () => void;
  modalProps: UpdateUserModalProps;
}

export const useUpdateUserModal = ({
  form,
  header,
  description,
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
    form,
    header,
    description,
  };

  return {
    openModal,
    modalProps,
  };
};
