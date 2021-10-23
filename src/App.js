import themes from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
function App() {
  const customization = useSelector((state) => state.customize);
  return (
    <div>
      <ThemeProvider theme={themes(customization)}>
        <BrowserRouter>
          <Switch>
            {/* Fix lại route */}
            <Route path="/" component={HomePage} exact />
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
