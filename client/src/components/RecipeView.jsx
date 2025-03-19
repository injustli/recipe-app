import { SimpleGrid } from '@mantine/core';
import Pagination from './Pagination';
import Recipe from './Recipe';

// Displays recipes in a grid, contains control of how many per page and pagination
export default function RecipeView(props) {
  const {
    data,
    currentPage,
    totalCount,
    pageSize,
    setCheckedRecipe,
    setSearchParams
  } = props;

  return (
    <>
      <SimpleGrid
        mb="md"
        mx="md"
        pb="md"
        px="md"
        cols={{ base: 1, sm: 2, md: 3, lg: 5 }}
      >
        {data.map((recipe, idx) => {
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
