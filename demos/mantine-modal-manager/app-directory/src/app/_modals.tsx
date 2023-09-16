'use client';

import { StatefulModalThatKeepsMounted } from '@/components/modals/keep-mounted';
import { ModalWithInnerProps } from '@/components/modals/with-inner-props';
import { ModalWithoutInnerProps } from '@/components/modals/without-inner-props';
import { createModalManager } from 'mantine-modal-manager';

export const [ModalManager, { openManagedModal }] = createModalManager({
  withInnerProps: ModalWithInnerProps,
  withoutInnerProps: ModalWithoutInnerProps,
  keepMounted: StatefulModalThatKeepsMounted,
});
