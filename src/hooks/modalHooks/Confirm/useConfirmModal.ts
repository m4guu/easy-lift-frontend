import { useState } from "react";

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    open,
    isOpen,
    close,
  };
};
