import { getModal } from './constructor';
import { type ConfirmLabels, type ManagedModalProps, type ModalState } from './loader';

type ModalStateWithReference = ModalState & {
  /**
   * Reference to modal component instance
   * Used so the modal can be persisted between navigating in newer modals
   */
  reference: ReturnType<typeof getModal>;
};

interface ModalsState {
  modals: ModalStateWithReference[];

  /**
   * Modal that is currently open or was the last open one.
   * Keeping the last one is necessary for providing a clean exit transition.
   */
  current: ModalStateWithReference | null;
}

interface OpenAction {
  type: 'OPEN';
  modal: ModalState;
}

interface CloseAction {
  type: 'CLOSE';
  modalId: string;
  canceled?: boolean;
}

interface CloseAllAction {
  type: 'CLOSE_ALL';
  canceled?: boolean;
}

function handleCloseModal(modal: ModalState, canceled?: boolean) {
  if (canceled && modal.type === 'confirm') {
    modal.props.onCancel?.();
  }

  modal.props.onClose?.();
}

type PrepareModalsReducerProps = {
  labels?: ConfirmLabels;
  modals?: Record<string, React.FC<ManagedModalProps<any>>>;
};

export const prepareModalsReducer =
  ({ labels, modals }: PrepareModalsReducerProps) =>
  (state: ModalsState, action: OpenAction | CloseAction | CloseAllAction): ModalsState => {
    switch (action.type) {
      case 'OPEN': {
        const newModal = {
          ...action.modal,
          reference: getModal(action.modal, { labels, modals }),
        };
        return {
          current: newModal,
          modals: [...state.modals, newModal],
        };
      }
      case 'CLOSE': {
        const modal = state.modals.find((m) => m.id === action.modalId);
        if (!modal) {
          return state;
        }

        handleCloseModal(modal, action.canceled);

        const remainingModals = state.modals.filter((m) => m.id !== action.modalId);

        return {
          current: remainingModals[remainingModals.length - 1] || state.current,
          modals: remainingModals,
        };
      }
      case 'CLOSE_ALL': {
        if (!state.modals.length) {
          return state;
        }

        // Resolve modal stack from top to bottom
        state.modals
          .concat()
          .reverse()
          .forEach((modal) => {
            handleCloseModal(modal, action.canceled);
          });

        return {
          current: state.current,
          modals: [],
        };
      }
      default: {
        return state;
      }
    }
  };
