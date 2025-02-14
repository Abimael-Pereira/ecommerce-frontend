import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import UserContext from '../../contexts/user.context';
import CartContext from '../../contexts/cart.context';

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTittle,
} from './header.styles';

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(UserContext);
  const { productsCount, toggleCart } = useContext(CartContext);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/sign-up');
  };

  const handleExpoloreClick = () => {
    navigate('/explore');
  };

  return (
    <HeaderContainer>
      <HeaderTittle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTittle>

      <HeaderItems>
        <HeaderItem onClick={handleExpoloreClick}>Explorar</HeaderItem>
        {!isAuthenticated ? (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignupClick}>Criar conta</HeaderItem>
          </>
        ) : (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}

        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} /> <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
