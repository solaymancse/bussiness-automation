
import { Outlet } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import Navbar from "../components/shared/navbar/Navbar";
import Sidebar from "../components/shared/sidebar/Sidebar";

const Dashboard = () => {
    const [isClicked, setIsClicked] = useState(true);
    const [open, setOpen] = useState(false);
    const isLarge = true;

    const showDrawer = () => {
        setOpen(true);
    };

    return (
        <div className="w-full bg-[#F3F6FD] dark:text-white dark:bg-[#202020] h-screen relative flex overflow-hidden">
            {/* {<div className={`${isClicked ? "w-[5%]" : "w-[20%]"} transition-all duration-300 ease-in-out bg-white dark:text-white dark:bg-dark hidden xl:flex shadow-md  flex-col h-full pb-4 px-4 ${isLarge ? " " : "overflow-y-auto"} no-scrollbar`}>
                {!isLarge && <Sidebar isClicked={isClicked} />}
            </div>} */}
            <div className="w-[224px] bg-white shadow-md">
                <Sidebar />
            </div>
            <div className={`${isLarge ? "w-full" : "w-full"} flex flex-col h-full`}>
                <div className={`h-[80px] shadow-sm bg-white dark:text-white dark:bg-dark py-5 pl-4 pr-4 md:pr-8 sticky top-0 z-10 `}>
                    <Navbar isClicked={isClicked} setIsClicked={setIsClicked} />
                </div>
                <div className={` w-full px-3 py-8 overflow-y-auto no-scrollbar flex-grow`}>

                    <Outlet />
                    <div onClick={showDrawer} className={`w-[50px] h-[50px] cursor-pointer flex justify-center items-center z-20 absolute right-8 bottom-[10%]  rounded-full`}>
                        <IoSettingsOutline color="#fff" size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
