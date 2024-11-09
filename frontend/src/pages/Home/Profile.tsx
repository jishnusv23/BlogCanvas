import React from "react";
import Header from "../../Components/layouts/Header";
import UserDetail from "../../Components/features/Settings/UserDetail";
import LikedBlogs from "../../Components/features/Settings/LikedBlogs";
import MyBlogs from "../../Components/features/Settings/MyBlogs";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <div className="flex gap-5 border border-black rounded-md ">
          {/* <UserDetail /> */}
          <UserDetail />
          <LikedBlogs />
        </div>
        <div className="border border-black pt-3">
          <MyBlogs />
        </div>
      </div>
    </>
  );
};

export default Profile;
