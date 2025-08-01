import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed top-0 w-full z-10">
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="flex m-auto">
              <div>Welcome, {user.firstName}</div>
              <div className="dropdown dropdown-end mx-4">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={"/profile"} className="justify-between">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </Link>
                  </li>
                  <li>
                    <Link to={"/profile/changePassword"}>Change Password</Link>
                  </li>
                  <li>
                    <Link to={"/conections"}>Connections</Link>
                  </li>
                  <li>
                    <Link to={"/request"}>Requests</Link>
                  </li>
                  <li>
                    <Link to={"/premium"}>Premium</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
