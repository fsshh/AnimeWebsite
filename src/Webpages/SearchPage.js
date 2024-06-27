import TopNavBar from "./TopNavBarPage";
import axios from "axios";
import { useState, useEffect } from "react";

import { addAnimeID } from "../redux";
import { useSelector, useDispatch} from "react-redux";

import { Link } from "react-router-dom";

function SearchAnime(){
    const dispatch = useDispatch();
    const searchedAnime = useSelector((state) => state.animeFilter.searchedAnime);

    function getAnimeID(animeID){
        dispatch(addAnimeID(animeID))
    }

    const [animeList, setAnimeList] = useState([]);
    const [apiLoading, setApiLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchAnime = async () => {
            const query = `
                query {
                    Page(page: 1, perPage: 18) {
                        
                        pageInfo{
                            currentPage
                            lastPage
                        }    
                    
                        media(type: ANIME sort: POPULARITY_DESC search: "${searchedAnime}") {
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
                setCurrentPage(response.data.data.Page.pageInfo.currentPage);
                setLastPage(response.data.data.Page.pageInfo.lastPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally{
                setApiLoading(false);
            }
        };
        fetchAnime();
    }, [searchedAnime])
    
    function nextPage(){
        if(currentPage >= lastPage){
            alert('You are already at the last page')
        }else{
            setCurrentPage(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Smooth scrolling
            });
        }
    }
    function prevPage(){
        if(currentPage <= 1){
            alert('You are already at the first page')
        }else{
            setCurrentPage(currentPage - 1);
        }
    }

    return(
        <div>
            <TopNavBar/>
            <h1>Current Page: {currentPage} | Last Page: {lastPage}</h1>
            {apiLoading ? (<p>Loading...</p>) : (
                <div>
                    <div id='trending_anime_container'>
                        {animeList.map(anime => (
                            <Link to='/anime-description'><div key={anime.id} className='trending_anime_item' onClick={() => getAnimeID(anime.id)}>
                                <img src={anime.coverImage.large} alt='anime_cover_image'></img>
                                <div className='trending_anime_info_container'>
                                    <div>Sub | Dub</div>
                                    <div className='anime_trending_title' >{anime.title.english}</div>
                                </div>
                            </div></Link>
                        ))}
                    </div>
                    <div id='page_button_container'>
                        <button onClick={prevPage}>{'<'}</button>
                        <div>{currentPage} of {lastPage}</div>
                        <button onClick={nextPage}>{'>'}</button>
                    </div>
                </div>
                
            )}
        </div>

    )
}

export default SearchAnime;