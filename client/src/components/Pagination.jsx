import { Group, Pagination, Select } from '@mantine/core';
import { useMemo } from 'react';

// Renders pagination of recipe view component
export default function PaginationWrapper(props) {
  const {
    siblings = 1,
    onPageChange,
    currentPage,
    totalCount,
    pageSize,
    setPageSize
  } = props;

  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  return (
    <>
      <Group justify="space-around">
        <Pagination
          siblings={siblings}
          total={totalPageCount}
          value={currentPage}
          onChange={onPageChange}
          withEdges
          hideWithOnePage
        />
        <Select
          label="Items per page"
          data={['25', '50', '100']}
          value={pageSize}
          onChange={setPageSize}
          display={totalPageCount <= 1 ? 'none' : 'block'}
        />
      </Group>
    </>
  );
}
