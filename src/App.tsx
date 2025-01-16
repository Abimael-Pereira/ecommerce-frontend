import { FunctionComponent } from 'react';

//components
import Header from './components/header/header.component';

interface AppProps {
  message?: string;
}

const App: FunctionComponent<AppProps> = () => {
  return <Header />;
};

export default App;
