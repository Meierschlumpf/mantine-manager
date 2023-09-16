import { NavLink, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export const NavbarContent = () => {
  return (
    <Stack>
      <Stack gap="xs">
        <Title order={4}>Managed Modals</Title>
        <NavLink
          leftSection={<Text fw={500}>1.</Text>}
          component={Link}
          href="/"
          label="Simple example modal"
        />
        <NavLink
          leftSection={<Text fw={500}>2.</Text>}
          component={Link}
          href="/managed/without-props"
          label="Modal without inner props"
        />
        <NavLink
          leftSection={<Text fw={500}>3.</Text>}
          component={Link}
          href="/managed/keep-mounted"
          label="Modal without state reset"
        />
      </Stack>
    </Stack>
  );
};
