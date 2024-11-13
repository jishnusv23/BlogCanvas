import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../redux/Store";
import { resetPassword } from "../../../redux/action/Auth/AuthActions";

const ChangePasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch= useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.user?.user._id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(userId);

    await dispatch(resetPassword({ oldPassword, newPassword, userId }));
    console.log("Changing password:", { oldPassword, newPassword });
    clearAndClose();
  };

  const clearAndClose = () => {
    setOldPassword("");
    setNewPassword("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setOldPassword("");
      setNewPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearAndClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePasswordModal;