import Header from './Header/Header';

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
