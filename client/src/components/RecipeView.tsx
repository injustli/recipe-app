import { SimpleGrid } from '@mantine/core';
import Pagination from './Pagination';
import Recipe from './Recipe';
import { CheckedRecipe, RecipeType } from '@utils/types';
import { SetURLSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  data: RecipeType[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  setSearchParams: SetURLSearchParams;
  setCheckedRecipe?: Dispatch<SetStateAction<CheckedRecipe | null>>;
}

// Displays recipes in a grid, contains control of how many per page and pagination
export default function RecipeView({
  data,
  currentPage,
  totalCount,
  pageSize,
  setCheckedRecipe,
  setSearchParams
}: Props) {
  return (
    <>
      <SimpleGrid
        mb="md"
        mx="md"
        pb="md"
        px="md"
        cols={{ base: 1, sm: 2, md: 3, lg: 5 }}
      >
        {data.map((recipe) => {
          return setCheckedRecipe ? (
            <Recipe
              data={recipe}
              key={recipe._id}
              setCheckedRecipe={(recipe) => setCheckedRecipe(recipe)}
            />
          ) : (
            <Recipe data={recipe} key={recipe._id} />
          );
        })}
      </SimpleGrid>
      <Pagination
        page={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        setSearchParams={setSearchParams}
      />
    </>
  );
}
