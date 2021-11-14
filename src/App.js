import themes from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
  return (
    <div>
      <ThemeProvider theme={themes(customization)}>
        <Box>
          <LoadingModal />
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              {/* Fix lại route */}
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
              <PrivateRoute path="/home">
                <HomePage />
              </PrivateRoute>
              <Route path="/login" exact>
                {isLoggedIn ? <Redirect to="/home" /> : <LoginPage />}
              </Route>
              <Route path="/signup" exact>
                {isLoggedIn ? <Redirect to="/home" /> : <SignupPage />}
              </Route>
              <Route path="/main" component={MainPage} />
              <Route path="/customer-test" component={CustomerPage} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </BrowserRouter>
          <Customization />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
