import { Tabs } from "antd";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getShowTimesListThunk } from "store/quanLyRap";
import { lstCumRap } from "types";

export const ShowTimesTemplate = () => {
    const dispatch = useAppDispatch();
    const { showTimesList } = useSelector(
        (state: RootState) => state.quanLyRap
    );
    const { accessToken } = useAuth()
    const returnCumRap = (lstCumRap: lstCumRap[]) => {
        const arr =
            lstCumRap?.slice(0, 5)?.map((v, key) => ({
                key: `${key}`,
                label: v.tenCumRap,
                children: v.danhSachPhim.map((c, key) => {
                    return (
                        <div key={key}>
                            <div className="flex my-20">
                                <div className="w-3/12">
                                    <img
                                        className="w-full max-w-[200px]"
                                        src={c.hinhAnh}
                                        alt=""
                                    />
                                </div>
                                <div className="w-9/12">
                                    <h3 className="text-3xl font-500 dark:text-white mb-3">
                                        {c.tenPhim}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                                        {c.lstLichChieuTheoPhim.map((x) => {
                                            const path = generatePath(PATH.movieBooking, {
                                                id: x.maLichChieu,
                                            });
                                            return (
                                                <Link
                                                    to={accessToken ? path : PATH.login}
                                                    key={x.maLichChieu}
                                                    className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                                                >
                                                    <div className="font-bold">
                                                        {x.ngayChieuGioChieu.slice(
                                                            0,
                                                            10
                                                        )}
                                                    </div>
                                                    <div>
                                                        {x.ngayChieuGioChieu.slice(
                                                            11
                                                        )}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <hr className="my-10 bg-gray-400 h-4" />
                        </div>
                    );
                }),
            })) || [];

        return arr;
    };
    const returnLogo = () => {
        const arr = showTimesList?.map((v, key) => ({
            key: `${key}`,
            label: <img className="max-w-[80px] me-10" src={v?.logo} alt="" />,
            children: (
                <div>
                    <Tabs tabPosition="top" items={returnCumRap(v.lstCumRap)} />
                </div>
            ),
        }));
        return arr;
    };
    useEffect(() => {
        dispatch(getShowTimesListThunk());
    }, [dispatch]);
    return (
        <div className="p-20 ShowTimes">
            {showTimesList ? (
                <Tabs tabPosition="top" items={returnLogo()} />
            ) : (
                ""
            )}
        </div>
    );
};
