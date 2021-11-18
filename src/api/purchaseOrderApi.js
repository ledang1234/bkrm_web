import axiosClient from "./axiosClient";

const purchaseOrderApi = {
  addInventory: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/addInventory`;
    return axiosClient.post(url, body);
  },
};
export default purchaseOrderApi;
