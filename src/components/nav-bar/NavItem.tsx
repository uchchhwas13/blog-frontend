import { NavLink } from 'react-router-dom';

type NavItemProps = { to: string; label: string };

export function NavItem({ to, label }: NavItemProps) {
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
