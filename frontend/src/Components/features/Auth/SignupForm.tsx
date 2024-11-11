import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupTypes } from "../../../types/SignupType";
import { SignupSchema } from "../../../utils/validation/SignupValidation";
import { useAppDispatch } from "../../../hooks/hooks";
import { signUp } from "../../../redux/action/Auth/AuthActions";
import { useNavigate } from "react-router-dom";

// Define the type for form validation based on SignupSchema
type SignupValidationType = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const navigate=useNavigate()
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    register,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupValidationType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit(params: SignupTypes) {
    // console.log("🚀 ~ onSubmit ~ params:", params);
    const { confirmPassword, ...signupData } = params;
    console.log(
      "🚀 ~ file: SignupForm.tsx:32 ~ onSubmit ~ signupData:",
      signupData
    );
    const response = await dispatch(signUp(signupData));
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Signup Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password Again"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-end hover:text-blue-600" onClick={()=>navigate('/login')}>
          <h1>Existing User? Log in </h1>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
