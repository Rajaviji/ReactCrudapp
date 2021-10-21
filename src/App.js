import Root from './root/Root';
import './App.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer'
import {BrowserRouter as Router} from 'react-router-dom';
import { Suspense } from 'react';
import IntroLoader from './components/IntroLoader'
import 'bootstrap/dist/css/bootstrap.min.css';
const store = createStore(reducer)


function App() {
  return (
    <Provider store={store}>
     <Suspense fallback = {<IntroLoader />}>
     <Router>
        <div className="App h-screen">
          <Root/>
        </div>
      </Router>
       </Suspense>
    </Provider>
  );
}

export default App;
