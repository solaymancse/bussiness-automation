import Login from "../components/authenticate/Login";
import Register from "../components/authenticate/Register";
import background from "../assets/background.jpg";
import { message, Modal } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "../utils/axiosConfig";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Authenticate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [loaderLoading, setLoaderLoading] = useState(false);

    useEffect(() => {
        if (location.pathname === "/login") {
            setModalType("login");
            setIsModalOpen(true);
        } else if (location.pathname === "/register") {
            setModalType("register");
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        setLoaderLoading(true);
        const timeoutId = setTimeout(() => {
            setLoaderLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);


    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
        navigate(`/${type}`);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setModalType("");
        navigate("/");
    };

    const responseGoogle = (response) => {
        const credential = response?.credential;

        if (credential) {
            axiosInstance.post('/auth/google/callback', { token: credential })
                .then(response => {
                    if (response.status === 200) {
                        message.success("Login Successfully")
                        localStorage.setItem("user", response?.data?.token);
                        navigate('/dashboard/hotel');
                    }

                })
                .catch(error => {
                    console.error('Login error', error);
                });
        }
    };



    return (
        <>
            {loaderLoading ? <div className="w-full h-screen flex justify-center items-center">
                <div className="loader"></div>
            </div> : <div className="relative flex justify-center py-8 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 grid grid-rows-2 gap-4">
                    <div className="text-white flex flex-col justify-center text-center">
                        <h1 className="text-2xl text-gray-200">Welcome To</h1>
                        <h1 className="text-5xl font-semibold">Hotel Management System</h1>
                    </div>
                    <div className="flex justify-start items-center gap-2 flex-col">
                        <div onClick={() => handleOpenModal("login")} className="text-white h-[40px] w-[200px] bg-blue-800 flex items-center justify-center hover:bg-white cursor-pointer transition duration-300 hover:text-blue-800">
                            Login
                        </div>
                        <div onClick={() => handleOpenModal("register")} className="text-white h-[40px] w-[200px] bg-orange-600 flex items-center justify-center hover:bg-white cursor-pointer transition duration-300 hover:text-orange-800">
                            Register
                        </div>
                        <div className="bg-red-50 w-[200px]">
                            <GoogleOAuthProvider clientId={googleClientId}>
                                <GoogleLogin
                                    onSuccess={responseGoogle}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal footer={null} width={400} open={isModalOpen} onCancel={handleClose}>
                    {modalType === "login" ? <Login /> : <Register />}
                </Modal>
            </div>}
        </>
    );
};

export default Authenticate;

