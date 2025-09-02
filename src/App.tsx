import './index.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider.tsx';
import { router } from './components/router/Routes.tsx';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
