import { apiInstance } from "constant";
import { LoginSchemaType, RegisterSchemaType } from "schema";
import { HistoRyBooking, Update, UserByAccessToken, UserLogin } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});
export const quanLyNguoiDungServices = {
    register: (data: RegisterSchemaType) => api.post("/DangKy", data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>("/DangNhap", data),
    getUserByAccessToKen : ()=> api.post<ApiResponse<UserByAccessToken>>("/ThongTinTaiKhoan"),
    getHistoryBooking : ()=> api.post<ApiResponse<HistoRyBooking>>("/ThongTinTaiKhoan"),
    updateAccount: (value: Update) => api.put<ApiResponse<Update>>('/CapNhatThongTinNguoiDung',value)
};
