// import axios from "axios";
// import { BASE_URL } from "../constant";

const Premium = () => {
  // const handleBuy = async (membershipType) => {
  //   const order = await axios.post(
  //     BASE_URL + "/payments",
  //     { membershipType },
  //     { withCredentials: true }
  //   );
  //   const { amount, keyId, currency, notes, orderId, emailId } = order.data;
  //   const options = {
  //     key: keyId,
  //     amount,
  //     currency,
  //     name: "DevTinder",
  //     description: "Connect to developer",
  //     order_id: orderId,
  //     prefill: {
  //       name: notes.firstName + "" + notes.lastName,
  //       email: emailId,
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };
  return (
    <div className="flex justify-center items-center">
      <div className="flex w-3/4 flex-col lg:flex-row mt-50 mb-20">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h2 className="font-bold text-3xl">Silver Membership</h2>
          <ul>
            <li>Get 2 month chat with other developers</li>
            <li>100 request per day</li>
          </ul>
          <button
            // onClick={() => handleBuy("silver")}
            className="btn btn-primary"
          >
            Buy Silver Membership
          </button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h2 className="font-bold text-3xl">Gold Membership</h2>
          <ul>
            <li>Get 4 month chat with other developers</li>
            <li>Infinite request per day</li>
          </ul>
          <button
            // onClick={() => handleBuy("gold")}
            className="btn btn-secondary"
          >
            Buy Gold Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
