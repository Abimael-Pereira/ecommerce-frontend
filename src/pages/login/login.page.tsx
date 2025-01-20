import { BsGoogle } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import CustomButton from '../../components/custom-buttom/custom-button.component';
import CustomInput from '../../components/custom-input/custom-input.component';
import Header from '../../components/header/header.component';
import InputErrorMessage from '../../components/input-error-message/input-error-message.component';

import {
  LoginContainer,
  LoginContent,
  LoginHeadLine,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSubmitPress = (data: LoginForm) => {
    console.log({ data });
  };

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadLine>Entre com a sua conta!</LoginHeadLine>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              $hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value);
                },
              })}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage>E-mail é obrigatória</InputErrorMessage>
            )}
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Insira um e-mail válido</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              $hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register('password', { required: true })}
            />
            {errors?.password && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
