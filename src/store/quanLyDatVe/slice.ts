import {  createSlice } from "@reduxjs/toolkit"
import { getBoxOfficeList } from "."
import {  BoxOfficeList } from "types"

type QuanLyDatVeInitialState = {
    boxOfficeList ?: BoxOfficeList
}

const initialState : QuanLyDatVeInitialState = {
}

const quanLyDatVeSilce = createSlice({
    name :"quanLyDatVe",
    initialState,
    reducers :{
    },
    extraReducers(builder) {
        builder
        .addCase(getBoxOfficeList.fulfilled,(state,{payload}) => {
            state.boxOfficeList = payload
        })
    },
})

export const {reducer : quanLyDatVeRuducer , actions : quanLyDatVeActions} = quanLyDatVeSilce