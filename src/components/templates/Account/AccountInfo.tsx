import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "components";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AccountSchema, AccountSchemaType } from "schema/AccountSchema";
import { putUpdateInfoThunk, useAppDispatch } from "store";
import { Update } from "types";

export const AccountInfo = () => {
    const dispatch = useAppDispatch()
    const { user } = useAuth();
    const {
        reset,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AccountSchemaType>({
        resolver: zodResolver(AccountSchema),
        mode: "onBlur"
    });

    
    const onSubmit : SubmitHandler<AccountSchemaType> = (value) =>{
        // gọi api update tài khoản
        
        
        // dispatch actions getUsserByAccessToken
        const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = value;

        const updateData: Update = {
            taiKhoan,
            matKhau,
            email,
            soDt,
            maNhom,
            maLoaiNguoiDung: 'KhachHang',
            hoTen,
        };

        dispatch(putUpdateInfoThunk(updateData))
            .unwrap()
            .then(() => toast.success('Cập nhật thành công!'));

    } 

    useEffect(() => {
        reset({
            ...user,
            soDt: user?.soDT,
        });
    }, [reset, user]);
    return (
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-20 font-600">Thông tin tài khoản</p>
            <Input
                label="Tài khoản"
                id="taiKhoan"
                name="taiKhoan"
                register={register}
                error= {errors?.taiKhoan?.message}
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <Input
                label="Họ Tên"
                name="hoTen"
                id="hoTen"
                register={register}
                error= {errors?.hoTen?.message}
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <Input
                label="Email"
                id="email"
                name="email"
                error= {errors?.email?.message}
                register={register}
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <Input
                label="Số điện thoại"
                id="soDt"
                name="soDt"
                register={register}
                error= {errors?.soDt?.message}
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <Input
                label="Mã Nhóm"
                id="maNhom"
                name="maNhom"
                register={register}
                error= {errors?.maNhom?.message}
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <Input
                label="Mã loại người dùng"
                name="maLoaiNguoiDung"
                register={register}
                error= {errors?.maLoaiNguoiDung?.message}
                id="maLoaiNguoiDung"
                className="[&>input]:bg-transparent [&>input]:border-black [&>input]:border"
            />
            <div className="text-right mt-20">
                <Button htmlType="submit" type="primary" className="!h-[46px]" onClick={(event) => {
                    console.log(event.target);
                    
                }}>
                    Hoàn thành chỉnh sửa
                </Button>
            </div>
        </form>
    );
};
