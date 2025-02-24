import { render } from '@testing-library/react';
import CustomButton from './custom-button.component';

describe('CustomButton', () => {
  it('should render with correct children', () => {
    const { getByText } = render(<CustomButton>Click me</CustomButton>);

    getByText('Click me');
  });
});
