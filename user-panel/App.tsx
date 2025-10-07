
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CorruptionAnalysis from './pages/CorruptionAnalysis';
import RABGenerator from './pages/RABGenerator';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AIAssistant from './pages/AIAssistant';
import History from './pages/History';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PriceReferencePage from './pages/PriceReference';

// Mock auth check
const isAuthenticated = () => {
    // In a real app, you'd check for a valid JWT here
    return localStorage.getItem('authToken') !== null;
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route 
              path="/*" 
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Routes>
                      <Route index element={<Navigate to="/dashboard" />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="analysis" element={<CorruptionAnalysis />} />
                      <Route path="rab" element={<RABGenerator />} />
                      <Route path="price-reference" element={<PriceReferencePage />} />
                      <Route path="articles" element={<Articles />} />
                      <Route path="articles/:id" element={<ArticleDetail />} />
                      <Route path="ai-assistant" element={<AIAssistant />} />
                      <Route path="history" element={<History />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="profile" element={<Profile />} />
                    </Routes>
                  </MainLayout>
                </PrivateRoute>
              } 
            />
          </Routes>
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
