import { createSlice } from "@reduxjs/toolkit";
import {HistoRyBooking, UserByAccessToken, UserLogin} from "types"
import { getHistoryBookingThunk, getUserByAccessTokenThunk, loginThunk } from ".";
import { getAccessToken } from "utils";

type QuanLyNguoiDungInitialState = {
    accessToken?: string,
    userLogin?: UserLogin | UserByAccessToken,
    isFetchingLogin ?: boolean,
    historyBooking ?: HistoRyBooking
}

const initialState: QuanLyNguoiDungInitialState = {
    accessToken : getAccessToken(),
    isFetchingLogin : false 
};

const quanLyNguoiDungSlice = createSlice({
    name: "quanLyNguoiDung",
    initialState,
    reducers: {
        logOut : (state) => {
            state.accessToken = undefined
            state.userLogin = undefined
            localStorage.removeItem("ACCESSTOKEN")
        },
        update : (state, {payload}) => {
            state.userLogin = payload
        }        
    }, // Xử lý đồng bộ
    extraReducers(builder) {
        // Xử lý bất đồng bộ (call API)
        builder
        .addCase(loginThunk.pending , (state) => {
            state.isFetchingLogin = true
        })
        .addCase(loginThunk.fulfilled , (state, {payload}) => {
            // Lưu  accessToken lên local
            localStorage.setItem("ACCESSTOKEN" , payload.accessToken)
            state.accessToken = payload.accessToken
            // Set lại cái user
            state.userLogin = payload
            state.isFetchingLogin = false
            
        })
        .addCase(loginThunk.rejected , (state) => {
            state.isFetchingLogin = false
        })

        .addCase(getUserByAccessTokenThunk.fulfilled , (state, {payload}) =>{
            state.userLogin = payload
        })
        .addCase(getHistoryBookingThunk.fulfilled, (state , {payload}) => {
            state.historyBooking = payload
        })
    }
});

export const {
    actions: quanLyNguoiDungActions,
    reducer: quanLyNguoiDungReducer,
} = quanLyNguoiDungSlice;
