import axiosClient from "./axiosClient";

const scheduleApi = {
  createSchedule: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/createSchedule`;
    return axiosClient.post(url, body);
  },

  createShift: (storeUuid, branchUuid, body) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/createShift`;
    return axiosClient.post(url, body);
  },

  getSchedule: (storeUuid, branchUuid, selectedDate, mode) => {
    const url = `stores/${storeUuid}/branches/${branchUuid}/getSchedule`;
    return axiosClient.get(url, {params: {
      selected_date: selectedDate,
      mode: mode
    }});
  }
};
export default scheduleApi;
