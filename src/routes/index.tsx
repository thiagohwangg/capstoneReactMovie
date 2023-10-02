import {RouteObject} from "react-router-dom"
import { PATH } from "constant"
import { AuthLayout, MainLayout } from "components"
import { Account, Home, Login, MovieBooking, Register, ShowTimes } from "pages"
import { MovieDetail } from "pages/MovieDetail"
export const router:RouteObject[] = [
    {
        path: "/",
        element : <MainLayout/>,
        children : [
            {
                index : true,
                element : <Home/>
            },
            {
                path : PATH.account,
                element : <Account/>
            },
            {
                element: <MovieBooking/>,
                path: PATH.movieBooking
            },
            {
                element : <MovieDetail/>,
                path : PATH.movieDetail
            },
            {
                element : <ShowTimes/>,
                path : PATH.showTimes
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                element : <Login/>,
                path: PATH.login,
                
            },
            {
                element: <Register/>,
                path:PATH.register
            },
            
        ]
    },
]