import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
  ColorSchemeScript,
  MantineProvider,
} from '@mantine/core';
import { ModalManager } from './_modals';
import { NavbarContent } from '@/components/navbar-content';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Improved Modal Manager',
  description:
    'This is the demo application to preview the Improved Modal Manager with the App Directory.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <ModalManager>
            <AppShell navbar={{ width: 320, breakpoint: 'sm' }} padding="md">
              <AppShellNavbar p="md">
                <NavbarContent />
              </AppShellNavbar>
              <AppShellMain>{children}</AppShellMain>
            </AppShell>
            {children}
          </ModalManager>
        </MantineProvider>
      </body>
    </html>
  );
}
