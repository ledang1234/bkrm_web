import axiosClient from "./axiosClient";
const customerApi = {
  createCustomer: (body) => {
    const storeId = localStorage.getItem('info')
    const url = `stores/${storeId}/customers`;
    return axiosClient.post(url, body);
  },
  getCustomers: () => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/customers`;
    return axiosClient.get(url);
  },
  
  getCustomer: (customerUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/customers/${customerUuid}`;
    return axiosClient.get(url);
  },
  deleteCustomer: (customerUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/customers/${customerUuid}`;
    return axiosClient.delete(url);
  },
};
export default customerApi;
