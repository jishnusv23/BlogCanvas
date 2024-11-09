import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
const Header = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  return (
    <div className="flex justify-between lg:px-40 py-3 shadow-md fixed w-full z-50 bg-white">
      <div>
        <h1 className="text-xl font-bold text-green-500  w-32 text-center">
          Blog
        </h1>
      </div>

      <div className="relative">
        {/* <button
          className="text-xl text-center bg-green-500  border border-gray-50 rounded-xl w-32 font-bold"
          onClick={() => setIsDropDown(!isDropDown)}
        > */}
        <CiSettings
          className="text-4xl text-green-400"
          onClick={() => setIsDropDown(!isDropDown)}
        />
        {/* </button> */}
        {isDropDown && (
          <div className="absolute right-0 mt-2 bg-white border w-32 text-center border-gray-200 rounded-md shadow-lg">
            <ul>
              <li className="px-3 py-2  hover:bg-green-300 cursor-pointer">
                Profile
              </li>
              <li className="px-3 py-2  hover:bg-green-300 cursor-pointer">
                CreateBlog
              </li>
              <li className="px-3 py-2  hover:bg-green-300 cursor-pointer">
                Liked
              </li>
              <li className="px-3 py-2  hover:bg-green-300 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
