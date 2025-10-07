import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import MarketPrices from './pages/MarketPrices';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Security from './pages/Security';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RabProjects from './pages/RabProjects';
import RabDetail from './pages/RabDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/*" 
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/:id" element={<ReportDetail />} />
                <Route path="/rab" element={<RabProjects />} />
                <Route path="/rab/:id" element={<RabDetail />} />
                <Route path="/prices" element={<MarketPrices />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/security" element={<Security />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;