import { Link } from 'react-router-dom';
import type { UserInfo } from '../auth/authContext';

type AuthButtonProps = { user: UserInfo; onLogout: () => void };

export function AuthButtons({ user, onLogout }: AuthButtonProps) {
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
