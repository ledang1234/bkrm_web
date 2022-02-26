import themes from "./theme";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  HashRouter,
  useLocation,
} from "react-router-dom";
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
import SearchWithAutoComplete from "./components/SearchBar/SearchWithAutoComplete";
import Test from "./components/Test/Test";
import { SwitchCamera } from "@material-ui/icons";
function App() {
  const [loading, setLoading] = useState(true);
  const customization = useSelector((state) => state.customize);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(false);
    dispatch(verifyToken());
    dispatch(setCustomization(customization));
  }, [dispatch]);
  const prevPath = sessionStorage.getItem("BKRMprev");
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
              {isLoggedIn ? (
                <Redirect to={prevPath ? prevPath : "/home"} />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route path="/signup" exact>
              {isLoggedIn ? (
                <Redirect to={prevPath ? prevPath : "/home"} />
              ) : (
                <SignupPage />
              )}
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
