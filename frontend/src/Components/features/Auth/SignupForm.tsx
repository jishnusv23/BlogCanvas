import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupTypes } from "../../../types/SignupType";
import { SignupSchema } from "../../../utils/validation/SignupValidation";
import { useAppDispatch } from "../../../hooks/hooks";
import { signUp } from "../../../redux/action/Auth/AuthActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SignupValidationType = z.infer<typeof SignupSchema>;

const availablePreferences = [
  "Tech",
  "Business",
  "Support",
  "Art",
  "Opportunity",
  "Design",
  "Marketing",
];

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
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

  const handlePreferenceClick = (preference: string) => {
    if (!selectedPreferences.includes(preference)) {
      setSelectedPreferences((prev) => [...prev, preference]);
    }
  };

  const handleRemovePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.filter((item) => item !== preference)
    );
  };

  async function onSubmit(params: SignupTypes) {
    const { confirmPassword, preferences, ...signupData } = params;
    const preferencesArray = selectedPreferences;
    console.log(
      "🚀 ~ file: SignupForm.tsx:58 ~ onSubmit ~ preferencesArray:",
      preferencesArray
    );

    const response = await dispatch(
      signUp({ ...signupData, preferences: preferencesArray })
    );
    if (response) {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Signup Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
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
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
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
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Preferences */}
          <div>
            <label
              htmlFor="preferences"
              className="block text-gray-700 font-medium"
            >
              Preferences
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {availablePreferences.map((preference) => (
                <button
                  type="button"
                  key={preference}
                  onClick={() => handlePreferenceClick(preference)}
                  className={`border rounded-md ${
                    selectedPreferences.includes(preference)
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPreferences.map((preference) => (
                <div
                  key={preference}
                  className="flex items-center bg-blue-400 text-white  rounded-md"
                >
                  <span>{preference}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePreference(preference)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
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

        <div
          className="flex justify-end hover:text-blue-600 mt-4"
          onClick={() => navigate("/login")}
        >
          <h1>Existing User? Log in </h1>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
