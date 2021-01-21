import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ProfilePage from './pages/profile';
import CreateOrderPage from './pages/createOrder';
import ProfileActivationPage from './pages/profileActivation';
import DashboardPage from './pages/dashboard';
import themePalette from './themePalette';
import themeOverrides from './themeOverrides';
import { backendService as backend } from './services/backendService';
import ScreenLocker from './components/screenLocker';

function App() {

  const theme = createMuiTheme({
    palette: themePalette,
    overrides: themeOverrides,
  });

  const [sessionState, setSessionState] = useState({ initialized: false });

  useEffect(() => {
    if (!sessionState.initialized) {
      backend.liveUpdateSessionContext(resp => {
        setSessionState(() => ({
          initialized: true,
          authorizedUser: resp.authorizedUser || false,
        }));
      });
    }
  });

  const PrivateRoute = ({ children, ...rest }) => (
    <Route {...rest} render={({ location }) => {
      if (sessionState.authorizedUser) {
        return children;
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }
    }} />
  );

  const UnauthorizedRoute = ({ children, ...rest }) => (
    <Route {...rest} render={({ location }) => {
      if (!sessionState.authorizedUser) {
        return children;
      } else {
        return <Redirect to={{ pathname: '/profile', state: { from: location } }} />;
      }
    }} />
  );

  const generateApp = () => {
    if (!sessionState.initialized) {
      return <ScreenLocker />;
    } else {
      return (
        <Router>
          <Switch>
            <UnauthorizedRoute exact path="/login">
              <LoginPage />
            </UnauthorizedRoute>
            <UnauthorizedRoute exact path="/registration">
              <RegistrationPage />
            </UnauthorizedRoute>
            <UnauthorizedRoute path="/activation/:token">
              <ProfileActivationPage />
            </UnauthorizedRoute>
            <PrivateRoute exact path="/">
              <Redirect to="/dashboard" />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard">
              <DashboardPage />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute exact path="/create-order">
              <CreateOrderPage />
            </PrivateRoute>
          </Switch>
        </Router>
      );
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {generateApp()}
      </ThemeProvider>
    </>
  );
}

export default App;
