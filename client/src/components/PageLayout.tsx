import { ReactNode } from 'react';
import Header from './Header/Header';

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
