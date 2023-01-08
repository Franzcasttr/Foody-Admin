import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/Dashboard';
import SharedLayout from './Pages/SharedLayout';
import ProductPage from './Pages/ProductPage';
import OrderPage from './Pages/OrderPage';
import UserPage from './Pages/UserPage';
import CategoryPage from './Pages/CategoryPage';

import PersistLog from './Pages/Persist';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PersistLog />}>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' exact element={<SharedLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path='products' index element={<ProductPage />} />
                <Route path='orders' index element={<OrderPage />} />
                <Route path='users' index element={<UserPage />} />
                <Route path='categories' index element={<CategoryPage />} />
              </Route>
            </Route>
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route path='*' exact element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
