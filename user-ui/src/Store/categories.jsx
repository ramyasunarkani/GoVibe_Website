import { createSlice } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"category",
    initialState:{
        categories:[],
    },
    reducers:{
        replaceCategories(state,action){
            state.categories=action.payload;
        }
    }
})
export const categoryAction=categorySlice.actions;
export default categorySlice.reducer;