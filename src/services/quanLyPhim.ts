import { apiInstance } from "constant";
import { Banner, Movie } from "types";

const api = apiInstance({
    baseURL : import.meta.env.VITE_QUAN_LY_PHIM_API
})

export const quanLyPhimService = {
    getMovieList : (query = "") => api.get<ApiResponse<Movie[]>>(`/LayDanhSachPhim${query}`),
    getBannerList : () => api.get<ApiResponse<Banner[]>>("LayDanhSachBanner")
}