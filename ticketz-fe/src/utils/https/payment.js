import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export const getHistories = (token, controller) => {
  const url = `${baseUrl}/transaction`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(url, config);
};
