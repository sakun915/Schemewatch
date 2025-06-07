import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import LoginModal from './LoginModal';

const Header = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser')));
  const [showLogin, setShowLogin] = useState(!user); 

  useEffect(() => {
    if (!user) setShowLogin(true);
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-blue-900 to-indigo-800 shadow-lg px-6 py-4 relative flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1 shadow-md">
            <img src="/logo.jpg" alt="Logo" className="w-12 h-12 object-contain rounded-full transform scale-125" />
          </div>
        </div>

        {/* Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white tracking-wide">
          Scheme Watch Analytics
        </h1>

        {/* User Icon (disabled after login) */}
        <div
          className={`text-white ${user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => {
            if (!user) setShowLogin(true);
          }}
          title={user ? "Logged in" : "Click to log in"}
        >
          <User className="w-6 h-6" />
        </div>
      </header>

      {/* Login Modal - cannot be closed unless logged in */}
      {showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onClose={user ? () => setShowLogin(false) : null}
        />
      )}
    </>
  );
};

export default Header;
