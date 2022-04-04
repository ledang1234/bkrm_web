import axios from "axios";
import axiosClient from "./axiosClient";
const storeApi = {
  getStoreInfo: (storeUuid) => {
    const url = `stores/${storeUuid}`;
    return axiosClient.get(url, {}); 
  },
  updateStoreInfo: (storeUuid, body) => {
    const url = `stores/${storeUuid}`;
    return axiosClient.post(url, body, {headers: {
      "Content-Type": "multipart/form-data",
    }}); 
  },
  
  getActivities: (storeUuid, branchUuid,  period) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/activities`;
    return axiosClient.get(url, { params: { period: period } });
  },

  getReportOverview: (storeUuid, fromDate, toDate) => {
    const url = `stores/${storeUuid}/report/overview`;
    return axiosClient.get(url, {
      params: { from_date: fromDate, to_date: toDate },
    });
  },

  getReportProduct: (storeUuid, fromDate, toDate, limit, categoryId) => {
    const url = `stores/${storeUuid}/report/item`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        limit: limit,
        category_id: categoryId,
      },
    });
  },

  getReportRevenue: (storeUuid, fromDate, toDate, unit) => {
    const url = `stores/${storeUuid}/report/statistic`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        revenue: 1,
      },
    });
  },
  getReportCaptital: (storeUuid, fromDate, toDate, unit) => {
    const url = `stores/${storeUuid}/report/statistic`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        captital: 1,
      },
    });
  },
  getReportProfit: (storeUuid, fromDate, toDate, unit) => {
    const url = `stores/${storeUuid}/report/statistic`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        profit: 1,
      },
    });
  },

  getReportPurchase: (storeUuid, fromDate, toDate, unit) => {
    const url = `stores/${storeUuid}/report/statistic`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        unit: unit,
        purchase: 1,
      },
    });
  },

  getReportTop: (storeUuid, fromDate, toDate, limit) => {
    const url = `stores/${storeUuid}/report/top`;
    return axiosClient.get(url, {
      params: {
        from_date: fromDate,
        to_date: toDate,
        limit: limit
      },
    });
  },

  importProductJSON: (storeUuid, json) => {
    const url = `stores/${storeUuid}/products/addProductByJson`;
    return axiosClient.post(url, {
      "json_data": json
    });
  },

  updateStoreConfig: (storeUuid,body) =>{
    const url = `stores/${storeUuid}/updateStoreConfiguration`;
    return axiosClient.post(url,body, {headers: {
      "Content-Type": "multipart/form-data",
    }})
  },
};
export default storeApi;
