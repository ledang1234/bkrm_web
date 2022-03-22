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
  getAllOfBranch: (storeUuid, branchUuid, query) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/orders`;
    return axiosClient.get(url, {params: query});
  },
  getOrder: (storeUuid, orderUuid) => {
    const url = `stores/${storeUuid}/orders/${orderUuid}`;
    return axiosClient.get(url, {});
  },
  searchOrder: (storeUuid, branchUuid, query) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/orders`;
    return axiosClient.get(url, {params: query});
  },
  editOrderApi: (storeUuid,  branchUuid,orderUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/orders/${orderUuid}`;
    return axiosClient.put(url, body)
  },
  searchCustomerOrder: (storeUuid, branchUuid, query) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/customerOrders`;
    return axiosClient.get(url, {params: query});
  },
};
export default orderApi;
