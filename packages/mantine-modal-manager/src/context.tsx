import { createContext, useContext } from 'react';

type ManagedModalActionsContext = {
  closeModal: (id: string) => void;
  closeAll: () => void;
};

export const ModalActionsContext = createContext<ManagedModalActionsContext | null>(null);

export const useManagedModalActions = (id: string) => {
  const actions = useContext(ModalActionsContext);
  if (!actions) {
    throw new Error('[mantine-modal-manager] Could not find managed modal actions for modals');
  }

  return {
    closeModal: () => actions.closeModal(id),
    closeAll: actions.closeAll,
  };
};
