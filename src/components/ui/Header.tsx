import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Avatar, Popover } from "components";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { quanLyNguoiDungActions, useAppDispatch } from "store";
import { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import cn from "classnames";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [scroll, setScroll] = useState<boolean>(false);
  const handleScroll = () => {
    if (typeof window !== "undefined" && window.pageYOffset > 20) {
      setScroll(true);
      return;
    }
    setScroll(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };
  return (
    <Container
      className={cn({
        "header-fixed": scroll,
      })}
    >
      <div className="container mx-auto flex flex-row sm:flex-row items-center justify-between">
        <h1
          className="font-700 text-30 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="text-[var(--primary-color)]">CYBER </span>
          MOVIE
        </h1>
        <div className="flex flex-row sm:flex-row items-center gap-4 sm:gap-[60px]">
          <nav className="flex flex-row sm:flex-row gap-10 sm:gap-16 ">
            <NavLink to="/">TRANG CHỦ</NavLink>
            <NavLink to={PATH.showTimes}>LỊCH CHIẾU</NavLink>
            <NavLink to="">PHIM</NavLink>
            <NavLink to={PATH.movieBooking}>RẠP</NavLink>
            <NavLink to="">TIN TỨC</NavLink>
          </nav>
          {/* <div className="search">
                        <Input placeholder="Tìm kiếm tên phim" />
                        <Button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div> */}
          <Button className="fix ml-3" type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={drawerVisible}
            className="my-drawer"
          >
            <nav className="flex flex-col gap-4 font-600 text-20">
              <NavLink to="/" className="nav-link">
                Trang chủ
              </NavLink>
              <NavLink to={PATH.showTimes} className="nav-link">
                Lịch chiếu
              </NavLink>
              <NavLink to="" className="nav-link">
                Phim
              </NavLink>
              <NavLink to={PATH.movieBooking} className="nav-link">
                Rạp
              </NavLink>
              <NavLink to="" className="nav-link">
                Tin tức
              </NavLink>
            </nav>
          </Drawer>
          <div>
            {!accessToken && (
              <p className="flex items-center font-600">
                <i className="fa-solid fa-user text-20"></i>
                <span
                  className="ml-10 cursor-pointer hover:text-[var(--primary-color)]"
                  onClick={() => {
                    navigate(PATH.login);
                  }}
                >
                  Đăng nhập
                </span>
                <span className="inline-block h-[24px] w-[2px] bg-black mx-6"></span>
                <span
                  className="cursor-pointer hover:text-[var(--primary-color)]"
                  onClick={() => {
                    navigate(PATH.register);
                  }}
                >
                  Đăng ký
                </span>
              </p>
            )}
            {!!accessToken && (
              <Popover
                content={
                  <div className="my-16">
                    <p className="font-500 text-16">{user?.hoTen}</p>
                    <hr className="my-16" />
                    <p
                      className="text-16 cursor-pointer"
                      onClick={() => {
                        navigate(PATH.account);
                      }}
                    >
                      Thông Tin Người dùng
                    </p>
                    <hr className="my-16" />
                    <Button
                      className="!h-[46px]"
                      danger
                      onClick={() => {
                        dispatch(quanLyNguoiDungActions.logOut());
                        navigate("/");
                      }}
                    >
                      <i className="mr-8 fa-solid fa-arrow-right-from-bracket"></i>
                      <span className="ml-10">Đăng Xuất</span>
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Avatar size="large" className="!bg-red-400">
                  <i className="fa-regular fa-user"></i>
                </Avatar>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

// Styled component
const Container = styled.header`
  height: var(--header-height);
  box-shadow: 0px 13px 10px -5px rgba(0, 0, 0, 0.1);

  &.header-fixed {
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 10;
    top: 0;
    left: 0;
  }
  nav {
    a {
      font-weight: 500;
      &::after {
        content: "";
        display: block;
        height: 3px;
        background: var(--primary-color);
        width: 0;
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 640px) {
    nav {
      display: none;
    }
  }
  @media (min-width: 640px) {
    .fix {
      display: none !important;
    }
  }
  .my-drawer .nav-link {
    color: black !important;
  }

  .my-drawer .nav-link:hover {
    color: red !important; /* Thay 'red' bằng màu sắc bạn muốn khi di chuột qua */
  }
`;
