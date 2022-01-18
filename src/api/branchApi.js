import axiosClient from "./axiosClient";
const branchApi = {
  createBranch: (storeUuid, body) => {
    const url = `stores/${storeUuid}/branches`;
    return axiosClient.post(url, body);
  },
  getBranches: (storeUuid) => {
    const url = `/stores/${storeUuid}/branches`;
    return axiosClient.get(url);
  },

  getBranch: (storeUuid, branchUuid) => {
    const url = `/stores/${storeUuid}/branches/${branchUuid}`;
    return axiosClient.get(url);
  },

  deleteBranch: (storeUuid, branchUuid) => {
    const url = `/stores/${storeUuid}/branches/${branchUuid}`;
    return axiosClient.delete(url);
  },

  updateBranch: (storeUuid, branchUuid, body) => {
    const url = `/stores/${storeUuid}/branches/${branchUuid}`;
    return axiosClient.put(url, body);
  },
};
export default branchApi;
