import { Modal, getDefaultZIndex } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import React, { useCallback, useReducer, useRef } from 'react';
import { ModalProps } from '@mantine/core';
import { ReactNode } from 'react';
import type { ConfirmModalProps } from './ConfirmModal';
import { prepareModalsReducer } from './reducer';
import { Modals, ModalsEvents } from './manager';
import { ModalActionsContext } from './context';

export interface ModalManagerLoaderProps {
  /** Your app */
  children: React.ReactNode;

  /** Shared Modal component props, applied for every modal */
  modalProps?: ModalSettings;

  /** Confirm modal labels */
  labels?: ConfirmLabels;
}

export const createModalManageLoader = <TModals extends Modals>(
  modals: TModals,
  useModalsEvents: (events: ModalsEvents<TModals>) => void
) => {
  return function InnerModalManageLoader({
    children,
    modalProps,
    labels,
  }: ModalManagerLoaderProps) {
    const [state, dispatch] = useReducer(prepareModalsReducer({ labels, modals }), {
      modals: [],
      current: null,
    });
    const stateRef = useRef(state);
    stateRef.current = state;

    const closeAll = useCallback(
      (canceled?: boolean) => {
        dispatch({ type: 'CLOSE_ALL', canceled });
      },
      [stateRef, dispatch]
    );

    const openModal = useCallback(
      ({ modalId, ...props }: ModalSettings) => {
        const id = modalId || randomId();

        dispatch({
          type: 'OPEN',
          modal: {
            id,
            type: 'content',
            props,
          },
        });
        return id;
      },
      [dispatch]
    );

    const openConfirmModal = useCallback(
      ({ modalId, ...props }: OpenConfirmModal) => {
        const id = modalId || randomId();
        dispatch({
          type: 'OPEN',
          modal: {
            id,
            type: 'confirm',
            props,
          },
        });
        return id;
      },
      [dispatch]
    );

    const openManagedModal = useCallback(
      (modal: keyof TModals, { modalId, ...props }: OpenManagedModal) => {
        const id = modalId || randomId();
        dispatch({
          type: 'OPEN',
          modal: {
            id,
            type: 'managed',
            props,
            ctx: modal as string,
          },
        });
        return id;
      },
      [dispatch]
    );

    const closeModal = useCallback(
      (id: string, canceled?: boolean) => {
        dispatch({ type: 'CLOSE', modalId: id, canceled });
      },
      [stateRef, dispatch]
    );

    useModalsEvents({
      openModal,
      openConfirmModal,
      openManagedModal: ({ modal, ...payload }: any) => openManagedModal(modal, payload),
      closeModal,
      closeAllModals: closeAll,
    });

    const activeModals = state.modals.filter(
      (modal) =>
        modal.id === state.current?.id ||
        modal.props.keepMounted ||
        (modalProps?.keepMounted === true && modal.props.keepMounted !== false)
    );

    return (
      <ModalActionsContext.Provider
        value={{
          closeModal: closeModal,
          closeAll,
        }}
      >
        {activeModals.map((modal) => (
          <Modal
            key={modal.id}
            zIndex={getDefaultZIndex('modal') + 1}
            display={modal.id === state.current?.id ? undefined : 'none'}
            style={{ userSelect: modal.id === state.current?.id ? undefined : 'none' }}
            trapFocus={modal.id === state.current?.id}
            {...modalProps}
            {...modal.reference.modalProps}
            opened={state.modals.length > 0}
            onClose={() => closeModal(state.current!.id)}
          >
            {modal.reference.content}
          </Modal>
        ))}

        {children}
      </ModalActionsContext.Provider>
    );
  };
};

export type ModalSettings = Partial<Omit<ModalProps, 'opened'>> & { modalId?: string };

export type ConfirmLabels = Record<'confirm' | 'cancel', ReactNode>;

export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps {}
export interface OpenManagedModal<CustomProps extends Record<string, any> = {}>
  extends ModalSettings {
  innerProps: CustomProps;
}

export type ManagedModalActions = {
  closeModal: () => void;
  closeAll: () => void;
};

export interface ManagedModalProps<T extends Record<string, any> = {}> {
  actions: ManagedModalActions;
  innerProps: T;
  id: string;
}

export type ModalState =
  | { id: string; props: ModalSettings; type: 'content' }
  | { id: string; props: OpenConfirmModal; type: 'confirm' }
  | { id: string; props: OpenManagedModal; type: 'managed'; ctx: string };
