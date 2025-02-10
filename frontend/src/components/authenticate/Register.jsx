import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdCheckmarkCircle } from "react-icons/io";
import logo from "../../assets/logo.jpg";
import axiosInstance from "../../utils/axiosConfig";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const Register = ({ handleCLose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance
            .post("/register", data)
            .then((response) => {
                if (response.status === 200) {
                    message.success(response.data.message);
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    navigate('/dashboard/hotel');
                }
            })
            .catch((error) => {
                console.error("Registration error:", error);
                if (error.response) {
                    message.error(error.response.data?.message || "Something went wrong. Please try again.");
                } else if (error.request) {
                    message.error("No response from the server. Please check your connection.");
                } else {
                    message.error("An error occurred while processing your request.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
    

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const passwordValue = watch("password");
    const isPasswordValid = !errors.password && passwordValue?.length >= 8 && /[A-Z]/.test(passwordValue);

    return (
        <div className="flex justify-center items-center flex-col w-full">
            <div className="w-14 h-14 flex justify-center items-center text-center">
                <img className="w-full h-full" src={logo} alt="Logo" />
            </div>
            <div className="w-full mt-2">
                <h1 className="text-3xl text-center text-gray-600 mb-1">Welcome!</h1>
                <p className="text-center text-gray-400">Create New Account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-8">
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className="w-full border border-slate-300 h-[40px] rounded-md">
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                                className="w-full h-full px-2 outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="w-full flex items-center border border-slate-300 h-[40px] rounded-md px-2">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full h-full outline-none"
                            />
                            {isPasswordValid ? (
                                <IoMdCheckmarkCircle size={20} color="green" />
                            ) : (
                                <>
                                    {showPassword ? (
                                        <IoIosEye size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" />
                                    ) : (
                                        <IoIosEyeOff size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" />
                                    )}
                                </>
                            )}
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="w-full flex items-center border border-slate-300 h-[40px] rounded-md px-2">
                            <input
                                {...register("confirmPassword")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full h-full outline-none"
                            />
                            {showPassword ? (
                                <IoIosEye size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" />
                            ) : (
                                <IoIosEyeOff size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" />
                            )}
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-full h-[40px] rounded-md text-white ${isValid ? "bg-orange-500" : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {loading ? <Spin /> : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
