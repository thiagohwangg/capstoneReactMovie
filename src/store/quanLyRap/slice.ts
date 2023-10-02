import { createSlice } from "@reduxjs/toolkit"
import { Cinema, ShowTimes, ShowTimesDetail} from "types"
import { getCinemaListThunk, getShowTimesDetailThunk, getShowTimesListThunk } from "."

type QuanLyRapInitialState = {
    cinemaList ?: Cinema[],
    showTimesList ?: ShowTimes[],
    showTimesDetail ?: ShowTimesDetail
}

const initialState: QuanLyRapInitialState = {

}

const quanLyRapSlice = createSlice({
    name :"quanLyRap",
    initialState,
    reducers :{},
    extraReducers(builder){
        builder
        .addCase(getCinemaListThunk.fulfilled, (state,{payload}) => {
            state.cinemaList = payload
        })
        .addCase(getShowTimesListThunk.fulfilled,(state, {payload}) => {
            state.showTimesList = payload
        })
        .addCase(getShowTimesDetailThunk.fulfilled,(state , {payload}) => {
            state.showTimesDetail = payload
        })
    } 
})

export const {reducer : quanLyRapReducer , actions : quanLyRapActions} = quanLyRapSlice
