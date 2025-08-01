import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../src/components/Body";
import Login from "../src/components/Login";
import Profile from "../src/components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Conections from "./components/Conections";
import Request from "./components/Request";
import PasswordChange from "./components/PasswordChange";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/changePassword"
              element={<PasswordChange />}
            />
            <Route path="/conections" element={<Conections />} />
            <Route path="/request" element={<Request />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
