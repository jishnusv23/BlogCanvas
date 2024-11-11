import React from "react";
import Img from "../../../assets//Login.svg";
import LoginForm from "../../../Components/features/Auth/LoginForm";
const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gray-100">
      <div className="flex items-center justify-center px-6 lg:px-20 bg-gradient-to-r from-green-700 to-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-white">
        <img
          src={Img}
          width={600}
          height={500}
          alt="Signup Illustration"
          className="object-cover"
        />
      </div>
    
    </div>
  );
};

export default Login;
