import axios from "axios";
import { BASE_URL } from "../constant";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Shimmer from "./Shimmer";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userFeed = useSelector((store) => store.feed);
  const getFeed = async () => {
    setLoading(true);
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!user) {
    return (
      <h1 className="flex justify-center mt-20 text-xl">
        Wait for few second for Login.....
      </h1>
    );
  }
  if (loading) return <Shimmer />;
  return (
    <div className="h-screen overflow-y-auto mt-20">
      {userFeed && userFeed.length > 0 ? (
        <UserCard user={userFeed[0]} />
      ) : (
        <h1 className="flex justify-center my-10">No new user available</h1>
      )}
    </div>
  );
};

export default Feed;
