import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchemaType } from "schema";
import { quanLyNguoiDungServices } from "services";
import { Update } from "types";
import { getAccessToken } from "utils";
import { sleep } from "utils/sleep";

export const loginThunk = createAsyncThunk(
    "quanLyNguoiDung/login",
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.login(payload);
            await sleep(1500);
            return data.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getUserByAccessTokenThunk = createAsyncThunk(
    "quanLyNguoiDung/getUserByAccessToken",
    async (_, { rejectWithValue }) => {
        try {
            const token = getAccessToken();
            if (token) {
                const data =
                    await quanLyNguoiDungServices.getUserByAccessToKen();
                return data.data.content;
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getHistoryBookingThunk = createAsyncThunk(
    "quanLyNguoiDung/getHistoryBooking",
    async(_,{rejectWithValue}) => {
        try{
            const token = getAccessToken()
            if(token) {
                const data = await quanLyNguoiDungServices.getHistoryBooking();
                return data.data.content
            }
        } catch(err) {
            return rejectWithValue(err)
        }
    }
)

export const putUpdateInfoThunk = createAsyncThunk(
    "quanLyNguoiDung/putUpdateInfo",
    async(payload : Update, {rejectWithValue}) => {
        try {
            const data = await quanLyNguoiDungServices.updateAccount(payload)
            return data.data.content
        } catch(err) {
            return rejectWithValue(err)
        }
    }
)
// export const UpdateAccountThunk = createAsyncThunk(
//     'UpdateAccountThunk',
//     async (payload: UpdateUser, { rejectWithValue }) => {
//         try {
//             const data = await quanLyNguoiDungService.updateAccount(payload);
//             await sleep(1000);
//             return data.data.content;
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     },
// );