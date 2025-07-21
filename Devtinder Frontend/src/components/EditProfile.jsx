import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "00");
  const [gender, setGender] = useState(user?.gender || "Select");
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <div className="flex justify-center m-20 h-screen">
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset w-xs bg-base-300 border border-base-300 p-4 rounded-box max-h-140">
          <legend className="fieldset-legend font-bold text-3xl">
            Edit Profile
          </legend>

          <label className="fieldset-label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="fieldset-label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="fieldset-label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="fieldset-label">Gender</label>
          <select
            className="input w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>

          <label className="fieldset-label">About</label>
          <textarea
            className="input p-2 w-full min-h-[100px] resize-y overflow-y-auto"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            maxLength={500}
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          />

          <p className="text-red-500 font-bold">{error}</p>
          <button className="btn btn-neutral mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>
      <div>
        <UserCard user={{ firstName, lastName, age, gender, about }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
