import { authActions } from "./authSlice";
import { loadingAction } from "./loadingSlice";
import userApi from "../api/userApi";
export const verifyToken = () => {
  return async (dispatch) => {
    dispatch(loadingAction.startLoad());
    const verifyToken = async () => {
      try {
        const response = await userApi.verify();
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    try {
      const rs = await verifyToken();
      if (rs.data) {
        dispatch(authActions.logIn());
        dispatch(loadingAction.finishLoad());
      } else {
        dispatch(authActions.logOut());
        dispatch(loadingAction.finishLoad());
      }
    } catch (error) {
      dispatch(authActions.logOut());
      dispatch(loadingAction.finishLoad());
    }
  };
};
