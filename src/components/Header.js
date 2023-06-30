import React, { useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import MyRecipes from './MyRecipes';
import MyMealPlan from './MyMealPlan';
import RecipeView from './RecipeView';
import { useFetchRecipes } from './useFetchRecipes';

export default function Header(props) {
  const { page } = props;
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [creator, setCreator] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useFetchRecipes({
    name,
    ingredients,
    minTime,
    maxTime,
    creator,
    currentPage,
    pageSize,
  })
    .then((data) => {
      setRecipes(data.data);
      setTotalCount(data.totalCount);
    })
    .catch((err) => console.log('Error in fetching recipes: ' + err));

  const loadSearch = () => {
    return (
      <SearchAndFilter
        setIngredients={(ingredients) => setIngredients(ingredients)}
        setCreator={(user) => setCreator(user)}
        setMinTime={(time) => setMinTime(time)}
        setMaxTime={(time) => setMaxTime(time)}
        setName={(name) => setName(name)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    );
  };

  const viewRender = () => {
    switch (page) {
      case 'My Recipes':
        return (
          <>
            {loadSearch()}
            <MyRecipes />
          </>
        );
      case 'My Meal Plan':
        return <MyMealPlan />;
      default:
        return (
          <>
            {loadSearch()}
            <RecipeView
              data={recipes}
              currentPage={currentPage}
              total={totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        );
    }
  };

  return <div>{viewRender()}</div>;
};
