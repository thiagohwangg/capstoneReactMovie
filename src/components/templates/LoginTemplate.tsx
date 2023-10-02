import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSchema, LoginSchemaType } from "schema";
import { RootState, loginThunk, useAppDispatch } from "store";
import { handleError } from "utils";

export const LoginTemplate = () => {
    const { isFetchingLogin} = useSelector((state: RootState) => state.quanLyNguoiDung)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema),
    });
    const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
        // try {
        //     await quanLyNguoiDungServices.login(values);
        //     toast.success("Đăng nhập thành công");
        // } catch (error) {
        //     // Xử lý lỗi khi gửi yêu cầu API
        //     handleError(error)
        // }
        dispatch(loginThunk(values))
            .unwrap()
            .then(() => {
                toast.success("Đăng nhập thành công")
                navigate("/");
            })
            .catch((err)=>{
                handleError(err)
            })
    };
    return (
        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-500 text-30">Đăng nhập</h2>
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
            <Button
                htmlType="submit"
                className="mt-20 "
                type="primary"
                size="large"
                loading = {isFetchingLogin}
            >
                Đăng nhập
            </Button>
        </form>
    );
};
