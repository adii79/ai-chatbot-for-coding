import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import openEye from '../assets/icons/open_eye.png';
import closedEye from '../assets/icons/hidden_eye.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        toast.success('LoggedIn successful', { autoClose: 1000 });
        setTimeout(() => navigate('/debug'), 2000);
      } else if (response.status === 404) {
        toast.info('User Not Found!');
      } else if (response.status === 401) {
        toast.info('Password Is Incorrect!');
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.warning('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-auto">
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 mx-auto">
          <div className="text-center mb-10">
            <img
              src="/src/assets/logo/logo.png"
              alt="App Logo"
              className="h-28 w-auto object-contain mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-white">
              Sign in to your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 px-3 py-2 text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md bg-gray-700 border-gray-600 px-3 py-2 pr-10 text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <img
                  src={showPassword ? openEye : closedEye}
                  alt="Toggle visibility"
                  className="absolute top-3 right-3 w-5 h-5 cursor-pointer invert"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}