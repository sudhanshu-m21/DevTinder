import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = async () => {
    try {
      setError("");
      await axios.patch(
        BASE_URL + "/profile/changePassword",
        { newPassword },
        { withCredentials: true }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setNewPassword("");
    } catch (error) {
      setError(error.response?.data?.error || "Password update failed.");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-30">
      <div className=" w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <h2 className="font-bold text-3xl">Change Password</h2>
        <div className="mt-4">
          <label className="fieldset-label">Enter New Password</label>
          <input
            type="password"
            className="input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn btn-neutral mt-4"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </div>
      </div>
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg">
            <span>Password changed successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
