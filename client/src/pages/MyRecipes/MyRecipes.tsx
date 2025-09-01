import { useMemo, useState } from 'react';
import useFetchRecipes from '@/hooks/useFetchRecipes';
import { IoAddSharp } from 'react-icons/io5';
import { GrEdit } from 'react-icons/gr';
import { BsTrash3Fill } from 'react-icons/bs';
import RecipeView from '@/components/RecipeView';
import styles from './MyRecipes.module.css';
import RecipeModalForm from '@/components/RecipeModalForm';
import { MAX_TIME, MIN_TIME } from '@/utils/constants';
import { CheckedRecipe } from '@/utils/types';
import { useSearchParams } from 'react-router-dom';
import { Box, Flex, Loader } from '@mantine/core';
import useSession from '@/hooks/useSession';

// Renders the my recipe page when user selects it under dropdown menu
export default function MyRecipes() {
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

  const [checkedRecipe, setCheckedRecipe] = useState<CheckedRecipe | null>(
    null
  );
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState('');

  const { user } = useSession();

  const { recipes, totalCount, loading } = useFetchRecipes(
    currentPage,
    pageSize,
    ingredients,
    name as string,
    minTime,
    maxTime,
    user?.name as string
  );

  const onClick = (mode: string) => {
    setModal(true);
    setMode(mode);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Loader />
      </Flex>
    );
  }

  // TODO: Improve style of this page
  return (
    <Box>
      <RecipeView
        data={recipes}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        setCheckedRecipe={(recipe) => setCheckedRecipe(recipe)}
        setSearchParams={setSearchParams}
      />
      <div className={styles['icon-container']}>
        <button
          type="button"
          className={styles['circular-button']}
          onClick={() => onClick('delete')}
        >
          <BsTrash3Fill className={styles['button-icon']} />
        </button>
        <button
          type="button"
          className={styles['circular-button']}
          onClick={() => onClick('edit')}
        >
          <GrEdit className={styles['button-icon']} />
        </button>
        <button
          type="button"
          className={styles['circular-button']}
          onClick={() => onClick('add')}
        >
          <IoAddSharp className={styles['button-icon']} />
        </button>
      </div>
      {modal && (
        <RecipeModalForm
          modal={modal}
          setModal={(flag) => setModal(flag)}
          data={
            checkedRecipe
              ? recipes.filter((s) => s._id === checkedRecipe.id)[0]
              : checkedRecipe
          }
          mode={mode}
        />
      )}
    </Box>
  );
}
