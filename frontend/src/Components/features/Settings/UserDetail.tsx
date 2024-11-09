import React from "react";

const UserDetail = () => {
  // Dummy data
  const user = {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "******",
  };

  return (
    <div className="w-full lg:w-2/5 xl:w-1/3 bg-white border border-gray-200 shadow-lg rounded-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Profile Details
      </h1>

      <div className="space-y-4">
        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Username:</h2>
          <p className="text-gray-700">{user.username}</p>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Email:</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <h2 className="font-bold text-lg">Password:</h2>
          <p className="text-gray-700">{user.password}</p>
        </div>

        <div className="flex justify-between gap-4">
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Change Password
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Leave the Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
