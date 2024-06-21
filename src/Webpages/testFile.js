// src/App.js
import { useEffect, useState} from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBarPage';

import '../stylesFolder/testFile.css'

const TestFile = () => {
  const [animeList, setAnimeList] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);

  const [pageCount, setPageCount] = useState(1);

  function fetchNextAnimePage(){
    console.log(pageCount);
    setPageCount(pageCount + 1);
  }
  
  function fetchPrevAnimePage(){
    console.log(pageCount)
    setPageCount(pageCount <= 1 ? pageCount : pageCount - 1);
  }
  
  useEffect(() => {
    const fetchAnime = async () => {
      const query = `
          query {
            Page(page: ${pageCount}, perPage: 10) {
              media(type: ANIME) {
              id
              title {
                  romaji
                  english
                  native
              }
              description
              coverImage {
                  large
              }
              genres
              season
              seasonYear
              format
              }
            }
          }
      `;

      const url = 'https://graphql.anilist.co';

      try {
          const response = await axios.post(url, { query });
          setAnimeList(response.data.data.Page.media);
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally{
          setApiLoading(false);
      }
    };
    fetchAnime();

  }, [pageCount])
  

  return (
    <div>
      <TopNavBar/>
      <button className='testButton' onClick={fetchPrevAnimePage}>Prev Page</button>
      <button className='testButton' onClick={fetchNextAnimePage}>Next Page</button>
      <h2>Page: {pageCount}</h2>
      {apiLoading ? (<p>Loading...</p>) : (
        <ul>
          {animeList.map(anime => (
              <li key={anime.id}>
                  <h2>Anime: {anime.title.romaji}</h2>
                  <p>Desciption: {anime.description}</p>
                  <p>Genre: {anime.genres}</p>
                  <p>Season & Year: {anime.season}, {anime.seasonYear}</p>
                  <p>Format: {anime.format}</p>
                  <img src={anime.coverImage.large} alt={anime.title.romaji} />
              </li>
          ))}
        </ul>
      )}
        <div>Hello world</div>

    </div>
  );
  };

export default TestFile;
