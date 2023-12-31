import React from 'react';
import { Button, Group, Box, ButtonProps, GroupProps } from '@mantine/core';
import { type ConfirmLabels } from './loader';
import { useManagedModalActions as useModalActions } from './context';

export interface ConfirmModalProps {
  id?: string;
  children?: React.ReactNode;
  onCancel?(): void;
  onConfirm?(): void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  groupProps?: GroupProps;
  labels?: ConfirmLabels;
}

export function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  labels = { cancel: '', confirm: '' },
  closeOnConfirm = true,
  closeOnCancel = true,
  groupProps,
  onCancel,
  onConfirm,
  children,
}: ConfirmModalProps) {
  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const { closeModal } = useModalActions(id!);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof cancelProps?.onClick === 'function' && cancelProps?.onClick(event);
    typeof onCancel === 'function' && onCancel();
    closeOnCancel && closeModal();
  };

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof confirmProps?.onClick === 'function' && confirmProps?.onClick(event);
    typeof onConfirm === 'function' && onConfirm();
    closeOnConfirm && closeModal();
  };

  return (
    <>
      {children && <Box mb="md">{children}</Box>}

      <Group justify="flex-end" {...groupProps}>
        <Button variant="default" {...cancelProps} onClick={handleCancel}>
          {cancelProps?.children || cancelLabel}
        </Button>

        <Button {...confirmProps} onClick={handleConfirm}>
          {confirmProps?.children || confirmLabel}
        </Button>
      </Group>
    </>
  );
}
