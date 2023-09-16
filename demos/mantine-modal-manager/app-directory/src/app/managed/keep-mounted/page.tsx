'use client';

import { openManagedModal } from '@/app/_modals';
import { Button, Container, Title } from '@mantine/core';

export default function ManagedModalWithoutProps() {
  const openModal = () => {
    openManagedModal({
      title: 'This modal persists its state when opening another modal',
      modal: 'keepMounted',
      innerProps: {},
      keepMounted: true, // <--- This is the important part
    });
  };

  return (
    <Container>
      <Title order={2}>Managed modal with state persisted</Title>
      <Button onClick={openModal}>Open Modal</Button>
    </Container>
  );
}
