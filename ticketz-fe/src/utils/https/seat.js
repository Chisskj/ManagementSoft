import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getOrderPage = (show_id, controller) => {
  const url = `${baseUrl}/seat/all/${show_id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const orderSeat = (seat, token, controller) => {
  const url = `${baseUrl}/seat/order`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  // console.log(seat);
  const body = {
    seat_id: seat,
  };
  return axios.post(url, body, config);
};
