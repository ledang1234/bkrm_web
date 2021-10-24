import themes from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import Customization from "./components/Customization/Customization";
import SignupPage from "./pages/SignupPage/SignupPage";
import { verifyToken } from "./store/actionCreator";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));
function App() {
  const customization = useSelector((state) => state.customize);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
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
              <Route path="/signup" component={SignupPage} />
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
