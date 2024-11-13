
import Img from "../../../assets/person-with-laptop.svg";
import SignupForm from "../../../Components/features/Auth/SignupForm";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gray-100">
      <div className="flex items-center justify-center px-6 lg:px-20 bg-gradient-to-r from-green-700 to-white">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-white to-green-700">
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

export default Signup;
