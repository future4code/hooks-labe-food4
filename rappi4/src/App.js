import Router from '../src/Router/Router';
import GlobalState from './Global/GlobalState';
import GlobalStyles from './Global/GlobalStyles'

const App = () => {
  return (
    <GlobalState>
      <GlobalStyles/>
      <Router/>
    </GlobalState>
  );
}

export default App;
