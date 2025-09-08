import type { UserInfo } from '../auth/authContext';
import { NavItem } from './NavItem';

type NavLinksProps = {
  isOpen: boolean;
  user: UserInfo;
};

export function NavLinks({ isOpen, user }: NavLinksProps) {
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
