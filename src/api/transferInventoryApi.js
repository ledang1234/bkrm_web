import axiosClient from "./axiosClient";
const transferInventoryApi = {
  get: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/transferInventory`;
    return axiosClient.get(url, body);
  },
};
export default transferInventoryApi;
