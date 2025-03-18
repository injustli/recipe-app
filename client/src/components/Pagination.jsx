import { Group, Pagination } from '@mantine/core';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Renders pagination of recipe view component
export default function PaginationWrapper(props) {
  const { siblings = 1, totalCount, pageSize, page, setSearchParams } = props;

  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  const setPage = (value) => {
    setSearchParams((prev) => {
      if (value == 1) {
        prev.delete('page');
      } else {
        prev.set('page', value);
      }
      return prev;
    });
  };

  return (
    <>
      <Group justify={'center'}>
        <Pagination
          siblings={siblings}
          total={totalPageCount}
          value={page}
          onChange={setPage}
          withEdges
          hideWithOnePage
        />
      </Group>
    </>
  );
}
