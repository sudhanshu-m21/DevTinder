import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../utils/allConnection";

const Conections = () => {
  const dispatch = useDispatch();
  //   const [error, setError] = useState("");
  const allConnections = useSelector((store) => store.connections);
  const getConnections = async () => {
    if (allConnections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
      //   setError(error.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className="p-4 m-20">
      <h1 className="text-3xl font-bold text-center mb-4">Connections</h1>
      {allConnections && allConnections.length > 0 ? (
        allConnections.map((connection, index) => {
          const { firstName, lastName, age, gender, about } = connection;
          return (
            <div
              key={index}
              className="p-4 mb-4 border bg-base-300 rounded-lg shadow-md w-1/2 mx-auto"
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
            </div>
          );
        })
      ) : (
        <p className="text-center text-white-500">No connections available</p>
      )}
    </div>
  );
};

export default Conections;
