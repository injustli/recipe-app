import { Outlet } from 'react-router-dom';
import PageLayout from './PageLayout';
import { Suspense } from 'react';
import { Flex, Loader } from '@mantine/core';

const PersistentLayout = () => {
  return (
    <PageLayout>
      <Suspense
        fallback={
          <Flex justify="center" align="center">
            <Loader />
          </Flex>
        }
      >
        <Outlet />
      </Suspense>
    </PageLayout>
  );
};

export default PersistentLayout;
