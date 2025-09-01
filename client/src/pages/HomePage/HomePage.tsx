import RecipeView from '@/components/RecipeView';
import SearchAndFilter from '@/components/SearchAndFilter/SearchAndFilter';
import styles from './HomePage.module.css';
import { useSearchParams } from 'react-router-dom';
import { MIN_TIME, MAX_TIME } from '@/utils/constants';
import { useMemo } from 'react';
import { Box, Flex, Loader } from '@mantine/core';
import useFetchRecipes from '@/hooks/useFetchRecipes';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name') ? searchParams.get('name') : '';
  const ingredients = useMemo(
    () => searchParams.getAll('ingredients'),
    [searchParams]
  );
  const minTime = searchParams.get('minTime')
    ? Number(searchParams.get('minTime'))
    : MIN_TIME;
  const maxTime = searchParams.get('maxTime')
    ? Number(searchParams.get('maxTime'))
    : MAX_TIME;
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const pageSize = 25;

  const { recipes, totalCount, loading } = useFetchRecipes(
    currentPage,
    pageSize,
    ingredients,
    name as string,
    minTime,
    maxTime,
    ''
  );

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Loader />
      </Flex>
    );
  }

  return (
    <Box className={styles.container}>
      <SearchAndFilter
        name={name as string}
        ingredients={ingredients}
        minTime={minTime}
        maxTime={maxTime}
        setSearchParams={setSearchParams}
      />
      <RecipeView
        data={recipes}
        currentPage={currentPage as number}
        totalCount={totalCount}
        pageSize={pageSize}
        setSearchParams={setSearchParams}
      />
    </Box>
  );
}
