import { createBrowserRouter } from "react-router-dom";
import Authenticate from "../pages/Authenticate";
import Dashboard from "../pages/Dashboard";
import Hotel from "../pages/Hotel/Hotel";
import HotelDetails from "../pages/Hotel/HotelDetails";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../components/privateRoute/PrivateRoute";

export const Route = createBrowserRouter([
    {
        path: "/",
        element: <Authenticate />,
    },
    {
        path: "/login",
        element: <Authenticate />,
    },
    {
        path: "/register",
        element: <Authenticate />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/hotel",
                element: <Hotel />,
            },
            {
                path: "/dashboard/hotel/:id",
                element: <HotelDetails />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
