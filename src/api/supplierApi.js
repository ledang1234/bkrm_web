import axiosClient from "./axiosClient";
const supplierApi = {
  createSupplier: (storeUuid, body) => {
    const url = `stores/${storeUuid}/suppliers`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getSuppliers: (storeUuid, query) => {
    const url = `/stores/${storeUuid}/suppliers`;
    return axiosClient.get(url, {params: query});
  },

  getSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.get(url);
  },
  deleteSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.delete(url);
  },
  inactiveSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.put(url, { status: "inactive" });
  },
  activeSupplier: (storeUuid, supplierUuid) => {
    const url = `/stores/${storeUuid}/suppliers/${supplierUuid}`;
    return axiosClient.put(url, { status: "active" });
  },
};
export default supplierApi;
