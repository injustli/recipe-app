import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMealPlan from '@/pages/MyMealPlan';
import MyRecipes from '@/pages/MyRecipes/MyRecipes';
import HomePage from '@/pages/HomePage/HomePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageLayout from '@/components/PageLayout';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Notifications />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PageLayout>
                  <HomePage />
                </PageLayout>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/my-mealplan" element={<MyMealPlan />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}
