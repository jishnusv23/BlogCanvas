import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import CreateBlog from "../features/Settings/CreateBlog";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { logout } from "../../redux/action/Auth/AuthActions";
import { useAppDispatch } from "../../hooks/hooks";
const Header = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const hanleBlogModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleLogoutCancel = () => {
    setIsLogout(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logout());
      navigate("/login", { replace: false });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogout(false);
    }
  };
  return (
    <>
      <div className="flex justify-between lg:px-40 py-3 shadow-md fixed w-full z-50 bg-white">
        <div>
          <h1
            className="text-xl font-bold text-green-500  w-32 text-center"
            onClick={() => navigate("/")}
          >
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
                <li
                  className="px-3 py-2  hover:bg-green-300 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-3 py-2  hover:bg-green-300 cursor-pointer"
                  onClick={hanleBlogModal}
                >
                  CreateBlog
                </li>
                <li
                  className="px-3 py-2  hover:bg-green-300 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Liked
                </li>
                <li
                  className="px-3 py-2  hover:bg-green-300 cursor-pointer"
                  onClick={() => setIsLogout(true)}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isOpenModal && <CreateBlog onClose={() => setIsOpenModal(false)} />}
      {isLogout && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          isDelete={isLoading}
          showModal={isLogout}
        />
      )}
    </>
  );
};

export default Header;
