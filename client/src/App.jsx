import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMealPlan from './pages/MyMealPlan';
import MyRecipes from './pages/MyRecipes';
import useAuthStore from './store/authStore';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const refresh = useAuthStore((state) => state.refresh);

  useEffect(() => {
    // Refresh access and id token on every page refresh
    refresh();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                setName={(name) => setName(name)}
                setIngredients={(array) => setIngredients(array)}
                setMinTime={(time) => setMinTime(time)}
                setMaxTime={(time) => setMaxTime(time)}
                setCreator={(name) => setCreator(name)}
                onPageChange={(page) => setCurrentPage(page)}
                page={currentPage}
                name={name}
              />
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
          element={
            <MyRecipes
            />
          }
        />
        <Route
          path="/user/:name/mealplan"
          element={<MyMealPlan  />}
        />
      </Routes>
    </Router>
  );
}
