import { Card, Skeleton, Tabs } from "components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getBannerListThunk, getMovieListThunk } from "store/quanLyPhim";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getCinemaListThunk, getShowTimesListThunk } from "store/quanLyRap";
import {  generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";

export const HomeTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { movieList, isFetchinhMovieList, bannerList } = useSelector(
        (state: RootState) => state.quanLyPhim
    );



    useEffect(() => {
        dispatch(getCinemaListThunk());
        dispatch(getMovieListThunk({ a: "GP08", b: "GP03" }));
        dispatch(getBannerListThunk());
        dispatch(getShowTimesListThunk());
    }, [dispatch]);

    if (isFetchinhMovieList) {
        return (
            <div className="grid grid-cols-4">
                {[...Array(12)].map((_, index) => {
                    return (
                        <Card className="!w-[300px] !mt-20" key={index}>
                            <Skeleton.Image className="!w-full !h-[250px]" />
                            <Skeleton.Input className="!w-full mt-16" />
                            <Skeleton.Input className="!w-full mt-16" />
                        </Card>
                    );
                })}
            </div>
        );
    }
    return (
        <div>
            <div>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => {
                        /*..*/
                    }}
                >
                    {bannerList?.map((banner) => (
                        <SwiperSlide key={banner.maBanner}>
                            <img
                                className="w-full max-h-[720px] !p-0"
                                src={banner.hinhAnh}
                                alt=""
                            />{" "}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="p-11">
                <Tabs
                    tabPosition="top"
                    items={[
                        {
                            key: "MovieList",
                            label: "Danh sách phim",
                            children: (
                                <div className="grid grid-cols-5">
                                    {movieList?.map((movie) => (
                                        <div
                                            className="mt-30"
                                            key={movie.maPhim}
                                        >
                                            <Card
                                                key={movie?.maPhim}
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={
                                                    <img
                                                        style={{ height: 300 }}
                                                        alt="example"
                                                        src={movie?.hinhAnh}
                                                    />
                                                }
                                            >
                                                <Card.Meta
                                                    className="h-[120px]"
                                                    title={movie?.tenPhim}
                                                    description={`${movie?.moTa.substring(
                                                        0,
                                                        50
                                                    )}...`}
                                                />
                                                <button
                                                    className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                                                    onClick={() => {
                                                        const path =
                                                            generatePath(
                                                                PATH.movieDetail,
                                                                {
                                                                    movieID:
                                                                        movie.maPhim,
                                                                }
                                                            );
                                                        navigate(path);
                                                    }}
                                                >
                                                    Chi tiết phim
                                                </button>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            key: "NowShowing",
                            label: "Phim Đang Chiếu",
                            children: (
                                <div className="grid grid-cols-5">
                                    {movieList?.map((movie) =>
                                        movie.dangChieu ? (
                                            <div
                                                className="mt-30"
                                                key={movie.maPhim}
                                            >
                                                <Card
                                                    key={movie?.maPhim}
                                                    hoverable
                                                    style={{ width: 240 }}
                                                    cover={
                                                        <img
                                                            style={{
                                                                height: 300,
                                                            }}
                                                            alt="example"
                                                            src={movie?.hinhAnh}
                                                        />
                                                    }
                                                >
                                                    <Card.Meta
                                                        className="h-[120px]"
                                                        title={movie?.tenPhim}
                                                        description={`${movie?.moTa.substring(
                                                            0,
                                                            50
                                                        )}...`}
                                                    />
                                                    <button
                                                        className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                                                        onClick={() => {
                                                            const path =
                                                                generatePath(
                                                                    PATH.movieDetail,
                                                                    {
                                                                        movieID:
                                                                            movie.maPhim,
                                                                    }
                                                                );
                                                            navigate(path);
                                                        }}
                                                    >
                                                        Chi tiết phim
                                                    </button>
                                                </Card>
                                            </div>
                                        ) : undefined
                                    )}
                                </div>
                            ),
                        },
                        {
                            key: "UpComingMovie",
                            label: "Phim Sắp Chiếu",
                            children: (
                                <div className="grid grid-cols-5">
                                    {movieList?.map((movie) =>
                                        !movie.dangChieu ? (
                                            <div
                                                className="mt-30"
                                                key={movie.maPhim}
                                            >
                                                <Card
                                                    key={movie?.maPhim}
                                                    hoverable
                                                    style={{ width: 240 }}
                                                    cover={
                                                        <img
                                                            style={{
                                                                height: 300,
                                                            }}
                                                            alt="example"
                                                            src={movie?.hinhAnh}
                                                        />
                                                    }
                                                >
                                                    <Card.Meta
                                                        className="h-[120px]"
                                                        title={movie?.tenPhim}
                                                        description={`${movie?.moTa.substring(
                                                            0,
                                                            50
                                                        )}...`}
                                                    />
                                                    <button
                                                        className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                                                        onClick={() => {
                                                            const path =
                                                                generatePath(
                                                                    PATH.movieDetail,
                                                                    {
                                                                        movieID:
                                                                            movie.maPhim,
                                                                    }
                                                                );
                                                            navigate(path);
                                                        }}
                                                    >
                                                        Chi tiết phim
                                                    </button>
                                                </Card>
                                            </div>
                                        ) : undefined
                                    )}
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

        </div>
    );
};
