import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';

//import library
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";

//import theme
import themes from './theme'

//import project
import HomePage from './pages/HomePage/HomePage'
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App() {
  const customization = useSelector((state) => state.customization);
  return (
    <div >
      <ThemeProvider theme={themes(customization)} >
       
        <BrowserRouter>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/home" component={HomePage} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </BrowserRouter>

      </ThemeProvider>
    </div>
    
    
  );
}

export default App;
