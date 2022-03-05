import axiosClient from "./axiosClient";

const promotionCouponApi = {
  createPromotion: (storeUuid, body) => {
    const url = `stores/${storeUuid}/createPromotion`;
    return axiosClient.post(url, body);
  },

  createVoucher: (storeUuid, body) => {
    const url = `stores/${storeUuid}/createVoucher`;
    return axiosClient.post(url, body);
  },
  updatePromotion: (storeUuid, body) => {
    const url = `stores/${storeUuid}/updatePromotion`;
    return axiosClient.put(url, body);
  },
  updateVoucher: (storeUuid, body) => {
    const url = `stores/${storeUuid}/updatePromotion`;
    return axiosClient.put(url, body);
  },
  getActivePromotionVoucher: (storeUuid, date) => {
    const url = `stores/${storeUuid}/getActivePromotionVoucher`;
    return axiosClient.get(url, {
      params: {
        date: date,
      },
    });
  },
  getAllPromotions: (storeUuid,query) => {
    const url = `stores/${storeUuid}/getAllPromotions`;
    return axiosClient.get(url, {
      params: query,
    });
  },
  getAllVouchers: (storeUuid, page, limit) => {
    const url = `stores/${storeUuid}/getAllVouchers`;
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
      },
    });
  },
};
export default promotionCouponApi;
