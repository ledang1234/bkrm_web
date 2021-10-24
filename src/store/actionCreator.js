import { authActions } from "./authSlice";
import { loadingActions } from "./loadingSlice";
import userApi from "../api/userApi";
export const verifyToken = () => {
  return async (dispatch) => {
    dispatch(loadingActions.startLoad());
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
        dispatch(loadingActions.finishLoad());
      } else {
        dispatch(authActions.logOut());
        dispatch(loadingActions.finishLoad());
      }
    } catch (error) {
      dispatch(authActions.logOut());
      dispatch(loadingActions.finishLoad());
    }
  };
};
