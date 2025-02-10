import { FaHotel } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

export const SidebarData = [
    {
        title: "Hotel",
        path: "/dashboard/hotel",
        icon: <FaHotel  size={20} />,
    },

    {
        title: "Logout",
        path: "/",
        icon: <MdOutlineLogout size={20} />,
        cName: "nav-text",
    }
]