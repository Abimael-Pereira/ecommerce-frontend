import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignUpPage from './pages/sign-up/sign-up.page';

import UserContextProvider from './contexts/user.context.provider';
import CategoryContextProvider from './contexts/categorie.context';

const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <CategoryContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      </CategoryContextProvider>
    </UserContextProvider>
  );
};

export default App;
