import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const verifyUrl = `${process.env.NEXT_PUBLIC_FE_URL}`;

export const register = (email, password, controller) => {
  const url = `${baseUrl}/register`;
  const body = {
    email,
    password,
    role_id: 1,
    link_direct: `${verifyUrl}/verify`,
  };
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const verify = (otp, email, controller) => {
  const url = `${baseUrl}/verify/${email}`;
  const body = { otp };
  return axios.patch(url, body, {
    signal: controller.signal,
  });
};

export const login = (email, password) => {
  const url = `${baseUrl}`;
  return axios({
    method: "post",
    url,
    data: { email, password },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const forgot = (email, controller) => {
  const url = `${baseUrl}/forgot`;
  const body = { email, link_direct: `${verifyUrl}/reset-password` };
  return axios.patch(url, body, {
    signal: controller.signal,
  });
};

export const resetPwd = (otp, newPassword, confirmPassword, controller) => {
  const url = `${baseUrl}/reset-password/${otp}`;
  const body = { newPassword, confirmPassword };
  return axios.patch(url, body, {
    signal: controller.signal,
  });
};

export const logout = (token, controller) => {
  const url = `${baseUrl}/logout`;
  const body = null;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};
