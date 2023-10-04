import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button, Avatar, Popover } from "components";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { quanLyNguoiDungActions, useAppDispatch } from "store";
import { useEffect, useState } from "react";
import cn from "classnames";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [scroll, setScroll] = useState<boolean>(false);
  const handleScroll = () => {
    if (window.pageYOffset > 20) {
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
  return (
    <Container
      className={cn({
        "header-fixed": scroll,
      })}
    >
      <div className="header-content">
        <h1
          className="brand"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="text-[var(--primary-color)]">CYBER </span>
          MOVIE
        </h1>
        <div className="flex items-center gap-[60px]">
          <nav>
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
    z-index: 999;
    top: 0;
    left: 0;
  }

  .header-content {
    padding: 0 40px;
    max-width: var(--max-width);
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brand {
      font-weight: 700;
      font-size: 30px;
      &:hover {
        cursor: pointer;
      }
    }
    nav {
      display: flex;
      gap: 60px;
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

    .search {
      border: 1px solid #111;
      display: flex;
      align-items: center;
      border-radius: 6px;
      overflow: hidden;
      button {
        height: 46px !important;
        border: none;
        border-radius: initial;
        background: #111;
        color: #fff;
        &:hover {
          color: var(--primary-color) !important;
        }
      }
    }

    input {
      margin-top: 0;
      background: transparent;
      color: #111;
      outline: none;
    }
  }
`;
