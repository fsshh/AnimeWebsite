import { createSlice } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";

const initialStateValueofLandingPage = {
    isLandingPageToggled: true
}

const initialStateValueofHome = {
    isHomeToggled: false
}

const toggleSlice = createSlice({
    name: 'Toggle',
    initialState:{
        initialStateValueofLandingPage,
        initialStateValueofHome,
    },

    reducers:{
        toggleLandingPageOn: (state = initialStateValueofLandingPage) => {
            state.isLandingPageToggled = true
        },
        toggleLandingPageOff: (state = initialStateValueofLandingPage) => {
            state.isLandingPageToggled = false
        },
        toggleHomeOn: (state = initialStateValueofHome) => {
            state.isHomeToggled = true
        },
        toggleHomeOff: (state = initialStateValueofHome) => {
            state.isHomeToggled = false
        }
    }

})


export const{
    toggleLandingPageOn, toggleLandingPageOff,
    toggleHomeOn, toggleHomeOff
} = toggleSlice.actions;

const rootReducer = combineReducers({
    toggled: toggleSlice.reducer,
})

const store = createStore(rootReducer)

export default store;