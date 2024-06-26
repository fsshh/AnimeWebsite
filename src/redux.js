import { createSlice } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";

const initialAnimeGenreList = {
  list: []
}
const initialAnimeSeason = {
  animeSeason: 'null'
}

const initialAnimeFormat ={
  animeFormat: 'null'
}

const initialAnimeYear ={
  animeYear: 'null'
}

const initialAnimeID = {
  animeID: '1'
}
const genreList = createSlice({
  name: 'filter',
  initialState: 
    initialAnimeGenreList, 
    initialAnimeSeason,
    initialAnimeFormat,
    initialAnimeYear,
    initialAnimeID,

  reducers: {
    addAnimeGenre: (state, action) => {
      state.list.push(action.payload);  // Push the new string to the list
    },
    removeAnimeGenre: (state, action) => {
      state.list = state.list.filter(str => str !== action.payload);
    },

    addAnimeSeason: (state, action) =>{
      state.animeSeason = action.payload;
    },

    addAnimeFormat: (state, action) =>{
      state.animeFormat = action.payload;
    },

    addAnimeYear: (state, action) =>{
      state.animeYear = action.payload
    },
    
    addAnimeID: (state, action) =>{
      state.animeID = action.payload
    }
  }
});


export const{ 
  addAnimeGenre, removeAnimeGenre,
  addAnimeSeason, addAnimeFormat, 
  addAnimeYear, addAnimeID} = genreList.actions;

const rootReducer = combineReducers({
    animeFilter: genreList.reducer,
})

const store = createStore(rootReducer)

export default store;