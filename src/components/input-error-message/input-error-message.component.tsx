import { InputErrorMessageContainer } from './input-error-message.styles';
import { FunctionComponent } from 'react';

import { ReactNode } from 'react';

interface InputErrorMessageProps {
  children: ReactNode;
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>;
};

export default InputErrorMessage;
