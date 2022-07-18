import Router from '../src/Router/Router';
import GlobalState from './Global/GlobalState';
import GlobalStyles from './Global/GlobalStyles'
import { theme } from './Themes/theme';
import { ThemeProvider } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <GlobalStyles/>
        <Router/>
      </GlobalState>
    </ThemeProvider>
  );
}

export default App;
