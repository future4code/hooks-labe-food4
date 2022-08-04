import Router from '../src/Router/Router';
import GlobalState from './Global/GlobalState';
import GlobalStyles from './Global/GlobalStyles'
import { theme } from './Themes/theme';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <GlobalStyles/>
        <Router/>
        <ToastContainer/>
      </GlobalState>
    </ThemeProvider>
  );
}

export default App;
