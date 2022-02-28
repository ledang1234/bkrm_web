import axiosClient from "./axiosClient";

const purchaseOrderApi = {
  addInventory: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/addInventory`;
    return axiosClient.post(url, body);
  },
  getAllOfBranch: (storeUuid, branchUuid, query) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders`;
    return axiosClient.get(url, {params: query});
  },
  getAllOfStore: (storeUuid) => {
    const url = `stores/${storeUuid}/purchase-orders/`;
    return axiosClient.get(url, {});
  },
  getPurchaseOrder: (storeUuid, purchaseOrderUuid) => {
    const url = `stores/${storeUuid}/purchase-orders/${purchaseOrderUuid}`;
    return axiosClient.get(url, {});
  },
  searchPurchaseOrder: (storeUuid, branchUuid, query) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/`;
    return axiosClient.get(url, { params: query });
  },
  editPurchaseOrder: (storeUuid, branchUuid, purchaseOrdersUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/purchase-orders/${purchaseOrdersUuid}`;
    return axiosClient.put(url, body)
  },
};
export default purchaseOrderApi;
