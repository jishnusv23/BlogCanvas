
import { useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../redux/Store";
import ChangePasswordModal from "./ChangePassword";

const UserDetail = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [isOpenModal,setIsOpenModal]=useState<boolean>(false)
  const onClose=()=>{}
  console.log("🚀 ~ file: UserDetail.tsx:7 ~ UserDetail ~ user:", user);
  // Dummy data
  // const user = {
  //   username: "john_doe",
  //   email: "john.doe@example.com",
  //   password: "******",
  // };

  return (
    <>
    <div className="w-full lg:w-2/5 xl:w-1/3 bg-white border border-gray-200 shadow-lg rounded-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Profile Details
      </h1>

      <div className="space-y-4">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Username:</h2>
          <p className="text-gray-700">{user.user.name}</p>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Email:</h2>
          <p className="text-gray-700">{user.user.email}</p>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Password:</h2>
          <p className="text-gray-700">{"******"}</p>
        </div>

        <div className="flex justify-between gap-4">
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600" onClick={()=>setIsOpenModal(!isOpenModal)}>
            Change Password
          </button>
          {/* <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Leave the Room
            </button> */}
        </div>
      </div>
    </div>
    {
      isOpenModal &&(<ChangePasswordModal isOpen={isOpenModal} onClose={()=>setIsOpenModal(false)}/>)
    }
            </>
  );
};

export default UserDetail;
