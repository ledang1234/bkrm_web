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
function App() {
  const customization = useSelector((state) => state.customize);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  const loading = useSelector((state) => state.loading.isLoading);

  return (
    <div>
      <ThemeProvider theme={themes(customization)}>
        {!loading ? (
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
        ) : (
          <div> Loading..</div>
        )}
        <Customization />
      </ThemeProvider>
    </div>
  );
}

export default App;
