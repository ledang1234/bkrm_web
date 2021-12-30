import axiosClient from "./axiosClient";

const refundApi = {
  removeInventory: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/refunds/removeInventory`;
    return axiosClient.post(url, body);
  },
  getAllOfBranch: (storeUuid, branchUuid) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/refunds/`;
    return axiosClient.get(url, {});
  },
  getAllOfStore: (storeUuid) => {
    const url = `stores/${storeUuid}/refunds/`;
    return axiosClient.get(url, {});
  },
  getRefund: (storeUuid, refundUuid) => {
    const url = `stores/${storeUuid}/refunds/${refundUuid}`;
    return axiosClient.get(url, {});
  }
};
export default refundApi;
