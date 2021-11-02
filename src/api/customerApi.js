import axiosClient from "./axiosClient";
const customerApi = {
  createCustomer: (storeUuid, body) => {
    const url = `stores/${storeUuid}/customers`;
    return axiosClient.post(url, body);
  },
  getCustomers: (storeUuid, ) => {
    const url = `/stores/${storeUuid}/customers`;
    return axiosClient.get(url);
  },
  
  getCustomer: (storeUuid, customerUuid) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}`;
    return axiosClient.get(url);
  },
  deleteCustomer: (storeUuid, customerUuid) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}`;
    return axiosClient.delete(url);
  },
};
export default customerApi;
