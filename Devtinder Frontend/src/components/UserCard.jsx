import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";

const UserCard = ({ user, role }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, about, age, gender } = user;
  const handleClick = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedUser(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-6.5 min-h-135">
      <div className="card bg-base-300 w-xs shadow-sm">
        <figure className="p-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s"
            alt="user"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && <p>{age}</p>}
          {gender && <p>{gender}</p>}
          <p>{about}</p>

          {role !== "profile" && (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleClick("interested", _id)}
              >
                Interested
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleClick("ignored", _id)}
              >
                Ignore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
