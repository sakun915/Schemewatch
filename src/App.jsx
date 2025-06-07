import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 bg-gray-50 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
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
      </div>
    </Router>
  );
};

export default App;