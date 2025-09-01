import { ReactNode } from 'react';
import Header from './Header';
import { Box } from '@mantine/core';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const headerHeight = 64;
const footerHeight = 46;

export default function PageLayout({ children }: Props) {
  return (
    <Box
      style={{
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        style={{
          height: headerHeight,
          width: '100%'
        }}
      >
        <Header />
      </Box>
      <Box
        style={{
          height: '100%',
          width: '100%',
          flexGrow: 1
        }}
      >
        {children}
      </Box>
      <Box style={{ height: footerHeight, width: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
}
