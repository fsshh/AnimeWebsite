import store from './redux.js'

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Webpages/LandingPage.js';
import HomePage from './Webpages/Home.js';
import FilterPage from './Webpages/FilterPage.js';
import TrendingAnime from './Webpages/TrendingAnimePage.js';
import PopularAnime from './Webpages/PopularAnimePage.js';
import TopAnime from './Webpages/TopAnimePage.js';
import AnimeDescription from './Webpages/animeDescription.js';
import SearchAnime from './Webpages/SearchPage.js';

// General CSS styles
import './stylesFolder/index.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/AnimeWebsite' element={<LandingPage/>} />
          <Route path='AnimeWebsite/home' element={<HomePage/>} />
          <Route path='AnimeWebsite/filter' element={<FilterPage/>} />
          <Route path='AnimeWebsite/trending-anime' element={<TrendingAnime/>} />
          <Route path='AnimeWebsite/popular-anime' element={<PopularAnime/>} />
          <Route path='AnimeWebsite/top-anime' element={<TopAnime/>} />
          <Route path='AnimeWebsite/anime-description' element={<AnimeDescription/>} />
          <Route path='AnimeWebsite/search-anime' element={<SearchAnime/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;