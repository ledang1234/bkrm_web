import axiosClient from "./axiosClient";
const productApi = {
  createProduct: (params) => {
    const storeId = localStorage.getItem("info");
    const url = `stores/${storeId}/products`;
    return axiosClient.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getProduct: () => {
    const storeId = localStorage.getItem("info");
    const url = `stores/${storeId}/products`;
    return axiosClient.get(url);
  },
  createCategory: (params) => {
    const storeId = localStorage.getItem("info");
    const url = `stores/${storeId}/categories`;
    return axiosClient.post(url, JSON.stringify(params));
  },
  getAllCategory: () => {
    const storeId = localStorage.getItem("info");
    const url = `/stores/${storeId}/categories`;
    return axiosClient.get(url);
  },
};
export default productApi;
