import themes from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import Customization from "./components/Customization/Customization";
import SignupPage from "./pages/SignupPage/SignupPage";
import { verifyToken, setCustomization } from "./store/actionCreator";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import MainPage from "./pages/MainPage/MainPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import GlobalSnackbar from "./components/GlobalSnackBar/GlobalSnackBar";
import Test from "./components/Test/Test";
import { customizeAction } from "./store/slice/customizeSlice";
import { SwitchCamera } from "@material-ui/icons";
function App() {
  const customization = useSelector((state) => state.customize);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const permissions = useSelector((state) => state.info.user.permissions);
  const dispatch = useDispatch();
  const [path,setPath] = useState()
  useEffect(() => {
    dispatch(verifyToken());
    dispatch(setCustomization(customization));
  }, [dispatch]);
  useEffect(()=>{
    const getPath = () =>{
      const prevPath = sessionStorage.getItem("BKRMprev")
      if (prevPath != "/home"){
        setPath( prevPath)
      }else if (permissions){
        if(permissions.find((p) => p.name === "sales")){
          setPath("/home/sales/cart")
          dispatch(customizeAction.setItemMenuOpen(1));
        }else if (permissions.find((p) => p.name === "inventory")){
          setPath("/home/inventory/import")
          dispatch(customizeAction.setItemMenuOpen(4));
        }else if (permissions.find((p) => p.name === "employee")){
          setPath("/home/hr/employee")
          dispatch(customizeAction.setItemMenuOpen(14));
        }else if (permissions.find((p) => p.name === "report")){
          setPath("/home/manager/history")
          dispatch(customizeAction.setItemMenuOpen(16));
        }
      }
    }
    getPath()
  },[permissions])
  return (
    <ThemeProvider theme={themes(customization)}>
      <Box>
        <LoadingModal />
        <GlobalSnackbar />
        <CssBaseline />
        <HashRouter>
          <Switch>
            {/* Fix lại route */}
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>{" "}
            <PrivateRoute path="/home">
              <HomePage />
            </PrivateRoute>
            <Route path="/login" exact>
              {isLoggedIn ?  <Redirect to={path ? path :"/home" }/>: <LoginPage />}
            </Route>
            <Route path="/signup" exact>
              {isLoggedIn ? <Redirect to={path? path: "/home"} /> : <SignupPage />
            </Route>
            <Route path="/main" component={MainPage} />
            <Route path="/store">
              <Switch>
                <Route path={"/store/:storeWebPage"}>
                  <CustomerPage />
                </Route>
              </Switch>
            </Route>
            <Route path="/test" component={Test} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </HashRouter>
        <Customization />
      </Box>
    </ThemeProvider>
  );
}
export default App;
