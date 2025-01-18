import { FunctionComponent, InputHTMLAttributes } from 'react';
import { CustomInputContainer } from './custom-input.styles';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CutomInput: FunctionComponent<CustomInputProps> = ({
  hasError,
  ...rest
}) => {
  return <CustomInputContainer hasError={hasError} {...rest} />;
};

export default CutomInput;
