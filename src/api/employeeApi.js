import axiosClient from "./axiosClient";
const employeeApi = {
  createEmployee: (storeUuid, body) => {
    const url = `stores/${storeUuid}/employees`;
    return axiosClient.post(url, body);
  },
  getEmployees: (storeUuid) => {
    const url = `/stores/${storeUuid}/employees`;
    return axiosClient.get(url);
  },

  getEmployee: (storeUuid, employeeUuid) => {
    const url = `/stores/${storeUuid}/employees/${employeeUuid}`;
    return axiosClient.get(url);
  },
  deleteEmployee: (storeUuid, employeeUuid) => {
    const url = `/stores/${storeUuid}/employees/${employeeUuid}`;
    return axiosClient.delete(url);
  },
  updateEmployee: (storeUuid, employeeUuid, body) => {
    const url = `/stores/${storeUuid}/employees/${employeeUuid}`;
    return axiosClient.put(url, body);
  },
  inactiveEmployee: (storeUuid, employeeUuid) => {
    const url = `/stores/${storeUuid}/employees/${employeeUuid}`;
    return axiosClient.put(url, {status: 'inactive'});
  },
};
export default employeeApi;
