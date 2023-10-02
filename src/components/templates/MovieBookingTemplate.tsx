import { Button } from "components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, getBoxOfficeList, postBooking, useAppDispatch } from "store";
import styled from "styled-components";
import cn from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { sleep } from "utils";
import { PATH } from "constant";

export const MovieBookingTemplate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { boxOfficeList } = useSelector(
        (state: RootState) => state.quanLyDatVe
    );
    const {id} = useParams()
    
    const [booking, setBooking] = useState<string[]>([]);
 
    useEffect(() => {
        dispatch(getBoxOfficeList(Number(id)));
    }, [dispatch,id]);
    return (
        <div>
            <div className="px-[350px]">
                <div className="manHinh mb-[50px]"></div>
                <div className="grid grid-cols-12 px-[40px] gap-10">
                    {boxOfficeList?.danhSachGhe?.map((v) => {
                        return (
                            <Chair
                                key={v.tenGhe}
                                
                            >
                                <div
                                    className={cn("chair w-auto",{
                                        booking: booking?.includes(v.tenGhe),
                                        booked : v.daDat 
                                    })}
                                    onClick={() => {
                                        if (booking?.includes(v.tenGhe)) {
                                            setBooking((prevState) =>
                                                prevState.filter(
                                                    (e) => e !== v.tenGhe
                                                )
                                            );
                                            return;
                                        }
                                        setBooking([...booking, v.tenGhe]);
                                    }}
                                >
                                    {v.tenGhe}
                                </div>
                            </Chair>
                        );
                    })}
                </div>
            </div>
            <BG>
                {boxOfficeList ? (
                    <div className="flex">
                        <div className="w-4/12">
                            <img
                                className="max-w-[250px] rounded-5"
                                src={boxOfficeList.thongTinPhim.hinhAnh}
                                alt=""
                            />
                        </div>
                        <div className="w-8/12">
                            <h1 className="text-[35px] text-[var(--cerise-red-800)]">
                                {boxOfficeList?.thongTinPhim.tenPhim}
                            </h1>
                            <div>
                                <p className="text-20 text-[var(--cerise-red-700)] my-20">
                                    Tài khoản :{" "}
                                    <span className="text-16 text-black">
                                        {boxOfficeList?.danhSachGhe[0].taiKhoanNguoiDat}
                                    </span>
                                </p>
                                <p className="text-20 text-[var(--cerise-red-700)] my-20">
                                    Số Ghế :{" "}
                                    {booking?.map((v) => (
                                        <span className="text-16 text-black">
                                            {v}{" "}
                                        </span>
                                    ))}
                                </p>
                                <p className="text-20 text-[var(--cerise-red-700)] my-20">
                                    Rạp :{" "}
                                    <span className="text-16 text-black">
                                        {boxOfficeList?.danhSachGhe[0].maRap}
                                    </span>
                                </p>
                            </div>
                            <Button
                                className="!h-[46px] !text-white "
                                color="green"
                                onClick={()=>{
                                    const danhSachVe = boxOfficeList?.danhSachGhe?.filter(e => booking.includes(e.tenGhe))
                                    
                                    dispatch(postBooking({
                                        maLichChieu: boxOfficeList?.thongTinPhim?.maLichChieu,
                                        danhSachVe
                                    })).unwrap() // Giả sử action return một promise, unwrap sẽ giúp nhận kết quả của promise đó
                                    .then(() => {
                                        toast.success("Đặt vé thành công")
                                        sleep(2000)
                                        navigate(PATH.account)
                                    })
                                    .catch((error) => {
                                        toast.error(error)
                                    });
                                    
                                }}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </BG>
        </div>
    );
};

const Chair = styled.div`
    .chair {
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        text-align: center;
        &:hover {
            background-color: blueviolet;
        }
        &.booking {
            background-color: blue;
        }
        &.booked{
            pointer-events: none;
            background-color: gray;
        }
    }
`;

const BG = styled.div`
    background-color: var(--cerise-red-200);
    height: auto;
    padding: 20px;
    margin-top: 40px;
`;
