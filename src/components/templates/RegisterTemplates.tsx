import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { toast } from "react-toastify";
import { quanLyNguoiDungServices } from "services";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { Input } from "components";
import { handleError } from "utils";

export const RegisterTemplates = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(RegisterSchema),
    });
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
        try {
            await quanLyNguoiDungServices.register(values);
            toast.success("Đăng kí thành công");
            navigate(PATH.login);
        } catch (err) {
            handleError(err)
        }
    };
    return (
        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-white font-500 text-30">Đăng kí</h2>
            <Input
                label="Tài Khoản"
                id="taiKhoan"
                placeholder="Tài khoản"
                className="mt-16"
                error={errors?.taiKhoan?.message}
                register={register}
            />
            <Input
                label="Mật khẩu"
                id="matKhau"
                placeholder="Mật Khẩu"
                register={register}
                className="mt-16"
                error={errors?.matKhau?.message}
                type="password"
            />
            <Input
                label="Họ Tên"
                id="hoTen"
                placeholder="Họ Tên"
                register={register}
                error={errors?.hoTen?.message}
                className="mt-16"
            />
            <Input
                label="Email"
                id="email"
                placeholder="Email"
                register={register}
                error={errors?.email?.message}
                className="mt-16"
            />
            <Input
                label="Số điện thoại"
                id="soDt"
                placeholder="Số điện thoại"
                register={register}
                error={errors?.soDt?.message}
                className="mt-16"
            />
            <Input
                label="Mã Nhóm"
                id="maNhom"
                placeholder="Mã Nhóm"
                register={register}
                error={errors?.maNhom?.message}
                className="mt-16"
            />
            <button className="w-full p-10 bg-red-500 mt-24 rounded-10">
                Đăng ký{" "}
            </button>
        </form>
    );
};
