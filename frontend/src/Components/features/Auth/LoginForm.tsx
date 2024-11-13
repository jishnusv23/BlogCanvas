
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginTypes } from "../../../types/SignupType";
import { LoginformSchema } from "../../../utils/validation/LoginValidation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { login } from "../../../redux/action/Auth/AuthActions";
type LoginValidationType = z.infer<typeof LoginformSchema>;
const LoginForm = () => {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidationType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginformSchema),
  });

  async function onSubmit(params: LoginTypes) {
    console.log("🚀 ~ onSubmit ~ params:", params);
    const response=await dispatch(login(params))
    if(response){
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="flex justify-end mt-2 hover:text-blue-600" onClick={()=>navigate('/signup')}>
          <h1>Create an account</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
