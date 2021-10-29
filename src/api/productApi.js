import axiosClient from "./axiosClient";
const productApi = {
  createProduct: (storeId, params) => {
    const url = `stores/${storeId}/products`;
    return axiosClient.post(url, JSON.stringify(params));
  },
  getProduct: (storeId, params) => {
    const url = `stores/${storeId}/products`;
    return axiosClient.get(url);
  },
  createCategory: (storeId, params) => {
    const url = `stores/${storeId}/categories`;
    return axiosClient.post(url, JSON.stringify(params));
  },
  getAllCategory: (storeId) => {
    const url = `/stores/${storeId}/categories`
    return axiosClient.get(url);
  }
};
export default productApi;
