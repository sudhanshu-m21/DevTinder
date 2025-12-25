import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleClick = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequest = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    <div className="p-4 m-20">
      <h1 className="text-3xl font-bold text-center mb-4">Requests</h1>
      {requests && requests.length > 0 ? (
        requests.map((request, index) => {
          const { firstName, lastName, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={index}
              className="flex justify-between items-center p-4 mb-4 border bg-base-300 rounded-lg shadow-md w-2/3 mx-auto"
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-20 h-20 rounded-full mr-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s"
                  alt="user"
                />
                <div>
                  <h3 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h3>
                  {age && <p className="text-sm text-white-500">{age}</p>}
                  {gender && <p className="text-sm text-white-500">{gender}</p>}
                  <p className="text-white-500">{about}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleClick("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => handleClick("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-white-500">No requests available</p>
      )}
    </div>
  );
};

export default Request;
