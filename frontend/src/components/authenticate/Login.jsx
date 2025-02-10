import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import logo from "../../assets/logo.jpg"
import { useState } from "react"
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axiosInstance
      .post("/login", data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard/hotel');
      })
      .catch((error) => {
        console.error('Login error', error);
      }).finally(() => {
        setLoading(false);
      })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const responseGoogle = (response) => {
    const credential = response?.credential;

    if (credential) {
      axiosInstance.post('/auth/google/callback', { token: credential })
        .then(response => {
          message.success("Login Successfully")
          localStorage.setItem("user", response?.data?.token);
          navigate('/dashboard/hotel');

        })
        .catch(error => {
          console.error('Login error', error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col pb-6 w-full">
      <div className="w-14 h-14 flex justify-center items-center  text-center">
        <img className="q-full h-full" src={logo} alt="" />
      </div>
      <div className="w-full mt-2">
        <h1 className="text-2xl text-center text-gray-600">Welcome Back!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full mt-8">
          <div>
            <label htmlFor="">Email</label>
            <div className="w-full border border-slate-300 h-[40px]  rounded-md">
              <input {...register("email")} type="email" placeholder="Email" className="w-full h-full px-2 outline-none" />
            </div>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <div className="w-full flex items-center border border-slate-300 h-[40px] rounded-md">
              <input {...register("password")} type={`${showPassword ? "text" : "password"}`} placeholder="Password" className="w-full h-full px-2 outline-none" />
              {showPassword ? <IoIosEye size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" /> :
                <IoIosEyeOff size={20} onClick={handleShowPassword} color="gray" className="cursor-pointer" />}
            </div>
          </div>

          <div>
            <button disabled={loading} type="submit" className="w-full h-[40px] bg-blue-800 rounded-md text-white">{loading ? <Spin /> : "Login"}</button>
          </div>
        </form>
        <div className="mt-4">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={responseGoogle}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  )
}

export default Login
