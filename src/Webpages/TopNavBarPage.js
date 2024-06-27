import '../stylesFolder/topNavBar.css'
import { Link, useNavigate } from 'react-router-dom';

import { addSearchAnimeString } from '../redux';
import { useDispatch, useSelector} from 'react-redux';

function TopNavBar(){
    const dispatch = useDispatch();
    const searchedAnime = useSelector((state) => state.animeFilter.searchedAnime);

    const navigate = useNavigate();
    
    function searchClick(){
        const searchBar = document.getElementById('top_bar_search_bar');
        if(searchBar.value !== ''){
            dispatch(addSearchAnimeString(searchBar.value));
            console.log(searchedAnime)
            navigate('/search-anime');
        }else{
            alert('Empty string :: Please input a value')
        }
    }
    return (
        <div id="top_navbar">
            <div id='top_bar_container'>
                <div id='search_bar_container'>
                    <Link to='/AnimeWebsite/home'><div id='navBar_home_button'>Home</div></Link>
                    <input id='top_bar_search_bar' type='text' placeholder='Enter anime name...'/>
                    <div id='search_bar_icon_container'>
                    <div onClick={searchClick}>
                        <svg width="28px" height="28px" viewBox="0 0 24.00 24.00" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </div>
                    <Link to='/AnimeWebsite/filter'><div id='filter_button'>Filter</div></Link>
                    </div>
                </div>
                <div id='sign_in_button'> Sign In </div>
            </div>
        </div>

    )
}

export default TopNavBar;