import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyRapService } from "services/quanLyRap";
import { sleep } from "utils";

export const getCinemaListThunk = createAsyncThunk(
    "quanLyRap/getCinemaList",
    async (_ , {rejectWithValue}) => {
        try{
            const data = await quanLyRapService.getCinemaList();
            await sleep(5000)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getShowTimesListThunk = createAsyncThunk(
    "quanLyRap/getShowTimesList",
    async(_,{rejectWithValue}) =>{
        try{
            const data = await quanLyRapService.getShowTimesList();
            
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getShowTimesDetailThunk = createAsyncThunk(
    "quanLyRap/getShowTimesDetail",
    async(payload :number,{rejectWithValue}) =>{
        try{
            // const data = await quanLyRapService.getShowTimesDetail(Number(payload));
            const data = await quanLyRapService.getShowTimesDetail(payload)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)