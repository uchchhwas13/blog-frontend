import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/blog-logo.png';
import { useAuth } from './auth/useAuth';
import type { UserInfo } from './auth/authContext';
import { logOut } from '../services/authService';

type NavItemProps = { to: string; label: string };

function NavItem({ to, label }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
           hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 
           hover:text-orange-700 lg:p-0 ${
             isActive ? 'text-orange-700 font-semibold' : 'text-gray-700'
           }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

type NavLinksProps = {
  isOpen: boolean;
  user: UserInfo;
};

function NavLinks({ isOpen, user }: NavLinksProps) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    ...(user.isLoggedIn ? [{ to: '/add-blog', label: 'Add Blog' }] : []),
  ];

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } w-full lg:flex lg:w-auto lg:order-1`}
      id="mobile-menu-2"
    >
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} label={link.label} />
        ))}
      </ul>
    </div>
  );
}

type AuthButtonProps = { user: UserInfo; onLogout: () => void };

function AuthButtons({ user, onLogout }: AuthButtonProps) {
  if (user.isLoggedIn) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-gray-800 font-medium">{user.fullName}</span>
        <button
          onClick={onLogout}
          className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        to="/signin"
        className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
      >
        Sign up
      </Link>
    </div>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearAuthState } = useAuth();

  const handleLogout = () => {
    setIsOpen(false);
    clearAuthState();
    logOut(user.accessToken);
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
