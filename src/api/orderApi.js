import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/orders/addOrder`;
    return axiosClient.post(url, body);
  },
};
export default orderApi;
