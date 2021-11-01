import axiosClient from "./axiosClient";
const supplierApi = {
  createSupplier: (body) => {
    const storeId = localStorage.getItem('info')
    const url = `stores/${storeId}/suppliers`;
    return axiosClient.post(url, body);
  },
  getSuppliers: () => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/suppliers`;
    return axiosClient.get(url);
  },
  
  getSupplier: (supplierUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/suppliers/${supplierUuid}`;
    return axiosClient.get(url);
  },
};
export default supplierApi;
