import axiosClient from "./axiosClient";
const testApi = {
  login: (email, password) => {
    const url = "/ownerLogin";
    return axiosClient.post(url, {
      email: email,
      password: password,
    });
  },
  getStore: (params) => {
    const url = "/stores";
    return axiosClient.get(url, { params });
  },
  ownerRegister: (ownerInformations) => {
    const url = "/register";
    return axiosClient.post(url, ownerInformations);
  },
  createStore: (formData) => {
    const url = "/stores";
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateStore: (info, store_id) => {
    const url = "/stores";
    return axiosClient.put(`${url}/${store_id}`, info);
  },
  deleteStore: (store_id) => {
    const url = "/stores";
    return axiosClient.delete(`${url}/${store_id}`);
  },
  testLogin: () => {
    const url = "/user/login";
    return axiosClient.post(url, {
      email: "khang3172@gmail.com",
      password: "Uu123456.",
    });
  },
  testGetUser: (user_id) => {
    const url = "/user";
    return axiosClient.get(`${url}/${user_id}`);
  },
};

export default testApi;
