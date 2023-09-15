import React from 'react';
import { ConfirmModal } from './ConfirmModal';
import { useManagedModalActions } from './context';
import {
  type ConfirmLabels,
  type ManagedModalProps,
  type ModalState,
  type OpenConfirmModal,
} from './loader';

function separateConfirmModalProps(props: OpenConfirmModal) {
  if (!props) {
    return { confirmProps: {}, modalProps: {} };
  }

  const {
    id,
    children,
    onCancel,
    onConfirm,
    closeOnConfirm,
    closeOnCancel,
    cancelProps,
    confirmProps,
    groupProps,
    labels,
    ...others
  } = props;

  return {
    confirmProps: {
      id,
      children,
      onCancel,
      onConfirm,
      closeOnConfirm,
      closeOnCancel,
      cancelProps,
      confirmProps,
      groupProps,
      labels,
    },
    modalProps: {
      id,
      ...others,
    },
  };
}

type GetModalProps = {
  labels?: ConfirmLabels;
  modals?: Record<string, React.FC<ManagedModalProps<any>>>;
};

export const getModal = (modal: ModalState, { labels, modals }: GetModalProps) => {
  switch (modal?.type) {
    case 'managed': {
      const { innerProps, ...rest } = modal.props;
      const ManagedModal = modals![modal.ctx];
      const OuterManagedModal = () => {
        const actions = useManagedModalActions(modal.id);
        return <ManagedModal innerProps={innerProps} actions={actions} id={modal.id} />;
      };

      return {
        modalProps: rest,
        content: <OuterManagedModal />,
      };
    }
    case 'confirm': {
      const { modalProps: separatedModalProps, confirmProps: separatedConfirmProps } =
        separateConfirmModalProps(modal.props);

      return {
        modalProps: separatedModalProps,
        content: (
          <ConfirmModal
            {...separatedConfirmProps}
            id={modal.id}
            labels={modal.props.labels || labels}
          />
        ),
      };
    }
    case 'content': {
      const { children: currentModalChildren, ...rest } = modal.props;

      return {
        modalProps: rest,
        content: <>{currentModalChildren}</>,
      };
    }
    default: {
      return {
        modalProps: {},
        content: null,
      };
    }
  }
};
