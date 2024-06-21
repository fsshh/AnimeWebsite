import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TopNavBar from './TopNavBarPage';
// CSS Styles
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
  
  // FETCH TOP 10 ANIME FROM API
  const [topAnimeList, setTopAnimeList] = useState([])
  useEffect(() => {
    const fetchTopAnime = async () => {
      const query = `
        query {
          Page(page: 1, perPage: 10) {
            media(type: ANIME, sort: SCORE_DESC) {
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
        setTopAnimeList(response.data.data.Page.media);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      }
    };

    fetchTopAnime();
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
      <TopNavBar/>

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
          <Link to='/trending-anime'><div>{'See All >'}</div></Link>
        </div>
      </div>
      <div id='anime_sliding_cards_container'>
          {animeList.map(trendingAnime => (
            <div key={trendingAnime.id} className='anime_sliding_card_items' style={{width: `${cardWidth}px`, height: `auto`}}>
              <img style={{width:'auto', height: `${cardHeight}px`}} src={trendingAnime.coverImage.large} alt='anime_cover_image'></img>
              <div style={{width: `${textWidth}px`}} className='anime_sliding_card_info_container'>
                <div className='anime_sliding_card_info'>Sub | Dub</div>
                <div className='anime_sliding_card_info'>{trendingAnime.title.english}</div>
              </div>
            </div>
          ))}
      </div>
      <div id='topAnime_flex_container'>
        <div id='topAnime_texts'>
          <h1>Top 100 Anime</h1>
          <Link to='/top-anime'><div>See all {'>'}</div></Link>
        </div>
        <div id='topAnime_container'>
            {topAnimeList.map(topAnime => (
              <div key={topAnime.id} className='topAnime_card_container'>
              <img src={topAnime.coverImage.large} alt='topAnime_cover_image'></img>
              <div className='topAnime_title'>{topAnime.title.english}</div>
              </div>
            ))}
        </div>

      </div>
      </div>
    
  );
}

export default HomePage;  

