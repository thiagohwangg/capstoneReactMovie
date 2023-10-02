export type UserLogin = {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: "KhachHang" | "QUANTRI";
    accessToken: string;
};

export type UserByAccessToken = Omit<UserLogin, "accessToken"> & {
    thongTinDatVe?: [];
    loaiNguoiDung: {
        maLoaiNguoiDung: "KhachHang" | "QuanTri";
    };
};

export type HistoRyBooking = {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: "KhachHang" | "QUANTRI";
    accessToken: string;
    thongTinDatVe?: {
        danhSachGhe: {
            maCumRap: string;
            maGhe: number;
            maHeThongRap: string;
            maRap: number;
            tenCumRap: string;
            tenGhe: string;
            tenHeThongRap: string;
            tenRap: string;
        }[];
        giaVe: number;
        hinhAnh: string;
        maVe: number;
        ngayDat: string;
        tenPhim: string;
        thoiLuongPhim: number;
    }[];
    loaiNguoiDung: {
        maLoaiNguoiDung: "KhachHang" | "QuanTri";
    };
};

export type Update = {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
};
