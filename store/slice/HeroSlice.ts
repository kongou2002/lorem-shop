//create image slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeroById } from "../../api/heroApi";

export const getHero = createAsyncThunk("hero/getHero", async (id: number) => {
    const response = await getHeroById(id);
    return response.data;
});

export const heroSlice = createSlice({
    name: "hero",
    initialState: {
        hero: null,
        loading: false,
        error: null,
    },
    reducers: {
        getHero: (state) => {
            state.loading = true;
        }
    },
    extraReducers: {
        [getHeroById]: (state:getHeroById, action:getHeroById) => {
            state.hero = action.payload;
            state.loading = false;
        }
    }
})