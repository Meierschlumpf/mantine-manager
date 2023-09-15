import { createUseExternalEvents } from '@mantine/core';
import {
  type ManagedModalProps,
  type ModalSettings,
  type OpenConfirmModal,
  type OpenManagedModal,
  createModalManageLoader,
} from './loader';

export type ManagedModalInnerProps = Record<string, any>;
export type ManagedModal<TInnerProps extends ManagedModalInnerProps> = React.FC<
  ManagedModalProps<TInnerProps>
>;
export type Modals = Record<string, ManagedModal<any>>;

export const createModalManager = <TModals extends Modals>(modals: TModals) => {
  const [useModalsEvents, createEvent] =
    createUseExternalEvents<ModalsEvents<TModals>>('mantine-modals');

  const openModal = createEvent('openModal');
  const closeModal = createEvent('closeModal');
  const closeAllModals = createEvent('closeAllModals');
  const openConfirmModal = createEvent('openConfirmModal');
  const openManagedModal: ModalsEvents<TModals>['openManagedModal'] = <TKey extends keyof TModals>(
    payload: OpenManagedModal<Parameters<TModals[TKey]>[0]['innerProps']> & { modal: TKey }
  ) => createEvent('openManagedModal')(payload);

  return [
    createModalManageLoader(modals, useModalsEvents),
    {
      open: openModal,
      close: closeModal,
      closeAll: closeAllModals,
      openConfirmModal,
      openManagedModal,
    },
  ] as const;
};

export type ModalsEvents<TModals extends Modals> = {
  openModal(payload: ModalSettings): void;
  closeModal(id: string): void;
  closeAllModals(): void;
  openConfirmModal(payload: OpenConfirmModal): void;
  openManagedModal<TKey extends keyof TModals>(
    payload: OpenManagedModal<Parameters<TModals[TKey]>[0]['innerProps']> & { modal: TKey }
  ): void;
};
