import { useFetchRecipes } from '@components/useFetchRecipes';
import RecipeView from '@components/RecipeView';
import SearchAndFilter from '@components/SearchAndFilter/SearchAndFilter';
import styles from './HomePage.module.css';
import { useSearchParams } from 'react-router-dom';
import { MIN_TIME, MAX_TIME } from '@utils/constants';
import { useMemo } from 'react';

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
  const currentPage = searchParams.get('page') ? searchParams.get('page') : 1;
  const pageSize = 25;

  const { recipes, totalCount } = useFetchRecipes(
    currentPage,
    pageSize,
    ingredients,
    name,
    minTime,
    maxTime,
    ''
  );

  return (
    <div className={styles.container}>
      <SearchAndFilter
        name={name}
        ingredients={ingredients}
        minTime={minTime}
        maxTime={maxTime}
        setSearchParams={setSearchParams}
      />
      <RecipeView
        data={recipes}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}
