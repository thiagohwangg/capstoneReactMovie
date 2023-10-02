import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVeServices } from "services";
import { Booked } from "types";

export const getBoxOfficeList = createAsyncThunk(
    "quanLyDatVe/getBoxOfficeList",
    async (payload: number, { rejectWithValue }) => {
        try {
            const data = await quanLyDatVeServices.getBoxOfficeList(payload);
            return data.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const postBooking = createAsyncThunk(
    "quanLyDatVe/postBooking",
    async (
        payload: Booked,
        { rejectWithValue }
    ) => {
        try {
            const data = await quanLyDatVeServices.postBooked(payload);            
            return data.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
