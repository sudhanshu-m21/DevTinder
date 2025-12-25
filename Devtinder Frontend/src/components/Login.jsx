import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🟢 1. Loading state added

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignUp = async () => {
    setError("");
    setLoading(true); // 🟢 Start loading
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // 🔴 Stop loading
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true); // 🟢 Start loading
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // 🔴 Stop loading
    }
  };

  return (
    <div className="flex justify-center m-20">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-6 rounded-box shadow-lg max-w-md w-full">
        <legend className="fieldset-legend font-bold text-3xl mb-4 text-center">
          {!isLogin ? "Sign Up" : "Login"}
        </legend>

        {!isLogin && (
          <>
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input mb-2"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input mb-2"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input mb-2"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          className="input mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 font-semibold text-sm mb-2">{error}</p>
        )}

        <button
          className={`btn btn-neutral mt-2 w-full flex justify-center items-center gap-2 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={isLogin ? handleLogin : handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>

        <p
          className="mt-4 text-center cursor-pointer font-semibold text-blue-600 hover:underline"
          onClick={() => {
            setIsLogin((value) => !value);
            setError("");
          }}
        >
          {!isLogin
            ? "Already have an account? Login here"
            : "New user? Sign up here"}
        </p>

        <div className="text-gray-700 text-sm mt-6 text-center">
          <strong>Guest Email:</strong> test@gmail.com
          <br />
          <strong>Password:</strong> Test@123
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
