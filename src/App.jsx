import React from 'react';
import Header from './components/Header';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 p-4 bg-gray-50 overflow-auto">
          <Routes>
            {/* Redirect "/" to "/analytics" */}
            <Route path="/" element={<Navigate to="/analytics" replace />} />
            <Route 
              path="/analytics" 
              element={
                <ErrorBoundary>
                  <AnalyticsPage />
                </ErrorBoundary>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
