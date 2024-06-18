import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// CSS Styles
import '../stylesFolder/topNavBar.css'
import '../stylesFolder/homePage.css'

function HomePage() {
  // FETCH ANILIST API
  const [animeList, setAnimeList] = useState([]);
  
  useEffect(() => {
    const fetchTrendingAnime = async () => {
      const query = `
        query {
          Page(page: 1, perPage: 10) {
            media(type: ANIME, sort: TRENDING_DESC) {
              id
              title {
                english
              }
              coverImage {
                large
              }
            }
          }
        }
      `;

      try {
        const response = await axios.post('https://graphql.anilist.co', {
          query: query
        });
        setAnimeList(response.data.data.Page.media);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      }
    };

    fetchTrendingAnime();
  }, []);

  // TRANSITION OF HOME ANIME SHOWCARD
  function AnimeItemTransition(){
    const anime_images_item = document.querySelectorAll('.anime_images_item');
    let anime_item_idNum = 0;

    anime_images_item[0].style.display = 'block'
    
    setInterval(() => {
      if(anime_item_idNum >= 3){
        anime_item_idNum = 1;
      }else{
        anime_item_idNum++;
      }
      anime_images_item.forEach(animeItem =>{
        if(animeItem.classList.contains(anime_item_idNum)){
          animeItem.style.display = 'block'
        }else{
          animeItem.style.display = 'none'
        }
      })
    }, 9000);

  }
  useEffect(() => {
    AnimeItemTransition()
  }, [])
  

  // CHANGE TRENDING ANIME CARD WIDTH AND HEIGHT BASED ON SCREEN DIMENSION
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const [textWidth, setTextWidth] = useState(0);

  // Initial and minimum dimensions of card
  const initialCardWidth = 135;
  const initialCardHeight = 300;

  // The amount of pixels added to the card dimension per 1 pixel added on windows dimension
  const cardIncreasedWidth = 0.5;
  const cardIncreasedHeight = 0.75;

  // Function to calculate and set card dimensions based on window width
  const updateCardDimensions = () => {
    const windowWidth = window.innerWidth;
    // get the difference of window and card dimension to add them to the current card dimension
    const window_and_card_width_Subtraction = windowWidth - initialCardWidth;
    const window_and_card_height_Subtraction = (windowWidth - initialCardHeight) - 100;
    
    let newCardWidth = initialCardWidth;
    let newCardHeight = initialCardHeight;

    let newTextWidth = initialCardWidth;

    // adjust the card width accordingly
    if(windowWidth <= 470){
      newCardWidth = initialCardWidth + (cardIncreasedWidth * window_and_card_width_Subtraction);
      newCardHeight = initialCardHeight + (cardIncreasedHeight * window_and_card_height_Subtraction);
    
      // adjust the text width accordingly so it doesn't overlap to the card width
      newTextWidth = newCardWidth - 60;
    }else if(windowWidth <= 560 && windowWidth > 470){
      newCardWidth = initialCardWidth + (cardIncreasedWidth * window_and_card_width_Subtraction) - 150;
      newCardHeight = initialCardHeight + (cardIncreasedHeight * window_and_card_height_Subtraction) - 150;
      
      // adjust the text width accordingly so it doesn't overlap to the card width
      newTextWidth = newCardWidth - 15;
    }else if(windowWidth > 560){
      newCardWidth = initialCardWidth + 100;
      newCardHeight = initialCardHeight;

      // adjust the text width accordingly so it doesn't overlap to the card width
      newTextWidth = newCardWidth - 40;
    }
    setCardWidth(newCardWidth);
    setCardHeight(newCardHeight);

    setTextWidth(newTextWidth)
  };

  // Set up event listener for window resize
  useEffect(() => {
    updateCardDimensions(); // Initial calculation

    window.addEventListener('resize', updateCardDimensions);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCardDimensions);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleanup on unmount



  return (
    <div id='home_page_container'>
      {/* TOP NAVIGATION BAR */}
      <div id="top_navbar">
        <div id='top_bar_container'>
          <div id='search_bar_container'>
            <input id='top_bar_search_bar' type='text' placeholder='Enter anime name...'/>
            <div id='search_bar_icon_container'>
              <div>
                <svg width="28px" height="28px" viewBox="0 0 24.00 24.00" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#111111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
              </div>
              <Link to='/filter'><div id='filter_button'>Filter</div></Link>
            </div>
          </div>
          <div id='sign_in_button'> Sign In </div>
        </div>
      </div>

      {/* HOME ANIME IMAGES */}
      <div id="home_image_container">
        <div className="anime_images_item 1">
          <div>
            <img src={require('../images/one_piece_logo.png')} alt='one_piece_logo'></img>
            <div style={{color:"#A7A7A7"}}>Sub | Dub</div>
            <div id='anime_description'>
              {`Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. 
              The capture and death of Roger by the World Government brought a change throughout the world. His last words before 
              his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought 
              about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches 
              and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.`}
            </div>
            <div id='watch_favorite_flexbox'>
              <div id='anime_watch_button' style={{color: 'black'}}>START WATCHING E1</div>
              <div id='anime_favorite_button'></div>
            </div>
          </div>
        </div>
        <div className="anime_images_item 2">
          <div>
            <img src={require('../images/naruto_logo.png')} alt='naruto_logo'></img>
            <div style={{color:"#A7A7A7"}}>Sub | Dub</div>
            <div id='anime_description'>
              {`Naruto Uzumaki, a hyperactive and knuckle-headed ninja, lives in Konohagakure, the Hidden Leaf village. Moments prior 
              to his birth, a huge demon known as the Kyuubi, the Nine-tailed Fox, attacked Konohagakure and wreaked havoc. In order 
              to put an end to the Kyuubi's rampage, the leader of the village, the 4th Hokage, sacrificed his life and sealed the monstrous 
              beast inside the newborn Naruto.`}
            </div>
            <div id='watch_favorite_flexbox'>
              <div id='anime_watch_button' style={{color: 'black'}}>START WATCHING E1</div>
              <div id='anime_favorite_button'></div>
            </div>
          </div>
        </div>
        <div className="anime_images_item 3">
          <div>
            <img src={require('../images/bleach_logo.png')} alt='bleach_logo'></img>
            <div style={{color:"#A7A7A7"}}>Sub | Dub</div>
            <div id='anime_description'>
              {`Ichigo Kurosaki is a rather normal high school student apart from the fact he has the ability to see ghosts. This ability 
              never impacted his life in a major way until the day he encounters the Shinigami Kuchiki Rukia, who saves him and his family's 
              lives from a Hollow, a corrupt spirit that devours human souls.`}
            </div>
            <div id='watch_favorite_flexbox'>
              <div id='anime_watch_button' style={{color: 'black'}}>START WATCHING E1</div>
              <div id='anime_favorite_button'></div>
            </div>
          </div>
        </div>
      </div>

      {/* TRENDING ANIME CARDS */}
      <div id='sliding_card_texts'>
        <div>
          <h1>TRENDING NOW</h1>
          <div>{'See All >'}</div>
        </div>
      </div>
      <div id='anime_sliding_cards_container'>
        {animeList.map(anime => (
          <div key={anime.id} className='anime_sliding_card_items' style={{width: `${cardWidth}px`, height: `auto`}}>
            <img style={{width:'auto', height: `${cardHeight}px`}} src={anime.coverImage.large} alt='anime_cover_image'></img>
            <div style={{width: `${textWidth}px`}} className='anime_sliding_card_info_container'>
              <div className='anime_sliding_card_info'>Sub | Dub</div>
              <div className='anime_sliding_card_info'>{anime.title.english}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        random text
      </div>

    </div>
    
  );
}

export default HomePage;  

