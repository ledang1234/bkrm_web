import axiosClient from "./axiosClient";
const customerPageApi = {
  storeInfo: (store_web_page) => {
    const url = `/storeInfo`;
    return axiosClient.get(url, {params: {store_web_page: store_web_page}});
  },
  storeProducts: (store_uuid, limit, page) => {
    const url = `/storeInfo/${store_uuid}/products`;
    return axiosClient.get(url, {params: {limit: limit, page: page}});
  },
  
};
export default customerPageApi;
