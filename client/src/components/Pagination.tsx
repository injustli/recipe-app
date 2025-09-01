import { Group, Pagination } from '@mantine/core';
import { SetURLSearchParams } from 'react-router-dom';

interface Props {
  siblings?: number;
  totalCount: number;
  pageSize: number;
  page: number;
  setSearchParams: SetURLSearchParams;
}
// Renders pagination of recipe view component
export default function PaginationWrapper({
  siblings = 1,
  totalCount,
  pageSize,
  page,
  setSearchParams
}: Props) {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const setPage = (value: number) => {
    setSearchParams((prev) => {
      if (value == 1) {
        prev.delete('page');
      } else {
        prev.set('page', value.toString());
      }
      return prev;
    });
  };

  return (
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
  );
}
