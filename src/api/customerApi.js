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
  
  getCustomer: (employeeUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/customers/${employeeUuid}`;
    return axiosClient.get(url);
  },
};
export default customerApi;
