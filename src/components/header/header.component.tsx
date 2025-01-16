import { BsCart3 } from 'react-icons/bs';

import './header.styles.css';

const Header = () => {
  return (
    <div className="header-container">
      <h2 className="header-tittle">CLUB CLOTHING</h2>

      <div className="header-items">
        <div className="header-items">
          <div className="header-item">Explorar</div>
          <div className="header-item">Login</div>
          <div className="header-item">Criar conta</div>
          <div className="header-item">
            <BsCart3 size={25} /> <p style={{ marginLeft: 5 }}>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
