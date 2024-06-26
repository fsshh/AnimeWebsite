import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

import TopNavBar from "./TopNavBarPage";
import '../stylesFolder/DescriptionPage.css';

function AnimeDescription(){
  const animeID = useSelector((state) => state.animeFilter.animeID);

  const [anime, setAnime] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const query = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
              medium
              color
            }
            bannerImage
            description
            siteUrl
            genres
            streamingEpisodes {
              title
              thumbnail
              url
            }
            format
            season
            seasonYear
            episodes
            duration
            status
            meanScore
            popularity
          }
        }
      `;

      const variables = {
        // eslint-disable-next-line
        id: animeID
      };

      try {
        const response = await axios.post('https://graphql.anilist.co', {
          query,
          variables
        });
        setAnime(response.data.data.Media);
        setAnimeEpisodes(response.data.data.Media.streamingEpisodes);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAnime(); 
  }, [animeID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  
  

  return (
    <div>
      <TopNavBar/>
      <div id="anime_bannerImage" style={{backgroundImage: `url(${anime.bannerImage})`}}/>
      <div id="anime_info_container">
        <div id="anime_side_info">
          <img src={anime.coverImage.large} alt={anime.title.romaji}/>
          <div>
            <div>
              <div>Format</div>
              <div>{anime.format}</div>
            </div>
            <div>
              <div>Status</div>
              <div>{anime.status}</div>
            </div>
            <div>
              <div>Season</div>
              <div>{anime.season} {anime.seasonYear}</div>
            </div>
            <div>
              <div>Episodes</div>
              <div>{anime.episodes}</div>
            </div>
            <div>
              <div>Duration</div>
              <div>{anime.duration} mins</div>
            </div>
            <div>
              <div>Score</div>
              <div>{anime.meanScore}%</div>
            </div>
            <div>
              <div>Popularity</div>
              <div>{anime.popularity}</div>
            </div>
          </div>
        </div>
        <div id="anime_info">
          <h1 id="anime_title">{anime.title.english}</h1>
          <div id="anime_info_description">{anime.description}</div>
          <h3>Genre</h3>
          <div id="animeGenre_Container">
            {anime.genres.map((genre, index) => (
              <div key={index} style={{backgroundColor: `${anime.coverImage.color}`}} className='topAnimeGenre'>{genre}</div>
            ))}
          </div>
          <h3>Episodes</h3>
         <div id="anime_episodes_container">
          {animeEpisodes.length > 0 ? (
            animeEpisodes.map((episode, index) => (
              <a href={episode.url} target="_blank" rel="noreferrer"><div key={index} className="episode">
                  <div className="episode_title">{episode.title}</div>
                <img className="episode_thumbnail" src={episode.thumbnail} alt={episode.title} />
              </div></a>
            ))
          ) : (
            <p>No streaming episodes available.</p>
          )}
         </div>
        </div>
      </div>
      {/* <img src={anime.coverImage.large} alt={anime.title.romaji} /> 
      <h1>{anime.title.romaji} ({anime.title.english})</h1>
      <p>{anime.description}</p>
      <p>{anime.siteUrl}</p> */}
    </div>
  );
}

export default AnimeDescription;