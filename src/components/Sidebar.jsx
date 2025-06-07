import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Upload, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const linkClass = (path) =>
    `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${location.pathname === path ? 'bg-gray-800' : ''}`;

  return (
    <div className="w-64 bg-gray-900 text-white p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">School Analytics</h2>
      <nav className="space-y-2">
        <Link to="/" className={linkClass('/')}>
          <Upload className="w-5 h-5" />
          Data Input
        </Link>
        <Link to="/analytics" className={linkClass('/analytics')}>
          <BarChart2 className="w-5 h-5" />
          Analytics
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
