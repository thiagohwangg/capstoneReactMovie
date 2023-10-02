import { apiInstance } from "constant";
import { Cinema, ShowTimes, ShowTimesDetail } from "types";

const api = apiInstance({
    baseURL : import.meta.env.VITE_QUAN_LY_RAP_API
})

export const quanLyRapService = {
    getCinemaList : () => api.get<ApiResponse<Cinema[]>>("/LayThongTinHeThongRap"),
    getShowTimesList : () => api.get<ApiResponse<ShowTimes[]>>("/LayThongTinLichChieuHeThongRap"),
    getShowTimesDetail : (query = 0) => api.get<ApiResponse<ShowTimesDetail>>(`/LayThongTinLichChieuPhim?MaPhim=${query}`)
}