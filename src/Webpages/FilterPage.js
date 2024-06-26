import axios from 'axios';

import '../stylesFolder/FilterPage.css'
import '../stylesFolder/trendingAnimePage.css'

import TopNavBar from './TopNavBarPage';

import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAnimeGenre, removeAnimeGenre, 
        addAnimeSeason, addAnimeFormat, 
        addAnimeYear, addAnimeID} from '../redux';

import { Link } from 'react-router-dom';

function FilterPage(){
    const animeGenreList = useSelector((state) => state.animeFilter.list)
    const animeSeason = useSelector((state) => state.animeFilter.animeSeason)
    const animeFormat = useSelector((state) => state.animeFilter.animeFormat)
    const animeYear = useSelector((state) => state.animeFilter.animeYear)
    const dispatch = useDispatch();

    function getAnimeID(animeID){
        dispatch(addAnimeID(animeID))
    }

    // GENERATE YEAR FROM CURRENT TO OLDEST ANIME PUBLISHED
    const [yearList, setYearList] = useState([]);
    function getYearsFromArray(currentYear, oldestYear){
        let years = [];
        for (let year = currentYear; year > oldestYear - 1; year--) {
        years.push(year);
        }

        return years;
    }
    
    useEffect(() => {
        const getYears = getYearsFromArray(2025, 1940);
        setYearList(getYears);
    }, [])    

    // ADD THE SELECTED SEASON TO THE REDUX FUNCTION
    function getSelectedSeason() {
        var selectedSeason = document.getElementById("seasons").value;
        dispatch(addAnimeSeason(selectedSeason))
    }
    // ADD THE SELECTED YEAR TO THE REDUX FUNCTION
    function getSelectedYear() {
        var selectedYear = document.getElementById("year").value;
        dispatch(addAnimeYear(selectedYear))
    }
    // ADD THE SELECTED FORMAT TO THE REDUX FUNCTION
    function getSelectedFormat() {
        var selectedFormat = document.getElementById("format").value;
        dispatch(addAnimeFormat(selectedFormat))
    }
    

    // TOGGLE AND ADD GENRE TO REDUX VARIABLE WHEN CLICKED
    function toggleDiv(event){
        const divTextContent = event.target.textContent;

        event.target.classList.toggle('toggled');
        
        // add genre to list when div toggled
        if(event.target.classList.contains('toggled')){
            dispatch(addAnimeGenre(divTextContent))
        }else{
            dispatch(removeAnimeGenre(divTextContent))
        }
    }
    
    
    // DISPLAY ANIMES THAT HAS SAME GENRE THAT USER PICKED
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);

    const [animeList, setAnimeList] = useState([]);

    function fetchAnimeFilter(){
        var selectedSeason = document.getElementById("seasons").value;
        var selectedYear = document.getElementById("year").value;
        var selectedFormat = document.getElementById("format").value;
        
        // DISCARD THE FILTER COMPONENTS IF NO INPUT ARE GIVEN / THE INPUT VALUE IS '' (EMPTY)
        const season = selectedSeason === "" ? "" : `season: ${animeSeason}`
        const seasonYear = selectedYear === "" ? "" : `seasonYear: ${animeYear}`
        const format = selectedFormat === "" ? "" : `format: ${animeFormat}`

        const fetchAnime = async () => {
            const query = `
                query {
                    Page(page: ${currentPage}, perPage: 18) {
                        
                        pageInfo{
                                currentPage
                                lastPage
                        }
                        media(genre_in: ${JSON.stringify(animeGenreList)}, type: ANIME, sort: POPULARITY_DESC, ${season}, ${seasonYear} ${format}) {
                            id
                            title {
                                romaji
                                english
                                native
                            }
                            coverImage {
                                large
                            }
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
            } 
        };

        fetchAnime();

    }

    function nextPage(){
        if(currentPage >= lastPage){
            alert('You are already at the last page')
        }else{
            setCurrentPage(currentPage + 1);
        }   
    }
    function prevPage(){
        if(currentPage <= 1){
            alert('You are already at the first page')
        }else{
            setCurrentPage(currentPage - 1);
        }
    }
    // RE-RENDER THE FETCHING OF API IF PAGE IS CHANGED
    useEffect(() => {
        // eslint-disable-next-line
        fetchAnimeFilter()
    }, [currentPage])

    // FETCH GENRE COLLECTION IN ANILIST API
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
        try {
            const response = await axios.post('https://graphql.anilist.co', {
            query: `
                query {
                GenreCollection
                }
            `,
            });

            setGenres(response.data.data.GenreCollection);
            
        } catch (error) {
            console.error('Error fetching genre collection: ', error);
        }
        };

        fetchGenres();
    }, []);

    return(
        <div id='filterPage_container'>
            {/* TOP NAVIGATION BAR */}
            <TopNavBar/>
            <div id='filter-genre_container'>
                <div id='filter'>
                    <div>
                        <div id='select_filter_container'>
                            <div>
                                <div>Season</div>
                                <select name="seasons" id="seasons" onChange={getSelectedSeason}>
                                    <option value="">All</option>
                                    <option value="WINTER">Winter</option>
                                    <option value="SPRING">Spring</option>
                                    <option value="SUMMER">Summer</option>
                                    <option value="FALL">Fall</option>
                                </select>
                            </div>
                            <div>
                                <div>Year</div>
                                <select name='year' id='year' onChange={getSelectedYear}>
                                    <option value="">All</option>
                                    {yearList.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div>Format</div>
                                <select name="format" id="format" onChange={getSelectedFormat}>
                                    <option value="">All</option>
                                    <option value="TV">Tv</option>
                                    <option value="TV_SHORT">Tv_short</option>
                                    <option value="MOVIE">Movie</option>
                                    <option value="SPECIAL">Special</option>
                                    <option value="OVA">Ova</option>
                                    <option value="ONA">Ona</option>
                                </select>
                            </div>
                        </div>
                        <div id='genre'>
                            <div style={{fontSize: '17px'}}>Genre</div>
                            <div id='genreContainer'>
                                {genres.map((genre) => (
                                <div onClick={toggleDiv} key={genre} className="genreStyle">{genre}</div>
                                ))}
                            </div>
                        </div>
                        <button onClick={fetchAnimeFilter} id='filter_done_button'><div>Filter</div></button>
                    </div>
                </div>
            </div>

            <div id='trending_anime_flex_container'>
                <h1>Current Page: {currentPage} | Last Page: {lastPage}</h1>
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

        </div>
    )

}

export default FilterPage;