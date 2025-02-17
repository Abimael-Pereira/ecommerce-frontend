import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignUpPage from './pages/sign-up/sign-up.page';
import CategoryDetailsPage from './pages/category-details/category-datails.page';
import ExplorePage from './pages/explore/explore.page';
import CheckoutPage from './pages/checkout/checkout.page';
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmantion.page';

import UserContextProvider from './contexts/user.context-provider';
import CategoryContextProvider from './contexts/category-provider';
import CartContextProvider from './contexts/cart.context-provider';

import CartComponent from './components/cart/cart.component';
import AuthenticationGuard from './guards/authentication.guard';

const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <CategoryContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/checkout"
                element={
                  <AuthenticationGuard>
                    <CheckoutPage />
                  </AuthenticationGuard>
                }
              />
              <Route
                path="/payment-confirmation"
                element={<PaymentConfirmationPage />}
              />
              <Route path="/category/:id" element={<CategoryDetailsPage />} />
            </Routes>

            <CartComponent />
          </BrowserRouter>
        </CartContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  );
};

export default App;
