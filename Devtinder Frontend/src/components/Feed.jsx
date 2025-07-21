import axios from "axios";
import { BASE_URL } from "../constant";
import UserCard from "./UserCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (userFeed) return;
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!userFeed) <h1 className="flex justify-center">No new user available</h1>;

  return (
    <div className="h-screen overflow-y-auto m-20">
      {userFeed && userFeed.length > 0 ? (
        <UserCard user={userFeed[0]} />
      ) : (
        <h1 className="flex justify-center my-10">No new user available</h1>
      )}
    </div>
  );
};

export default Feed;
