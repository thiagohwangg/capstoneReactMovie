import { createSlice } from "@reduxjs/toolkit";
import { Banner, Movie } from "types";
import { getBannerListThunk, getMovieListThunk } from ".";

type QuanLyPhimInitialState = {
    movieList ?: Movie[],
    isFetchinhMovieList ?: boolean
    bannerList ?: Banner[],
}

const initialState : QuanLyPhimInitialState = {

}

const quanLyPhimSlice = createSlice({
    name:"quanLyPhim",
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(getMovieListThunk.pending, (state) =>{
            state.isFetchinhMovieList = true
        })
        .addCase(getMovieListThunk.fulfilled, (state , {payload}) => {
            state.movieList = payload
            state.isFetchinhMovieList = false
        })
        .addCase(getMovieListThunk.rejected, (state)=>{
            state.isFetchinhMovieList = false
        })
        .addCase(getBannerListThunk.fulfilled, (state, {payload}) => {
            state.bannerList = payload
        })
    }
})

export const {reducer : quanLyPhimReducer , actions : quanLyPhimActions} = quanLyPhimSlice