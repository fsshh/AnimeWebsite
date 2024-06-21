import store from './redux.js'

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Webpages/LandingPage.js';
import HomePage from './Webpages/Home.js';
import TestFile from './Webpages/testFile.js';
import FilterPage from './Webpages/FilterPage.js';
import TrendingAnime from './Webpages/TrendingAnimePage.js';
import PopularAnime from './Webpages/PopularAnimePage.js';
import TopAnime from './Webpages/TopAnimePage.js';

// General CSS styles
import './stylesFolder/index.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/testfile' element={<TestFile/>} />
          <Route path='/filter' element={<FilterPage/>} />
          <Route path='/trending-anime' element={<TrendingAnime/>} />
          <Route path='/popular-anime' element={<PopularAnime/>} />
          <Route path='/top-anime' element={<TopAnime/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;