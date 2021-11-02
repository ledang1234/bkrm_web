import axiosClient from "./axiosClient";
const supplierApi = {
  createSupplier: (storeUuid, body) => {
    const url = `stores/${storeUuid}/suppliers`;
    return axiosClient.post(url, body);
  },
  getSuppliers: (storeUuid, ) => {
    const url = `/stores/${storeUuid}/suppliers`;
    return axiosClient.get(url);
  },
  
  getSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.get(url);
  },
  deleteSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.delete(url);
  },
};
export default supplierApi;
