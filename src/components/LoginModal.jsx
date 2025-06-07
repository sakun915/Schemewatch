import { useState } from 'react';
import { loginWithEmailPassword } from '../auth/authService';
import { X, Loader2 } from 'lucide-react';

const LoginModal = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userData = await loginWithEmailPassword(email, password);
      onLogin(userData);
      console.log(userData); 
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
    } catch (err) {
      setError(err.message || 'Login failed'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative overflow-hidden">
       
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>
          
          {/* Input Fields  */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button with loading state */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full mt-6 py-2.5 rounded-lg font-medium text-white transition-colors ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm mt-3 text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;