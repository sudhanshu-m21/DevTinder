import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
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
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-md w-full max-w-6xl p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
            Edit Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Age</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">About</label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[100px]"
                placeholder="Write about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={500}
              />
            </div>

            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <button className="btn btn-neutral w-full" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <UserCard
            user={{ firstName, lastName, age, gender, about }}
            role="profile"
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
