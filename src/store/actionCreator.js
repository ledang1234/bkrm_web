import { authActions } from "./slice/authSlice";
import { loadingActions } from "./slice/loadingSlice";
import { infoActions } from "./slice/infoSlice";
import { customizeAction } from "./slice/customizeSlice";
import userApi from "../api/userApi";
import { pink, blue, grey } from "@material-ui/core/colors";
import { statusAction } from "./slice/statusSlice";
export const verifyToken = () => {
  return async (dispatch) => {
    dispatch(loadingActions.startLoad());
    const verifyToken = async () => {
      const response = await userApi.verify();
      return response;
    };
    try {
      const rs = await verifyToken();
      if (rs) {
        dispatch(authActions.logIn());
        dispatch(loadingActions.finishLoad());
        if (rs.role == "owner") {
          dispatch(
            infoActions.setUser({
              ...rs.user,
              permissions: [
                { id: 1, name: "inventory", description: "Kho hàng" },
                { id: 2, name: "employee", description: "Nhân sự" },
                { id: 3, name: "sales", description: "Bán hàng" },
                { id: 4, name: "product", description: "Sản phẩm" },
                { id: 5, name: "report", description: "Báo cáo" },
              ],
            })
          );
        } else {
          dispatch(
            infoActions.setUser({ ...rs.user, permissions: rs.permissions })
          );
        }
        dispatch(infoActions.setStore(rs.store));
        dispatch(infoActions.setRole(rs.role));
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
      const response = await userApi.signIn({
        phone: userName,
        password: password,
        role: "owner",
      });
      return response;
    };
    try {
      const rs = await logIn();
      if (rs.access_token) {
        localStorage.setItem("token", rs.access_token);
        dispatch(authActions.logIn());
        dispatch(loadingActions.finishLoad());
        dispatch(
          infoActions.setUser({
            ...rs.user,
            permissions: [
              { id: 1, name: "inventory", description: "Kho hàng" },
              { id: 2, name: "employee", description: "Nhân sự" },
              { id: 3, name: "sales", description: "Bán hàng" },
              { id: 4, name: "product", description: "Sản phẩm" },
              { id: 5, name: "report", description: "Báo cáo" },
            ],
          })
        );
        dispatch(infoActions.setStore(rs.store));
        dispatch(infoActions.setRole(rs.role));
        dispatch(statusAction.successfulStatus("Login successfully"));
      }
    } catch (error) {
      dispatch(authActions.logOut());
      dispatch(loadingActions.finishLoad());
      dispatch(statusAction.failedStatus("Login failed"));
    }
  };
};

export const empLogInHandler = (userName, password) => {
  return async (dispatch) => {
    dispatch(loadingActions.startLoad());
    const logIn = async () => {
      const response = await userApi.signIn({
        phone: userName,
        password: password,
        role: "employee",
      });
      return response;
    };
    try {
      const rs = await logIn();
      if (rs.access_token) {
        localStorage.setItem("token", rs.access_token);
        dispatch(authActions.logIn());
        dispatch(loadingActions.finishLoad());
        dispatch(
          infoActions.setUser({ ...rs.user, permissions: rs.permissions })
        );
        dispatch(infoActions.setStore(rs.store));
        dispatch(infoActions.setRole(rs.role));
        dispatch(statusAction.successfulStatus("Login successfully"));
      }
    } catch (error) {
      dispatch(authActions.logOut());
      dispatch(loadingActions.finishLoad());
      dispatch(statusAction.failedStatus("Login failed"));
    }
  };
};

export const setCustomization = (ini) => {
  return (dispatch) => {
    const fetchCustomization = () => {
      let customization = JSON.parse(sessionStorage.getItem("customization"));
      dispatch(customizeAction.setBorderRadius(customization.borderRadius));
      dispatch(customizeAction.setColorLevel(customization.colorLevel));
      dispatch(customizeAction.setFontFamily(customization.fontFamily));
      dispatch(customizeAction.setMode(customization.mode));
      dispatch(customizeAction.setMenu(customization.menu));
      dispatch(customizeAction.setPrimaryColor(customization.primaryColor));
      dispatch(customizeAction.setSecondaryColor(customization.secondaryColor));
    };
    try {
      fetchCustomization();
    } catch (error) {
      let customization = {
        fontFamily: `'Roboto', sans-serif`,
        borderRadius: 12,
        mode: "Light",
        menu: "1",
        primaryColor: blue,
        secondaryColor: pink,
        colorLevel: 50,
      };
      sessionStorage.setItem("customization", JSON.stringify(customization));
      console.log(error);
    }
  };
};

export const selectBranch = (uuid, name) => {
  return (dispatch) => {
    infoActions.setBranch({
      uuid: uuid,
      name: name,
    });
  };
};
