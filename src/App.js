import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyMealPlan from './components/MyMealPlan';
import MyRecipes from './components/MyRecipes';
import RecipeView from './components/RecipeView';
import { useFetchRecipes } from './components/useFetchRecipes';

export default function App() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [creator, setCreator] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const { recipes, totalCount } = useFetchRecipes(
    currentPage,
    pageSize,
    ingredients,
    name,
    minTime,
    maxTime,
    creator
  );

  return (
    <Router>
      <Header
        setName={(name) => setName(name)}
        setIngredients={(array) => setIngredients(array)}
        setMinTime={(time) => setMinTime(time)}
        setMaxTime={(time) => setMaxTime(time)}
        setUser={(user) => setUser(user)}
        setToken={(token) => setToken(token)}
        setCreator={(name) => setCreator(name)}
        onPageChange={(page) => setCurrentPage(page)}
        user={user}
        page={currentPage}
        name={name}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RecipeView
                data={recipes}
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                setPageSize={(size) => setPageSize(size)}
              />
            </>
          }
        />
        <Route
          path="/user/:name/recipes"
          element={<MyRecipes user={user} token={token} />}
        />
        <Route path="/user/:name/mealplan" element={<MyMealPlan />} />
      </Routes>
    </Router>
  );
}
