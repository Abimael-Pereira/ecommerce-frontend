import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import CustomButton from '../../components/custom-buttom/custom-button.component';
import CustomInput from '../../components/custom-input/custom-input.component';
import Header from '../../components/header/header.component';
import InputErrorMessage from '../../components/input-error-message/input-error-message.component';

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from './sign-up.styles';

import { auth, db } from '../../config/firebase.config';
import {
  AuthError,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import UserContext from '../../contexts/user.context';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const watchPassword = watch('password');

  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        name: data.firstName,
        lastName: data.lastName,
        email: userCredentials.user.email,
        provider: 'firebase',
      });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' });
      }
    }
  };

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              $hasError={!!errors?.firstName}
              placeholder="Digite seu nome"
              {...register('firstName', { required: true })}
            />

            {errors?.firstName?.type === 'required' && (
              <InputErrorMessage>Nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              $hasError={!!errors?.lastName}
              placeholder="Digite seu Sobrenome"
              {...register('lastName', { required: true })}
            />

            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>Sobrenome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
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
              <InputErrorMessage>E-mail é obrigatório</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Insira um e-mail válido</InputErrorMessage>
            )}

            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>
                Esse e-mail já está sendo utilizado
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              $hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}

            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                Sua senha deve ter no mímino 6 caracteres
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              $hasError={!!errors?.confirmPassword}
              placeholder="Digite novamente sua senha"
              type="password"
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />

            {errors?.confirmPassword?.type === 'required' && (
              <InputErrorMessage>
                Confirmação de senha é obrigatória
              </InputErrorMessage>
            )}

            {errors?.confirmPassword?.type === 'minLength' && (
              <InputErrorMessage>
                Sua senha deve ter no mímino 6 caracteres
              </InputErrorMessage>
            )}

            {errors?.confirmPassword?.type === 'validate' && (
              <InputErrorMessage>As senhas não são iguais</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
