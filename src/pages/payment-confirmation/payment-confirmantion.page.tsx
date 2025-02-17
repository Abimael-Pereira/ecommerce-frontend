import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from 'react-icons/ai';

import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent,
} from './payment-confirmation.styles';
import Colors from '../../theme/theme.colors';

import Header from '../../components/header/header.component';
import CustomButton from '../../components/custom-buttom/custom-button.component';

import CartContext from '../../contexts/cart.context';

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const status = searchParams.get('success');
  const isCanceled = searchParams.get('canceled') === 'true';

  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    if (status === 'true') {
      clearCart();
    }
  }, [status, clearCart]);

  const handleGoToHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}
          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente!
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomeClick}
          >
            Ir para a Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  );
};

export default PaymentConfirmationPage;
