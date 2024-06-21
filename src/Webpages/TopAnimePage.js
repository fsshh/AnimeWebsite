import '../stylesFolder/trendingAnimePage.css'
import TopNavBar from './TopNavBarPage';

import { useEffect, useState } from 'react';
import axios from 'axios';

function TopAnime() {
    // FETCH ANILIST API
    const [animeList, setAnimeList] = useState([]);

    const [apiLoading, setApiLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            const query = `
                query {
                    Page(page: 1, perPage: 100) {                  
                        media(type: ANIME sort: SCORE_DESC) {
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
    }, []);
    return (
        <div>
            <TopNavBar/>
            <div id='trending_anime_flex_container'>
                <h1>TOP 100 ANIME</h1>
                {apiLoading ? (<p>Loading...</p>) : (
                    <div id='trending_anime_container'>
                        {animeList.map(anime => (
                            <div key={anime.id} className='trending_anime_item'>
                                <img src={anime.coverImage.large} alt='anime_cover_image'></img>
                                <div className='trending_anime_info_container'>
                                    <div>Sub | Dub</div>
                                    <div className='anime_trending_title' >{anime.title.english}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default TopAnime;