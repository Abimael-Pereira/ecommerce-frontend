import { render } from '@testing-library/react';
import LoadingComponent from './loading.component';

describe('Loading', () => {
  it('should show a message if there is one', () => {
    const { getByText } = render(<LoadingComponent message="Aguarde" />);
    getByText('Aguarde');
  });
});
