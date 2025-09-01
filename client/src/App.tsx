import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMealPlan from '@/pages/MyMealPlan';
import MyRecipes from '@/pages/MyRecipes';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext';
import PersistentLayout from './components/PersistentLayout';

export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Notifications />
        <Router>
          <Routes>
            <Route element={<PersistentLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/my-recipes" element={<MyRecipes />} />
                <Route path="/my-mealplan" element={<MyMealPlan />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}
