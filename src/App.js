import store from './redux.js'

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Webpages/LandingPage.js';
import HomePage from './Webpages/Home.js';
import TestFile from './Webpages/testFile.js';

// CSS styles
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/Home' element={<HomePage/>} />
          <Route path='/Testfile' element={<TestFile/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;