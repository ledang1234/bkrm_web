import axiosClient from "./axiosClient";

const supplierApi = {
  addInventory: (storeUuid, body) => {
    const url = `stores/${storeUuid}/suppliers`;
    return axiosClient.post(url, body);
  },
 
};
export default supplierApi;
