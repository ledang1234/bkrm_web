import axios from "axios";
import axiosClient from "./axiosClient";
const storeApi = {
  getReport: (storeUuid, period) => {
    const url = `stores/${storeUuid}/report`;
    return axiosClient.get(url, { params: { period: period } });
  },
};
export default storeApi;
