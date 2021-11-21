import axiosClient from "./axiosClient";

const purchaseOrderApi = {
  addInventory: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/addInventory`;
    return axiosClient.post(url, body);
  },
  getAllOfBranch: (storeUuid, branchUuid) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/`;
    return axiosClient.get(url, {});
  },
  getAllOfStore: (storeUuid) => {
    const url = `stores/${storeUuid}/purchase-orders/`;
    return axiosClient.get(url, {});
  },
  getPurchaseOrder: (storeUuid, purchaseOrderUuid) => {
    const url = `stores/${storeUuid}/purchase-orders/${purchaseOrderUuid}`;
    return axiosClient.get(url, {});
  }
};
export default purchaseOrderApi;
