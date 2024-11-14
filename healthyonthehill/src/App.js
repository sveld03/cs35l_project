import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dining from './pages/Dining';
//import Gym from './pages/Gym';
import AllMachines from './pages/AllMachines';
import RecommendedMachines from './pages/RecommendedMachines';
import GymBuddy from './pages/GymBuddy';
import Settings from './pages/Settings';
import BruinBuddy from './pages/BruinBuddy';
import BuddyMatch from './pages/BuddyMatch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dining" element={<Dining />} />
          {/*<Route path="/gym" element={<Gym />} />*/}
          <Route path="/gym/all-machines" element={<AllMachines />} />
          <Route path="/gym/recommended" element={<RecommendedMachines />} />
          <Route path="/gym/buddy" element={<GymBuddy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/buddy" element={<BruinBuddy />} />
          <Route path="/buddy/match" element={<BuddyMatch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
