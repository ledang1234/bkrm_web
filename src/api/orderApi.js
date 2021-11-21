import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/orders/addOrder`;
    return axiosClient.post(url, body);
  },
  getAllOfStore: (storeUuid) => {
    const url = `stores/${storeUuid}/orders`;
    return axiosClient.get(url, {});
  },
  getOrder: (storeUuid, orderUuid) => {
    const url = `stores/${storeUuid}/orders/${orderUuid}`;
    return axiosClient.get(url, {});
  }
};
export default orderApi;
