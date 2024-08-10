import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import FAQ from './scenes/faq';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import ReportsPage from './scenes/Reports';
import TrackingPage from './scenes/Tracking';
import ChatGPTInterface from './scenes/mosanid-Chat';
import EquipmentModel from './scenes/EquipmentM';
import HighTemperatureAlert from './scenes/alert';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const shouldHideSidebarAndTopbar =
    location.pathname === '/practice-question' ||
    location.pathname === '/session-complete' ||
    location.pathname === '/QFeedback' ||
    location.pathname === '/Waiting-Competition' ||
    location.pathname === '/Comp-Q' ||
    location.pathname === '/Rank-List' ||
    location.pathname === '/Calculating-Results' ||
    location.pathname === '/leader-board';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!shouldHideSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!shouldHideSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatGPTInterface />} />
              <Route path="/Reports" element={<ReportsPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/Equipment" element={<TrackingPage />} />
              <Route path="/Tracker" element={<EquipmentModel />} />
              <Route path="/alert" element={<HighTemperatureAlert />} />
               </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;