import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getProfileData = (token, controller) => {
  const url = `${baseUrl}/profile`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(url, config);
};

export const changeProfileData = (
  first_name,
  last_name,
  phone,
  token,
  controller
) => {
  const url = `${baseUrl}/profile`;
  const body = { first_name, last_name, phone };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};

export const changePassword = (body, token, controller) => {
  const url = `${baseUrl}/auth/change-password`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};

export const changeProfileImage = (body, token, controller) => {
  const url = `${baseUrl}/profile/image`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};

export const deleteProfileImage = (token, controller) => {
  const url = `${baseUrl}/profile/delete-image`;
  const body = null;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.patch(url, body, config);
};

export const getHistories = (token, controller) => {
  const url = `${baseUrl}/`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
  return axios.get(url, config);
};
