import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/blog-logo.png';
import { useAuth } from '../auth/useAuth';
import { logOutUser } from '../../services/authService';
import { AuthButtons } from './AuthButtons';
import { NavLinks } from './NavLinks';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearAuthState } = useAuth();

  const handleLogout = () => {
    setIsOpen(false);
    clearAuthState();
    logOutUser();
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-12" alt="Logo" />
          </Link>

          <div className="flex items-center lg:order-2 space-x-2">
            <AuthButtons user={user} onLogout={handleLogout} />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>

          <NavLinks isOpen={isOpen} user={user} />
        </div>
      </nav>
    </header>
  );
}
