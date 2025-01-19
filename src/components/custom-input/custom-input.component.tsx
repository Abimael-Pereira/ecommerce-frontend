import { FunctionComponent, InputHTMLAttributes } from 'react';
import { CustomInputContainer } from './custom-input.styles';
import React from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
}

const CutomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <CustomInputContainer {...props} ref={ref as any} />;
  },
);

CutomInput.displayName = 'CustomInput';

export default CutomInput;
