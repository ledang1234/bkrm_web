import axiosClient from "./axiosClient";
const transferInventoryApi = {
  get: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/transferInventory`;
    return axiosClient.get(url, body);
  },
  update: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/transferInventory/${body.id}`;
    return axiosClient.put(url, body);
  }
};
export default transferInventoryApi;
