import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../config/firebase.config';
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import UserContext from '../../contexts/user.context';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(userCredentials);
    } catch (error) {
      const _error = error as AuthError;
      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError('password', {
          type: 'mismatch',
        });
        setError('email', { type: 'mismatch' });
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredentials.user.uid),
        ),
      );

      const user = querySnapshot.docs[0]?.data();

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0];
        const lastName = userCredentials.user.displayName?.split(' ')[1];

        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          name: firstName,
          lastName: lastName,
          email: userCredentials.user.email,
          provider: 'google',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadLine>Entre com a sua conta!</LoginHeadLine>

          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={handleSignInWithGoogle}
          >
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
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}

            {errors?.password?.type === 'mismatch' && (
              <InputErrorMessage>
                O e-mail ou a senha estão incorretos
              </InputErrorMessage>
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
