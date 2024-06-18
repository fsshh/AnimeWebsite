import axios from 'axios';

import { Link } from 'react-router-dom';

import '../stylesFolder/topNavBar.css'
import '../stylesFolder/FilterPage.css'

import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAnimeGenre, removeAnimeGenre, 
        addAnimeSeason, addAnimeFormat, 
        addAnimeYear} from '../redux';

function FilterPage(){
    const animeGenreList = useSelector((state) => state.animeFilter.list)
    const animeSeason = useSelector((state) => state.animeFilter.animeSeason)
    const animeFormat = useSelector((state) => state.animeFilter.animeFormat)
    const animeYear = useSelector((state) => state.animeFilter.animeYear)
    const dispatch = useDispatch();

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
    const [animeList, setAnimeList] = useState([]);
    const [apiLoading, setApiLoading] = useState(true);

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
                Page(page: 1, perPage: 10) {
                    media(genre_in: ${JSON.stringify(animeGenreList)}, type: ANIME, ${season}, ${seasonYear} ${format}) {
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
    }
    
    const [genres, setGenres] = useState([]);
    // FETCH GENRE COLLECTION IN ANILIST API
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
            <div id="top_navbar">
                <div id='top_bar_container'>
                <div id='search_bar_container'>
                    <input id='top_bar_search_bar' type='text' placeholder='Enter anime name...'/>
                    <div id='search_bar_icon_container'>
                    <div>
                        <svg width="28px" height="28px" viewBox="0 0 24.00 24.00" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </div>
                    <Link to='/filter'><div id='filter_button'>Filter</div></Link>
                    </div>
                </div>
                <div id='sign_in_button'> Sign In </div>
                </div>
            </div>
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
        </div>
    )

}

export default FilterPage;