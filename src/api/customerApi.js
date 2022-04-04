import axiosClient from "./axiosClient";
const customerApi = {
  createCustomer: (storeUuid, body) => {
    const url = `/stores/${storeUuid}/customers`;
    return axiosClient.post(url, body);
  },
  getCustomers: (storeUuid, query) => {
    const url = `/stores/${storeUuid}/customers`;
    return axiosClient.get(url, {params: query});
  },

  getCustomer: (storeUuid, customerUuid) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}`;
    return axiosClient.get(url);
  },
  deleteCustomer: (storeUuid, customerUuid) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}`;
    return axiosClient.delete(url);
  },
  updateCustomer: (storeUuid, customerUuid,body) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}`;
    return axiosClient.put(url,body);
  },
  importCustomerJson : (storeUuid, json) => {
    const url = `stores/${storeUuid}/products/addCustomerByJson`;
    return axiosClient.post(url, {
      "json_data": json
    });
  },

};
export default customerApi;
