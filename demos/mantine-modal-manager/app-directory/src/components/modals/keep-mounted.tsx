'use client';

import { openManagedModal } from '@/app/_modals';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { createManagedModal } from 'mantine-modal-manager';

export const StatefulModalThatKeepsMounted = createManagedModal(({ actions, innerProps }) => {
  const [value, { increment, decrement }] = useCounter();

  const openAnotherModal = () => {
    openManagedModal({
      modal: 'withoutInnerProps',
      title: 'This is another modal',
      innerProps: {},
    });
  };

  return (
    <Stack>
      <Text>Counter: {value}</Text>
      <Group justify="center">
        <Group gap="xl">
          <Button onClick={increment}>+</Button>
          <Button onClick={decrement}>-</Button>
        </Group>
      </Group>
      <Group justify="space-between">
        <Button onClick={openAnotherModal}>Open another modal</Button>
        <Button onClick={actions.closeModal}>Close</Button>
      </Group>
    </Stack>
  );
});
