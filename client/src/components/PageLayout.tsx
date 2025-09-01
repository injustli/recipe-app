import { ReactNode } from 'react';
import Header from './Header/Header';
import { Box } from '@mantine/core';

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}
