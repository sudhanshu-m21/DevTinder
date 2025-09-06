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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user._id) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center m-20">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend font-bold text-3xl">
          {!isLogin ? "SignUp" : "Login"}
        </legend>
        {!isLogin && (
          <>
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
          </>
        )}
        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 font-bold">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {!isLogin ? "SignUp" : "Login"}
        </button>

        <p
          className="m-auto cursor-pointer font-bold"
          onClick={() => setIsLogin((value) => !value)}
        >
          {!isLogin ? "Existing user? Login here" : "New user? signUp here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
