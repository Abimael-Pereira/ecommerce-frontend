import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTittle,
} from './header.styles';

const Header = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/sign-up');
  };

  return (
    <HeaderContainer>
      <HeaderTittle>CLUB CLOTHING</HeaderTittle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignupClick}>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
