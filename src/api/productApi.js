import axios from "axios";
import axiosClient from "./axiosClient";
const productApi = {
  createProduct: (storeUuid, params) => {
    const url = `stores/${storeUuid}/products`;
    return axiosClient.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getProducts: (storeUuid) => {
    const url = `stores/${storeUuid}/products`;
    return axiosClient.get(url);
  },

  getProductsOfBranch: (storeUuid, branchUuid) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/products`;
    return axiosClient.get(url);
  },

  getProduct: (storeUuid, productUuid) => {
    const url = `stores/${storeUuid}/products/${productUuid}`;
    return axiosClient.get(url);
  },

  createCategory: (storeUuid, params) => {
    const url = `stores/${storeUuid}/categories`;
    return axiosClient.post(url, JSON.stringify(params));
  },
  getAllCategory: (storeUuid) => {
    const url = `/stores/${storeUuid}/categories`;
    return axiosClient.get(url);
  },
  getParentCategory: (storeUuid) => {
    const url = `/stores/${storeUuid}/categories/parent`;
    return axiosClient.get(url);
  },
  getSubCategory: (storeUuid, parentCategory) => {
    const url = `/stores/${storeUuid}/categories/${parentCategory}`
    return axiosClient.get(url);
  },
  deleteProduct: (storeUuid, productUuid) => {
    const url = `stores/${storeUuid}/products/${productUuid}`;
    return axiosClient.delete(url);
  },
  searchProduct: (storeUuid, searchKey) => {
    const url = `stores/${storeUuid}/products/`;
    return axiosClient.get(url, { params: { searchKey: searchKey } });
  },

  searchBranchProduct: (storeUuid, branchUuid, searchKey) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/search-products/`;
    return axiosClient.get(url, { params: { searchKey: searchKey } });
  },

  updateProduct: (storeUuid, productUuid, params) => {
    const url = `/stores/${storeUuid}/products/${productUuid}?_method=PUT`;
    return axiosClient.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default productApi;
