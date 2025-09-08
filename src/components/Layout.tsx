import { Outlet } from 'react-router-dom';
import NavBar from './nav-bar/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
