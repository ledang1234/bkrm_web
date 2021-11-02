import axiosClient from "./axiosClient";
const employeeApi = {
  createEmployee: (body) => {
    const storeId = localStorage.getItem('info')
    const url = `stores/${storeId}/employees`;
    return axiosClient.post(url, body);
  },
  getEmployees: () => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/employees`;
    return axiosClient.get(url);
  },
  
  getEmployee: (employeeUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/employees/${employeeUuid}`;
    return axiosClient.get(url);
  },
  deleteEmployee: (employeeUuid) => {
    const storeId = localStorage.getItem('info')
    const url = `/stores/${storeId}/employees/${employeeUuid}`;
    return axiosClient.delete(url);
  },
};
export default employeeApi;
