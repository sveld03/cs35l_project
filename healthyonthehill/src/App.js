import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Home from './pages/Home';
import Dining from './pages/Dining';
import AllMachines from './pages/AllMachines';
import RecommendedMachines from './pages/RecommendedMachines';
import GymBuddy from './pages/GymBuddy';
import Settings from './pages/Settings';
import BruinBuddy from './pages/BruinBuddy';
import BuddyMatch from './pages/BuddyMatch';
import YourMatches from './pages/YourMatches';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import PrivateRoute from './components/PrivateRoute';


const RedirectWithToken = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const redirectPaths = ['/', '/login'];

    if (token && redirectPaths.includes(location.pathname)) {
      navigate('/home');
    }
  }, [navigate, location]);

  return children;
};


const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RedirectWithToken>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/dining"
              element={
                <PrivateRoute>
                  <Dining />
                </PrivateRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <PrivateRoute>
                  <YourMatches />
                </PrivateRoute>
              }
            />
            <Route
              path="/gym/all-machines"
              element={
                <PrivateRoute>
                  <AllMachines />
                </PrivateRoute>
              }
            />
            <Route
              path="/gym/recommended"
              element={
                <PrivateRoute>
                  <RecommendedMachines />
                </PrivateRoute>
              }
            />
            <Route
              path="/gym/buddy"
              element={
                <PrivateRoute>
                  <GymBuddy />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/buddy"
              element={
                <PrivateRoute>
                  <BruinBuddy />
                </PrivateRoute>
              }
            />
            <Route
              path="/buddy/match"
              element={
                <PrivateRoute>
                  <BuddyMatch />
                </PrivateRoute>
              }
            />
          </Routes>
        </RedirectWithToken>
      </Router>
    </ThemeProvider>
  );
};

export default App;
