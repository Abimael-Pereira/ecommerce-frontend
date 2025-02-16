import React from 'react';
import { FunctionComponent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/user.context';

import Header from '../components/header/header.component';
import LoadingComponent from '../components/loading/loading.component';



interface AuthenticationGuardProps {
  children: React.ReactNode;
}

const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <LoadingComponent message="Você precisa estar logado para acessar essa página. Será redirecionado para a página de login em instantes." />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
