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
  payDebt: (storeUuid, customerUuid, paidAmount) => {
    const url = `/stores/${storeUuid}/customers/${customerUuid}/payDebt`;
    return axiosClient.put(url,{
      paid_amount: paidAmount
    });
  },
  importCustomerJson : (storeUuid, json) => {
    const url = `stores/${storeUuid}/customers/addCustomersByJson`;
    return axiosClient.post(url, {
      "json_data": json
    });
  },
  updateCustomerVouchers: (storeUuid, customerUuid,vouchers) => {
    const url = `stores/${storeUuid}/customer/${customerUuid}`;
    return axiosClient.post(url, {
      "vouchers": JSON.stringify(vouchers)
    });
  }
};
export default customerApi;
