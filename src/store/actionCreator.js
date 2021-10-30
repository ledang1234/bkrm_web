import { authActions } from "./slice/authSlice";
import { loadingActions } from "./slice/loadingSlice";
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
      if (rs) {
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
export const logInHandler = (userName, password) => {
  return async (dispatch) => {
    dispatch(loadingActions.startLoad());
    const logIn = async () => {
      try {
        const response = await userApi.signIn({
          phone: userName,
          password: password,
        });
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("info", response.store.uuid);
        }
        return response;
      } catch (error) {}
    };
    try {
      const rs = await logIn();
      if (rs.access_token) {
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
