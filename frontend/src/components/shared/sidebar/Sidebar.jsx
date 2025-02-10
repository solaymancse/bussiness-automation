import logo from "../../../assets/logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bool, func } from "prop-types";
import { useState } from "react";
import { SidebarData } from "../../sidebarData/SidebarData";



const Sidebar = ({ isClicked, onClose }) => {
    const [handleIsActiveIndex, setHandleIsActiveIndex] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();


    const locationHandler = (path) => {
        return location.pathname === path ? ` text-gray-700 bg-blue-100` : "";
    };

    const onChange = (key) => {
        if (Array.isArray(key)) {
            setHandleIsActiveIndex(key[0]);
        } else {
            setHandleIsActiveIndex(key);
        }
    };

    const handleRemoveLocalStorage = () => {
        localStorage.removeItem("user");
        onClose();
        navigate('/')
    };
    return (
        <div className="w-full">
            <div className="w-full h-[80px] items-center flex justify-center">
                <h1 className="text-2xl font-bold text-gray-600">
                    HMS
                </h1>
            </div>

            <div className="mt-4 ">
                {/* sidebar content */}
                {SidebarData.map((item, index) => (
                    <div className="px-2 font-[inter]" key={index}>
                        <Link
                            onClick={
                                item?.title === "Logout" ?
                                    handleRemoveLocalStorage : null
                            }
                            to={item?.path}
                            className={`flex justify-start text-start items-center rounded-lg ${locationHandler(item?.path)} hover:bg-blue-500 dark:hover:bg-dark dark:hover:border`}
                        >
                            <div className="w-[50px] h-[45px] rounded-full flex items-center justify-center">
                                {item?.icon}
                            </div>
                            {!isClicked && <div className="flex text-sm justify-start text-start">{item.title}</div>}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    isClicked: bool,
    onClose: func,
};

export default Sidebar;
