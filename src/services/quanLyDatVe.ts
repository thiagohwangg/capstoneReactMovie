import { apiInstance } from "constant";
import { Booked, BoxOfficeList } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE_API,
});

export const quanLyDatVeServices ={
    getBoxOfficeList : (query = 0) => api.get<ApiResponse<BoxOfficeList>>(`/LayDanhSachPhongVe?MaLichChieu=${query}`),
    postBooked : (value : Booked) => api.post<ApiResponse<string>>("/DatVe",value)
}