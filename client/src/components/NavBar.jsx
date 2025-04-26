import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Debug', route: '/debug' },
  { name: 'Review', route: '/review' },
  { name: 'Generate', route: '/generate' },
  { name: 'Explain', route: '/explain' },
  { name: 'Convert', route: '/convert' },
  { name: 'TestCases', route: '/testcases' },
];

export default function Navbar({ selected }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState({ username: '', email: '' });
  const [currentFeature, setCurrentFeature] = useState(selected);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setCurrentFeature(selected);
  }, [selected]);

  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Desktop Nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/src/assets/logo/logo.png"
                alt="Logo"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.route);
                      setCurrentFeature(item.name);
                    }}
                    className={`${currentFeature === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Right side - History and Profile */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {/* History Button */}
              <button
                onClick={() => navigate('/history')}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                History
              </button>

              {/* Profile Dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-medium uppercase">
                      {user.username?.charAt(0) || 'U'}
                    </div>
                    <span className="ml-2 text-gray-300">{user.username}</span>
                  </button>
                </div>

                {profileDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-900 font-medium">{user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile header - shows current feature and menu button */}
          <div className="md:hidden flex items-center justify-between w-full">
            {currentFeature && (
              <span className="text-white font-medium ml-5  truncate">
                {currentFeature}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none ml-auto"
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Profile info in mobile menu */}
            <div className="px-3 py-2 border-b border-gray-700">
              <p className="text-sm text-white font-medium">{user.username}</p>
              <p className="text-xs text-gray-300 truncate">{user.email}</p>
            </div>
            
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.route);
                  setCurrentFeature(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`${currentFeature === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                navigate('/history');
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              History
            </button>
            <button
              onClick={logOut}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <img 
                src="/src/assets/logo/log-out.png" 
                alt="Logout" 
                className="h-5 w-5 mr-2"
              />
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}