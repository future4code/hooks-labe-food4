import Router from '../src/Router/Router';
import GlobalState from './Global/GlobalState';

const App = () => {
  return (
    <GlobalState>
      <Router/>
    </GlobalState>
  );
}

export default App;
