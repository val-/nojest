import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ProfilePage from './pages/profile';
import CreateOrderPage from './pages/createOrder';
import palette from './palette';

function App() {

  const theme = createMuiTheme({ palette });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          
            <ul id="demo-links">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create-order">Create order</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <Route exact path="/registration">
                <RegistrationPage />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/create-order">
                <CreateOrderPage />
              </Route>
            </Switch>

        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
