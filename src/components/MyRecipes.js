import { useState } from 'react';
import { useFetchRecipes } from './useFetchRecipes';
import RecipeView from './RecipeView';
import Header from './Header';
import { IoAddSharp } from 'react-icons/io5';
import { GrEdit } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import '../styles/MyRecipes.css';

// TODO (issue 14): MyRecipes component
export default function MyRecipes(props) {
  const { user, token, setUser } = props;
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [checkedRecipe, setCheckedRecipe] = useState(null);

  const { recipes, totalCount } = useFetchRecipes(
    currentPage,
    pageSize,
    ingredients,
    name,
    minTime,
    maxTime,
    user.name
  );

  return (
    <>
      <Header
        setName={(name) => setName(name)}
        setIngredients={(array) => setIngredients(array)}
        setMinTime={(time) => setMinTime(time)}
        setMaxTime={(time) => setMaxTime(time)}
        onPageChange={(page) => setCurrentPage(page)}
        user={user}
        page={currentPage}
        name={name}
        setUser={(user) => setUser(user)}
      />
      <RecipeView
        data={recipes}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        setPageSize={(size) => setPageSize(size)}
        setCheckedRecipe={(recipe) => setCheckedRecipe(recipe)}
      />
      <button
        type="button"
        className="circular-button"
        style={{ bottom: '40%' }}
      >
        <IoAddSharp size={'2em'} />
      </button>
      {checkedRecipe && (
        <>
          <button
            type="button"
            className="circular-button"
            style={{ bottom: '25%' }}
          >
            <GrEdit />
          </button>
          <button type="button" className="circular-button">
            <BiMinus />
          </button>
        </>
      )}
    </>
  );
}
