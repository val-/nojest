import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/create-order">Create order</Link>
            </li>
          </ul>

          <hr />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/create-order">
              <CreateOrder />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}

function CreateOrder() {
  return (
    <div>
      <h2>Create order</h2>
    </div>
  );
}

export default App;
